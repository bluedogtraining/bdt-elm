module Form.DatePicker.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setInitialDate, setSelectedDateTime
    , setMinDate, setMaxDate, setIncludeTime
    , setIsError, setIsLocked, setIsClearable, setIsInput
    , setDefaultLabel
    , setId
    , getIsChanged, getIsOpen
    , getInitialDateTime, getSelectedDateTime
    , getId
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Lazy exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)

import Browser.Dom as Dom
import Dict
import Task

import Json.Decode as Decode exposing (Decoder)

import Time exposing (Posix)
import Time.Date as Date exposing (Date)
import Time.DateTime as DateTime exposing (DateTime)
import Date.Bdt as Date

import List.Extra as List
import List.Nonempty exposing (Nonempty (..))

import FeatherIcons

import Form.Helpers as Form
import Html.Styled.Bdt as Html
import Resettable exposing (Resettable)

import Form.Select as Select
import Form.DatePicker.Helpers as Helpers
import Form.DatePicker.Css as Css


-- MODEL --


type alias State =
    { isOpen : Bool
    , selectedDateTime : Resettable (Maybe DateTime)
    , navigationDate : Maybe Date -- date on which the datepicker is open
    , desiredDate : Maybe Date -- date selected with timepicker enabled
    , hours : Select.Model Int
    , minutes : Select.Model Int
    , seconds : Select.Model Int
    , focusedSelect : Maybe TimeSelect -- need to cache this in the model to avoid blurring when switching between time selects
    }


init : State
init =
    let
        hours =
            List.range 1 23
                |> Nonempty 0
                |> Select.init
                |> Select.setInitialOption (Just 0)

        minutes =
            List.range 1 59
                |> Nonempty 0
                |> Select.init
                |> Select.setInitialOption (Just 0)

        seconds =
            List.range 1 59
                |> Nonempty 0
                |> Select.init
                |> Select.setInitialOption (Just 0)

    in
        { isOpen = False
        , selectedDateTime = Resettable.init Nothing
        , navigationDate = Nothing
        , desiredDate = Nothing
        , hours = hours
        , minutes = minutes
        , seconds = seconds
        , focusedSelect = Nothing
        }


type alias ViewState =
    { isLocked : Bool
    , isError : Bool
    , isClearable : Bool
    , isInput : Bool
    , minDate : MinDate
    , maxDate : MaxDate
    , toLabel : DateTime -> String
    , defaultLabel : String
    , includeTime : Bool
    , id : Maybe String
    }


initialViewState : ViewState
initialViewState =
    { isLocked = False
    , isError = False
    , isClearable = False
    , isInput = True
    , minDate = Nothing
    , maxDate = Nothing
    , toLabel = DateTime.date >> Helpers.dateToString
    , defaultLabel = "-- Nothing Selected --"
    , includeTime = False
    , id = Nothing
    }


type alias MinDate =
    Maybe Date


type alias MaxDate =
    Maybe Date


type alias IncludeTime =
    Bool


type TimeSelect
    = Hours
    | Minutes
    | Seconds


-- UPDATE --


type Msg
    = Open MinDate MaxDate IncludeTime
    | Blur
    | InitWithCurrentDate MinDate MaxDate Date
    | PreviousYear MinDate
    | PreviousMonth
    | NextYear MaxDate
    | NextMonth
    | SelectDay Date IncludeTime
    | OpenTimeSelect TimeSelect
    | UpdateHours (Select.Msg Int)
    | UpdateMinutes (Select.Msg Int)
    | UpdateSeconds (Select.Msg Int)
    | Apply
    | Clear
    | DomFocus (Result Dom.Error ())
    | NoOp


