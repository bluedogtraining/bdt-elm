module Form.DatePicker.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setInitialDate, setSelectedDate
    , setMinDate, setMaxDate, setIncludeTime
    , setIsError, setIsLocked, setIsClearable, setIsInput
    , setDefaultLabel, setToLabel
    , setId
    , getIsChanged, getIsOpen
    , getInitialDate, getSelectedDate
    , getId
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Lazy exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)

import Browser.Dom as Dom
import Dict
import Task
import Date exposing (Date)
import Date.Bdt as Date

import List.Extra as List
import List.Nonempty exposing (Nonempty (..))

import Json.Decode as Decode exposing (Decoder)

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
    , selectedDate : Resettable (Maybe Date)
    , hours : Select.Model Int
    , minutes : Select.Model Int
    , seconds : Select.Model Int
    , navigationDate : Maybe Date
    , desiredDate : Maybe Date -- date selected with timepicker enabled, gets set to selectedDate once apply is hit
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
        , selectedDate = Resettable.init Nothing
        , navigationDate = Nothing
        , hours = hours
        , minutes = minutes
        , seconds = seconds
        , desiredDate = Nothing
        , focusedSelect = Nothing
        }


type alias ViewState =
    { isLocked : Bool
    , isError : Bool
    , isClearable : Bool
    , isInput : Bool
    , minDate : MinDate
    , maxDate : MaxDate
    , toLabel : Date -> String
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
    , toLabel = Helpers.toLabel
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


update : Msg -> State -> (State, Cmd Msg)
update msg state =

    case msg of
        Open minDate maxDate includeTime ->
            ({ state | isOpen = True, navigationDate = Nothing
            }, openCmd (Resettable.getValue state.selectedDate) minDate maxDate includeTime)

        Blur ->
            case state.desiredDate /= Nothing of
                True ->
                    (state, Cmd.none)

                False ->
                    ({ state | isOpen = False }, Cmd.none)

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
                    ({ state | selectedDate = Resettable.update (Just date) state.selectedDate, isOpen = False }, Cmd.none)

                True ->
                    ({ state | desiredDate = Just date }, Cmd.none)

        Apply ->
            (state, Cmd.none)
--            ({ state | selectedDate = Resettable.update (apply state) state.selectedDate, isOpen = False }, Cmd.none)

        Clear ->
            ({ state | selectedDate = Resettable.update Nothing state.selectedDate, isOpen = False }, Cmd.none)

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


openCmd : Maybe Date -> MinDate -> MaxDate -> IncludeTime -> Cmd Msg
openCmd date minDate maxDate includeTime =

    case date of
        Nothing ->
            Task.perform (InitWithCurrentDate minDate maxDate) Date.today

        _ ->
            Cmd.none


initNavigationDate : MinDate -> MaxDate -> Date -> Maybe Date
initNavigationDate minDate maxDate date =

    Just <| Helpers.maybeClamp minDate maxDate date


openTimeSelect : TimeSelect -> Cmd Msg
openTimeSelect timeSelect =

    case timeSelect of
        Hours ->
            Task.attempt DomFocus ("FORM_DATEPICKER_HOURS" |> Dom.focus)

        Minutes ->
            Task.attempt DomFocus ("FORM_DATEPICKER_MINUTES" |> Dom.focus)

        Seconds ->
            Task.attempt DomFocus ("FORM_DATEPICKER_SECONDS" |> Dom.focus)


--apply : State -> Maybe Date
--apply state =
--
--    let
--        time =
--            state.selectedDate
--
--    in
--        case time.selectedDate of
--            Nothing ->
--                Helpers.dateFromTime { time | selectedDate = Resettable.getValue state.date }
--
--            Just _ ->
--                Helpers.dateFromTime time


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
                [ Css.title (Resettable.getValue state.selectedDate == Nothing) ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedDate) |> Maybe.withDefault viewState.defaultLabel) ]
            , Html.divIf viewState.isInput
                []
                [ FeatherIcons.calendar |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
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
                [ Css.title (Resettable.getValue state.selectedDate == Nothing) ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedDate) |> Maybe.withDefault viewState.defaultLabel)  ]
            , Html.divIf viewState.isInput
                []
                [ FeatherIcons.calendar |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
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
                , disableMouseDown |> Html.attributeIf (state.desiredDate == Nothing) ]
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
    preventDefaultOn "mousedown" <| Decode.fail "mouseDownDisabled"


calendarNavigation : State -> ViewState -> Date -> Html Msg
calendarNavigation state viewState navigationDate =

    div
        [ Css.navigation ]
        [ previousYearArrow viewState navigationDate
        , previousMonthArrow viewState navigationDate
        , div
            [ Css.date ]
            [ text (calendarNavigationTitle navigationDate) ]
        , nextMonthArrow viewState navigationDate
        , nextYearArrow viewState navigationDate
        ]