update : Msg -> State -> (State, Cmd Msg)
update msg state =

    case msg of
        Open minDate maxDate includeTime ->
            ({ state
                | isOpen = True
                , navigationDate = Maybe.map DateTime.date (Resettable.getValue state.selectedDateTime)
                , desiredDate = Maybe.map DateTime.date (Resettable.getValue state.selectedDateTime)
                , hours = Select.reset state.hours
                , minutes = Select.reset state.minutes
                , seconds = Select.reset state.seconds
                , focusedSelect = Nothing
            }, openCmd (Resettable.getValue state.selectedDateTime) minDate maxDate includeTime)

        Blur ->
            case state.focusedSelect == Nothing of
                True ->
                    ({ state| isOpen = False }, Cmd.none)

                False ->
                    (state, Cmd.none)

        InitWithCurrentDate minDate maxDate date ->
            ({ state | navigationDate = initNavigationDate minDate maxDate date }, Cmd.none)

        PreviousYear minDate ->
            ({ state | navigationDate = Maybe.map (Helpers.previousYear >> Helpers.maybeClamp minDate state.navigationDate) state.navigationDate }, Cmd.none)

        PreviousMonth ->
            ({ state | navigationDate = Maybe.map Helpers.previousMonth state.navigationDate }, Cmd.none)

        NextYear maxDate ->
            ({ state | navigationDate = Maybe.map (Helpers.nextYear >> Helpers.maybeClamp state.navigationDate maxDate) state.navigationDate }, Cmd.none)

        NextMonth ->
            ({ state | navigationDate = Maybe.map Helpers.nextMonth state.navigationDate }, Cmd.none)

        SelectDay date includeTime ->
            case includeTime of
                False ->
                    let
                        newDateTime =
                            case Resettable.getValue state.selectedDateTime of
                                Nothing ->
                                    DateTime.makeDateTime date 0

                                Just dateTime ->
                                    DateTime.setDate date dateTime

                    in
                        ({ state | selectedDateTime = Resettable.update (Just newDateTime) state.selectedDateTime, isOpen = False }, Cmd.none)

                True ->
                    ({ state | desiredDate = Just date }, Cmd.none)

        Apply ->
            case state.desiredDate of
                Nothing ->
                    (state, Cmd.none)

                Just desiredDate ->
                    ({ state | selectedDateTime = Resettable.update (makeDateTime state desiredDate) state.selectedDateTime, isOpen = False }, Cmd.none)

        Clear ->
            ({ state | selectedDateTime = Resettable.update Nothing state.selectedDateTime, isOpen = False }, Cmd.none)

        OpenTimeSelect select ->
            ({ state | focusedSelect = Just select }, openTimeSelect select)

        UpdateHours selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg state.hours

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && state.focusedSelect == Just Hours then Nothing else state.focusedSelect

            in
                ({ state | hours = newSelect , focusedSelect = focusedSelect
                }, Cmd.batch [ Cmd.map UpdateHours cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus) ]
                )

        UpdateMinutes selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg state.minutes

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && state.focusedSelect == Just Minutes then Nothing else state.focusedSelect

            in
                ({ state | minutes = newSelect , focusedSelect = focusedSelect
                }, Cmd.batch [ Cmd.map UpdateMinutes cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus) ]
                )

        UpdateSeconds selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg state.seconds

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && state.focusedSelect == Just Seconds then Nothing else state.focusedSelect

            in
                ({ state | seconds = newSelect , focusedSelect = focusedSelect
                }, Cmd.batch [ Cmd.map UpdateSeconds cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus) ]
                )

        DomFocus _ ->
            (state, Cmd.none)

        NoOp ->
            (state, Cmd.none)


openCmd : Maybe DateTime -> MinDate -> MaxDate -> IncludeTime -> Cmd Msg
openCmd date minDate maxDate includeTime =

    case date of
        Nothing ->
            Task.perform (\posix -> InitWithCurrentDate minDate maxDate (posixToDate posix)) Time.now

        _ ->
            Cmd.none


posixToDate : Posix -> Date
posixToDate posix =
    let
        year =
            Time.toYear Time.utc posix

        month =
            Time.toMonth Time.utc posix
                |> Date.monthNumber

        day =
            Time.toDay Time.utc posix

    in
        Date.date year month day


initNavigationDate : MinDate -> MaxDate -> Date -> Maybe Date
initNavigationDate minDate maxDate date =
    Just <| Helpers.maybeClamp minDate maxDate date


openTimeSelect : TimeSelect -> Cmd Msg
openTimeSelect timeSelect =
    case timeSelect of
        Hours ->
            Task.attempt DomFocus (Dom.focus "FORM_DATEPICKER_HOURS")

        Minutes ->
            Task.attempt DomFocus (Dom.focus "FORM_DATEPICKER_MINUTES")

        Seconds ->
            Task.attempt DomFocus (Dom.focus "FORM_DATEPICKER_SECONDS")