calendarNavigationTitle : Date -> String
calendarNavigationTitle date =

    (Date.year date |> String.fromInt) ++ " - " ++ (Date.monthNumber date |> String.fromInt |> String.pad 2 '0')


previousYearArrow : ViewState -> Date -> Html Msg
previousYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.minDate == Just (Date.year navigationDate) &&
            Maybe.map Date.monthNumber viewState.minDate == Just (Date.monthNumber navigationDate)

    in
        div
            [ Css.yearArrows isDisabled
            , onClick (PreviousYear viewState.minDate) |> Html.attributeIf (not isDisabled)
            ]
            [ div
                [ Css.offsetYearArrow ]
                [ FeatherIcons.chevronLeft |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            , FeatherIcons.chevronLeft |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]


previousMonthArrow : ViewState -> Date -> Html Msg
previousMonthArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.minDate == Just (Date.year navigationDate) &&
            Maybe.map Date.monthNumber viewState.minDate == Just (Date.monthNumber navigationDate)

    in
        div
            [ Css.monthArrows isDisabled
            , onClick PreviousMonth |> Html.attributeIf (not isDisabled)
            ]
            [ FeatherIcons.chevronLeft |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


nextYearArrow : ViewState -> Date -> Html Msg
nextYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.maxDate == Just (Date.year navigationDate) &&
            Maybe.map Date.monthNumber viewState.maxDate == Just (Date.monthNumber navigationDate)

    in
        div
            [ Css.yearArrows isDisabled
            , onClick (NextYear viewState.maxDate) |> Html.attributeIf (not isDisabled)
            ]
            [ div
                [ Css.offsetYearArrow ]
                [ FeatherIcons.chevronRight |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            , FeatherIcons.chevronRight |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]


nextMonthArrow : ViewState -> Date -> Html Msg
nextMonthArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.maxDate == Just (Date.year navigationDate) &&
            Maybe.map Date.monthNumber viewState.maxDate == Just (Date.monthNumber navigationDate)

    in
        div
            [ Css.monthArrows isDisabled
            , onClick NextMonth |> Html.attributeIf (not isDisabled)
            ]
            [ FeatherIcons.chevronRight |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


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
            Date.firstOfMonth navigationDate

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

        isSelectedDate =
            case Resettable.getValue state.selectedDate of
                Nothing ->
                    False

                Just selectedDate ->
                    Helpers.isSame date selectedDate

        isSelectedDesiredDate =
            case state.desiredDate of
                Nothing ->
                    False

                Just desiredDate ->
                    Helpers.isSame date desiredDate

    in
        div
            [ Css.calendarDayItem isSelectedDate isSelectedDesiredDate (isCurrentMonth && isInRange)
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
            Resettable.getValue state.selectedDate /= Nothing

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
                    [ Select.view state.hours String.fromInt
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
                    [ Select.view state.minutes String.fromInt
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
                    [ Select.view state.seconds String.fromInt
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
        [ Css.clearButton <| Resettable.getValue state.selectedDate /= Nothing
        , onClick Clear |> Html.attributeIf (Resettable.getValue state.selectedDate /= Nothing)
        ]
        [ text "clear currently selected date" ]


-- STATE SETTERS --


reInitialise : State -> State
reInitialise state =

    { state | selectedDate = Resettable.init <| Resettable.getValue state.selectedDate }


reset : State -> State
reset state =

    { state | selectedDate = Resettable.reset state.selectedDate }


setInitialDate : Maybe Date -> State -> State
setInitialDate selectedDate state =

    { state | selectedDate = Resettable.init selectedDate }


setSelectedDate : Maybe Date -> State -> State
setSelectedDate selectedDate state =

    { state | selectedDate = Resettable.update selectedDate state.selectedDate }


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
--            { viewState | includeTime = True, toLabel = Helpers.toTimeLabel }
            { viewState | includeTime = True, toLabel = Helpers.toLabel }

        False ->
            { viewState | includeTime = False, toLabel = Helpers.toLabel }


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


setToLabel : (Date -> String) -> ViewState -> ViewState
setToLabel toLabel viewState =

    { viewState | toLabel = toLabel }


setId : String -> ViewState -> ViewState
setId id viewState =

    { viewState | id = Just id }


-- GETTERS --


getIsChanged : State -> Bool
getIsChanged =
    .selectedDate >> Resettable.getIsChanged


getIsOpen : State -> Bool
getIsOpen =
    .isOpen


getInitialDate : State -> Maybe Date
getInitialDate =
    .selectedDate >> Resettable.getInitialValue


getSelectedDate : State -> Maybe Date
getSelectedDate =
    .selectedDate >> Resettable.getValue


getId : ViewState -> Maybe String
getId =
    .id