makeDateTime : State -> Date -> Maybe DateTime
makeDateTime state desiredDate =

    let
        hours =
            Select.getSelectedOption state.hours
                |> Maybe.withDefault 0

        minutes =
            Select.getSelectedOption state.minutes
                |> Maybe.withDefault 0

        seconds =
            Select.getSelectedOption state.seconds
                |> Maybe.withDefault 0

    in
        DateTime.epoch
            |> DateTime.setDate desiredDate
            |> DateTime.setHour hours
            |> DateTime.setMinute minutes
            |> DateTime.setSecond seconds
            |> Just


-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =

    case state.isOpen of
        False ->
            lazy2 closed state viewState

        True ->
            lazy2 open state viewState


closed : State -> ViewState -> Html Msg
closed state viewState =

   div
        [ Css.container ]
        [ div
            [ Css.input viewState.isError viewState.isLocked
            , tabindex 0 |> Html.attributeIf (not viewState.isLocked)
            , onFocus (Open viewState.minDate viewState.maxDate viewState.includeTime) |> Html.attributeIf (not viewState.isLocked)
            , onClick (Open viewState.minDate viewState.maxDate viewState.includeTime) |> Html.attributeIf (not viewState.isLocked)
            ]
            [ div
                [ Css.title (Resettable.getValue state.selectedDateTime == Nothing) ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedDateTime) |> Maybe.withDefault viewState.defaultLabel) ]
            , Html.divIf viewState.isInput
                []
                [ FeatherIcons.calendar |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            ]
        ]


open : State -> ViewState -> Html Msg
open state viewState =

   div
        [ Css.container ]
        [ div
            [ Css.input viewState.isLocked viewState.isError
            , tabindex 0
            , id "FORM_DATEPICKER"
            , onBlur Blur
            ]
            [ div
                [ Css.title (Resettable.getValue state.selectedDateTime == Nothing) ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedDateTime) |> Maybe.withDefault viewState.defaultLabel)  ]
            , Html.divIf viewState.isInput
                []
                [ FeatherIcons.calendar |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            ]
        , calendar state viewState
        ]


calendar : State -> ViewState -> Html Msg
calendar state viewState =

    case state.navigationDate of
        Nothing ->
            text ""

        Just date ->
            div
                [ Css.calendar
                , disableMouseDown |> Html.attributeIf (state.focusedSelect == Nothing) ]
                [ calendarNavigation state viewState date
                , div
                    [ Css.weekDayList ]
                    (List.map calendarWeekDay ["mon", "tue", "wed", "thu", "fri", "sat", "sun"])
                , div
                    []
                    [ calendarDays state viewState date ]
                , timePickerContainer state viewState.includeTime
                , clearDateContainer state viewState
                ]


disableMouseDown : Attribute Msg
disableMouseDown =
    preventDefaultOn "mousedown" <| Decode.succeed (NoOp, True)


calendarNavigation : State -> ViewState -> Date -> Html Msg
calendarNavigation state viewState navigationDate =

    div
        [ Css.navigation ]
        [ previousYearArrow viewState navigationDate
        , previousMonthArrow viewState navigationDate
        , div
            [ Css.date ]
            [ text <| calendarNavigationTitle navigationDate ]
        , nextMonthArrow viewState navigationDate
        , nextYearArrow viewState navigationDate
        ]


calendarNavigationTitle : Date -> String
calendarNavigationTitle date =

    (Date.year date |> String.fromInt) ++ " - " ++ (Date.month date |> Helpers.monthFromNumber |> Date.monthToString)


previousYearArrow : ViewState -> Date -> Html Msg
previousYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.minDate == Just (Date.year navigationDate) &&
            Maybe.map Date.month viewState.minDate == Just (Date.month navigationDate)

    in
        div
            [ Css.yearArrows isDisabled
            , onClick (PreviousYear viewState.minDate) |> Html.attributeIf (not isDisabled)
            ]
            [ div
                [ Css.offsetYearArrow ]
                [ FeatherIcons.chevronLeft |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            , FeatherIcons.chevronLeft |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]


previousMonthArrow : ViewState -> Date -> Html Msg
previousMonthArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.minDate == Just (Date.year navigationDate) &&
            Maybe.map Date.month viewState.minDate == Just (Date.month navigationDate)

    in
        div
            [ Css.monthArrows isDisabled
            , onClick PreviousMonth |> Html.attributeIf (not isDisabled)
            ]
            [ FeatherIcons.chevronLeft |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


nextYearArrow : ViewState -> Date -> Html Msg
nextYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.maxDate == Just (Date.year navigationDate) &&
            Maybe.map Date.month viewState.maxDate == Just (Date.month navigationDate)

    in
        div
            [ Css.yearArrows isDisabled
            , onClick (NextYear viewState.maxDate) |> Html.attributeIf (not isDisabled)
            ]
            [ div
                [ Css.offsetYearArrow ]
                [ FeatherIcons.chevronRight |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            , FeatherIcons.chevronRight |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]


nextMonthArrow : ViewState -> Date -> Html Msg
nextMonthArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.maxDate == Just (Date.year navigationDate) &&
            Maybe.map Date.month viewState.maxDate == Just (Date.month navigationDate)

    in
        div
            [ Css.monthArrows isDisabled
            , onClick NextMonth |> Html.attributeIf (not isDisabled)
            ]
            [ FeatherIcons.chevronRight |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


calendarWeekDay : String -> Html Msg
calendarWeekDay day =
    div
        [ Css.weekDayItem ]
        [ text day ]


calendarDays : State -> ViewState -> Date -> Html Msg
calendarDays state viewState navigationDate =

    let
        rows =
            Helpers.visibleDays navigationDate

        firstOfMonth =
            Date.setDay 1 navigationDate

    in
        div
            []
            (List.map (calendarDayRow state viewState firstOfMonth) rows)


calendarDayRow : State -> ViewState -> Date -> List (Bool, Int) -> Html Msg
calendarDayRow state viewState firstOfMonth row =
    div
        [ Css.calendarDayRow ]
        (List.map (calendarDay state viewState firstOfMonth) row)


calendarDay : State -> ViewState -> Date -> (Bool, Int) -> Html Msg
calendarDay state viewState firstOfMonth (isCurrentMonth, dayNumber) =

    let
        date =
            Helpers.dateAtDayNumber dayNumber firstOfMonth

        isInRange =
            date
                |> Helpers.maybeClamp viewState.minDate viewState.maxDate
                |> Helpers.isSame date

        isSelectedDateTime =
            case Resettable.getValue state.selectedDateTime of
                Nothing ->
                    False

                Just selectedDateTime ->
                    Helpers.isSame date (DateTime.date selectedDateTime)

        isSelectedDesiredDate =
            case state.desiredDate of
                Nothing ->
                    False

                Just desiredDate ->
                    Helpers.isSame date desiredDate

    in
        div
            [ Css.calendarDayItem isSelectedDateTime isSelectedDesiredDate (isCurrentMonth && isInRange)
            , onClick (SelectDay date viewState.includeTime) |> Html.attributeIf (isCurrentMonth && isInRange) ]
            [ text (String.fromInt dayNumber) ]


timePickerContainer : State -> Bool -> Html Msg
timePickerContainer state includeTime =

    timePicker state
        |> Html.viewIf includeTime


timePicker : State -> Html Msg
timePicker state =

    let
        isDateSelected =
            Resettable.getValue state.selectedDateTime /= Nothing

        isDesiredDateSelected =
            state.desiredDate /= Nothing

    in
        div
            [ Css.timePickerContainer ]
            [ div
                [ Css.selectContainer
                , onMouseDown (OpenTimeSelect Hours) |> Html.attributeIf (state.focusedSelect /= Just Hours) ]
                [ div
                    [ Css.select ]
                    [ Select.view state.hours (String.fromInt >> String.padLeft 2 '0')
                        |> Select.setId "FORM_DATEPICKER_HOURS"
                        |> Select.render
                        |> Html.map UpdateHours
                    ]
                ]
            , div
                [ Css.colon ]
                [ div
                    []
                    [ text ":" ]
                ]
            , div
                [ Css.selectContainer
                , onMouseDown (OpenTimeSelect Minutes) |> Html.attributeIf (state.focusedSelect /= Just Minutes) ]
                [ div
                    [ Css.select ]
                    [ Select.view state.minutes (String.fromInt >> String.padLeft 2 '0')
                        |> Select.setId "FORM_DATEPICKER_MINUTES"
                        |> Select.render
                        |> Html.map UpdateMinutes
                    ]
                ]
            , div
                [ Css.colon ]
                [ div
                    []
                    [ text ":" ]
                ]
            , div
                [ Css.selectContainer
                , onMouseDown (OpenTimeSelect Seconds) |> Html.attributeIf (state.focusedSelect /= Just Seconds) ]
                [ div
                    [ Css.select ]
                    [ Select.view state.seconds (String.fromInt >> String.padLeft 2 '0')
                        |> Select.setId "FORM_DATEPICKER_SECONDS"
                        |> Select.render
                        |> Html.map UpdateSeconds
                    ]
                ]
            , div
                [ Css.applyButtonContainer ]
                [ div
                    [ Css.applyButton <| isDesiredDateSelected || isDateSelected
                    , onClick Apply |> Html.attributeIf (isDesiredDateSelected || isDateSelected)
                    ]
                    [ text "Apply" ]
                ]
            ]


clearDateContainer : State -> ViewState -> Html Msg
clearDateContainer state viewState =

    Html.viewIf viewState.isClearable (clearDateButton state)


clearDateButton : State -> Html Msg
clearDateButton state =

    div
        [ Css.clearButton <| Resettable.getValue state.selectedDateTime /= Nothing
        , onClick Clear |> Html.attributeIf (Resettable.getValue state.selectedDateTime /= Nothing)
        ]
        [ text "clear currently selected date" ]


-- STATE SETTERS --


reInitialise : State -> State
reInitialise state =

    { state | selectedDateTime = Resettable.init <| Resettable.getValue state.selectedDateTime }


reset : State -> State
reset state =

    { state | selectedDateTime = Resettable.reset state.selectedDateTime }


setInitialDate : Maybe DateTime -> State -> State
setInitialDate selectedDateTime state =

    { state | selectedDateTime = Resettable.init selectedDateTime }


setSelectedDateTime : Maybe DateTime -> State -> State
setSelectedDateTime selectedDateTime state =

    { state | selectedDateTime = Resettable.update selectedDateTime state.selectedDateTime }


-- VIEW STATE SETTERS --


setMinDate : Maybe Date -> ViewState -> ViewState
setMinDate date viewState =

    { viewState | minDate = date }


setMaxDate : Maybe Date -> ViewState -> ViewState
setMaxDate date viewState =

    { viewState | maxDate = date }


setIncludeTime : Bool -> ViewState -> ViewState
setIncludeTime includeTime viewState =

    case includeTime of
        True ->
            { viewState | includeTime = True, toLabel = Helpers.dateTimeToString }

        False ->
            { viewState | includeTime = False, toLabel = DateTime.date >> Helpers.dateToString }


setIsError : Bool -> ViewState -> ViewState
setIsError isError viewState =

    { viewState | isError = isError }


setIsLocked : Bool -> ViewState -> ViewState
setIsLocked isLocked viewState =

    { viewState | isLocked = isLocked }


setIsClearable : Bool -> ViewState -> ViewState
setIsClearable isClearable viewState =

    { viewState | isClearable = isClearable }


setIsInput : Bool -> ViewState -> ViewState
setIsInput isInput viewState =

    { viewState | isInput = isInput }


setDefaultLabel : String -> ViewState -> ViewState
setDefaultLabel defaultLabel viewState =

    { viewState | defaultLabel = defaultLabel }


setId : String -> ViewState -> ViewState
setId id viewState =

    { viewState | id = Just id }


-- GETTERS --


getIsChanged : State -> Bool
getIsChanged =
    .selectedDateTime >> Resettable.getIsChanged


getIsOpen : State -> Bool
getIsOpen =
    .isOpen


getInitialDateTime : State -> Maybe DateTime
getInitialDateTime =
    .selectedDateTime >> Resettable.getInitialValue


getSelectedDateTime : State -> Maybe DateTime
getSelectedDateTime =
    .selectedDateTime >> Resettable.getValue


getId : ViewState -> Maybe String
getId =
    .id