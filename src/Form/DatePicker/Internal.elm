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
import Time exposing (Posix)

import List.Extra as List

import Json.Decode as Decode exposing (Decoder)

import Form.Helpers as Form
import Html.Styled.Bdt as Html
import Resettable exposing (Resettable)

import FeatherIcons

import Form.Select as Select

import Form.DatePicker.Helpers as Helpers
import Form.DatePicker.Css as Css


-- MODEL --


type alias State =
    { isOpen : Bool
    , selectedDate : Resettable (Maybe Posix)
    , navigationDate : Maybe Posix
    , time : Time
    }


init : State
init =
    { isOpen = False
    , selectedDate = Resettable.init Nothing
    , navigationDate = Nothing
    , time = initialTime (Resettable.init Nothing)
    }


type alias ViewState =
    { isLocked : Bool
    , isError : Bool
    , isClearable : Bool
    , isInput : Bool
    , minDate : Maybe Posix
    , maxDate : Maybe Posix
    , toLabel : Posix -> String
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


type alias Time =
    { hours : Select.Model String
    , minutes : Select.Model String
    , seconds : Select.Model String
    , focusedSelect : Maybe TimeSelect
    , selectedDate : Maybe Posix
    }


initialTime : Resettable (Maybe Posix) -> Time
initialTime formValue =

    let
        selectedDate =
            Resettable.getValue formValue

        defaultHours =
            selectedDate
                |> Maybe.map (Time.toHour Time.utc >> String.fromInt >> String.padLeft 2 '0')
                |> Maybe.withDefault "00"
                |> Just

        defaultMinutes =
            selectedDate
                |> Maybe.map (Time.toMinute Time.utc >> String.fromInt >> String.padLeft 2 '0')
                |> Maybe.withDefault "00"
                |> Just

        defaultSeconds =
            selectedDate
                |> Maybe.map (Time.toSecond Time.utc >> String.fromInt >> String.padLeft 2 '0')
                |> Maybe.withDefault "00"
                |> Just

        hours =
            Select.init (List.range 0 23 |> Helpers.intsToStrings)
                |> Select.setInitialOption defaultHours

        minutes =
            Select.init (List.range 0 59 |> Helpers.intsToStrings)
                |> Select.setInitialOption defaultMinutes

        seconds =
            Select.init (List.range 0 59 |> Helpers.intsToStrings)
                |> Select.setInitialOption defaultSeconds

    in
        { hours = hours
        , minutes = minutes
        , seconds = seconds
        , focusedSelect = Nothing
        , selectedDate = Nothing
        }


type TimeSelect
    = Hours
    | Minutes
    | Seconds


-- UPDATE --


type Msg
    = Open (Maybe Posix) (Maybe Posix) Bool
    | Blur
    | InitWithCurrentDate (Maybe Posix) (Maybe Posix) Posix
    | PreviousYear (Maybe Posix)
    | PreviousMonth
    | NextYear (Maybe Posix)
    | NextMonth
    | SelectDay Posix Bool
    | TimeMsg TimeMsg
    | Apply
    | Clear
    | NoOp
    | DomFocus (Result Dom.Error ())


type TimeMsg
    = OpenTimeSelect TimeSelect
    | UpdateHours (Select.Msg String)
    | UpdateMinutes (Select.Msg String)
    | UpdateSeconds (Select.Msg String)


update : Msg -> State -> (State, Cmd Msg)
update msg state =

    case msg of
        Open minDate maxDate includeTime ->
            ({ state
                | isOpen = True
                , navigationDate = Resettable.getValue state.selectedDate
                , time = initialTime state.selectedDate
            }, openCmd (Resettable.getValue state.selectedDate) minDate maxDate includeTime)

        Blur ->
            case Helpers.isTimeFocused state.time of
                True ->
                    (state, Cmd.none)

                False ->
                    ({ state | isOpen = False, navigationDate = Nothing }, Cmd.none)

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
                    let
                        time =
                            state.time

                    in
                        ({ state | time = { time | selectedDate = Just date } }, Cmd.none)

        Apply ->
            ({ state | selectedDate = Resettable.update (apply state) state.selectedDate, isOpen = False }, Cmd.none)

        Clear ->
            ({ state | selectedDate = Resettable.update Nothing state.selectedDate, isOpen = False }, Cmd.none)

        TimeMsg timeMsg ->
            let
                (newTime, cmd) =
                    updateTime timeMsg state.time

            in
                ({ state | time = newTime }, cmd)

        NoOp ->
            (state, Cmd.none)

        DomFocus _ ->
            (state, Cmd.none)


openCmd : Maybe Posix -> Maybe Posix -> Maybe Posix -> Bool -> Cmd Msg
openCmd selectedDate minDate maxDate includeTime =

    case selectedDate of
        Nothing ->
            Task.perform (InitWithCurrentDate minDate maxDate) Time.now

        _ ->
            Cmd.none


initNavigationDate : Maybe Posix -> Maybe Posix -> Posix -> Maybe Posix
initNavigationDate minDate maxDate date =

    date
        |> Helpers.maybeClamp minDate maxDate
        |> Just


openTimeSelect : TimeSelect -> Cmd Msg
openTimeSelect timeSelect =

    case timeSelect of
        Hours ->
            Task.attempt DomFocus ("FORM_DATEPICKER_HOURS" |> Dom.focus)

        Minutes ->
            Task.attempt DomFocus ("FORM_DATEPICKER_MINUTES" |> Dom.focus)

        Seconds ->
            Task.attempt DomFocus ("FORM_DATEPICKER_SECONDS" |> Dom.focus)


apply : State -> Maybe Posix
apply state =

    let
        time =
            state.time

    in
        case time.selectedDate of
            Nothing ->
                Helpers.dateFromTime { time | selectedDate = Resettable.getValue state.selectedDate }

            Just _ ->
                Helpers.dateFromTime time


updateTime : TimeMsg -> Time -> (Time, Cmd Msg)
updateTime msg time =

    case msg of
        OpenTimeSelect select ->
            ({ time | focusedSelect = Just select }, openTimeSelect select)

        UpdateHours selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg time.hours

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && time.focusedSelect == Just Hours then Nothing else time.focusedSelect

            in
                ({ time | hours = newSelect , focusedSelect = focusedSelect
                }, Cmd.map (UpdateHours >> TimeMsg) cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus)
                )

        UpdateMinutes selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg time.minutes

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && time.focusedSelect == Just Minutes then Nothing else time.focusedSelect

            in
                ({ time | minutes = newSelect , focusedSelect = focusedSelect
                }, Cmd.map (UpdateMinutes >> TimeMsg) cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus)
                )

        UpdateSeconds selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg time.seconds

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && time.focusedSelect == Just Seconds then Nothing else time.focusedSelect

            in
                ({ time | seconds = newSelect , focusedSelect = focusedSelect
                }, Cmd.map (UpdateSeconds >> TimeMsg) cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus)
                )


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
                , disableMouseDown |> Html.attributeIf (not <| Helpers.isTimeFocused state.time) ]
                [ calendarNavigation state viewState date
                , div
                    [ Css.weekDayList ]
                    (List.map calendarWeekDay ["mon", "tue", "wed", "thu", "fri", "sat", "sun)"]
                , div
                    []
                    [ calendarDays state viewState date ]
                , timePickerContainer state viewState.includeTime
                , clearDateContainer state viewState
                ]


disableMouseDown : Attribute Msg
disableMouseDown =
    preventDefaultOn "mousedown" (Decode.succeed NoOp)


calendarNavigation : State -> ViewState -> Posix -> Html Msg
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


calendarNavigationTitle : Posix -> String
calendarNavigationTitle date =

    (Time.toYear Time.utc date |> String.fromInt) ++ " - " ++ (Time.toMonth Time.utc date |> Helpers.monthToString)


previousYearArrow : ViewState -> Posix -> Html Msg
previousYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map (Time.toYear Time.utc) viewState.minDate == Just (Time.toYear Time.utc navigationDate) &&
            Maybe.map (Time.toMonth Time.utc) viewState.minDate == Just (Time.toMonth Time.utc navigationDate)

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


previousMonthArrow : ViewState -> Posix -> Html Msg
previousMonthArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map (Time.toYear Time.utc) viewState.minDate == Just (Time.toYear Time.utc navigationDate) &&
            Maybe.map (Time.toMonth Time.utc) viewState.minDate == Just (Time.toMonth Time.utc navigationDate)

    in
        div
            [ Css.monthArrows isDisabled
            , onClick PreviousMonth |> Html.attributeIf (not isDisabled)
            ]
            [ FeatherIcons.chevronLeft |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


nextYearArrow : ViewState -> Posix -> Html Msg
nextYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map (Time.toYear Time.utc) viewState.maxDate == Just (Time.toYear Time.utc navigationDate) &&
            Maybe.map (Time.toMonth Time.utc) viewState.maxDate == Just (Time.toMonth Time.utc navigationDate)

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


nextMonthArrow : ViewState -> Posix -> Html Msg
nextMonthArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map (Time.toYear Time.utc) viewState.maxDate == Just (Time.toYear Time.utc navigationDate) &&
            Maybe.map (Time.toMonth Time.utc) viewState.maxDate == Just (Time.toMonth Time.utc navigationDate)

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


calendarDays : State -> ViewState -> Posix -> Html Msg
calendarDays state viewState navigationDate =

    let
        rows =
            Helpers.visibleDays navigationDate

        firstOfMonth =
            Date.toFirstOfMonth navigationDate

    in
        div
            []
            (List.map (calendarDayRow state viewState firstOfMonth) rows)


calendarDayRow : State -> ViewState -> Posix -> List (Bool, Int) -> Html Msg
calendarDayRow state viewState firstOfMonth row =
    div
        [ Css.calendarDayRow ]
        (List.map (calendarDay state viewState firstOfMonth) row)


calendarDay : State -> ViewState -> Posix -> (Bool, Int) -> Html Msg
calendarDay state viewState firstOfMonth (isCurrentMonth, dayNumber) =

    let
        date =
            Helpers.dateAtDayNumber dayNumber firstOfMonth

        isInRange =
            date
                |> Helpers.maybeClamp viewState.minDate viewState.maxDate
                |> Date.is Date.Same date

        isSelected =
            case Resettable.getValue state.selectedDate of
                Nothing ->
                    False

                Just selectedDate ->
                    Date.is Date.Same date selectedDate

        isSelectedTimeDate =
            case state.time.selectedDate of
                Nothing ->
                    False

                Just selectedDate ->
                    Date.is Date.Same date selectedDate

    in
        div
            [ Css.calendarDayItem isSelected isSelectedTimeDate (isCurrentMonth && isInRange)
            , onClick (SelectDay date viewState.includeTime) |> Html.attributeIf (isCurrentMonth && isInRange) ]
            [ text (String.fromInt dayNumber) ]


timePickerContainer : State -> Bool -> Html Msg
timePickerContainer state includeTime =

    timePicker state.time (Resettable.getValue state.selectedDate)
        |> Html.viewIf includeTime


timePicker : Time -> Maybe Posix -> Html Msg
timePicker time selectedDate =

    let
        isDateSelected =
            selectedDate /= Nothing

        isTimeDateSelected =
            time.selectedDate /= Nothing

    in
        div
            [ Css.timePickerContainer ]
            [ div
                [ Css.selectContainer
                , onMouseDown (OpenTimeSelect Hours |> TimeMsg) |> Html.attributeIf (time.focusedSelect /= Just Hours) ]
                [ div
                    [ Css.select ]
                    [ Select.view time.hours
                        |> Select.setToLabel Helpers.selectToLabel
                        |> Select.setId "FORM_DATEPICKER_HOURS"
                        |> Select.render
                        |> Html.map (UpdateHours >> TimeMsg)
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
                , onMouseDown (OpenTimeSelect Minutes |> TimeMsg) |> Html.attributeIf (time.focusedSelect /= Just Minutes) ]
                [ div
                    [ Css.select ]
                    [ Select.view time.minutes
                        |> Select.setToLabel Helpers.selectToLabel
                        |> Select.setId "FORM_DATEPICKER_MINUTES"
                        |> Select.render
                        |> Html.map (UpdateMinutes >> TimeMsg)
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
                , onMouseDown (OpenTimeSelect Seconds |> TimeMsg) |> Html.attributeIf (time.focusedSelect /= Just Seconds) ]
                [ div
                    [ Css.select ]
                    [ Select.view time.seconds
                        |> Select.setToLabel Helpers.selectToLabel
                        |> Select.setId "FORM_DATEPICKER_SECONDS"
                        |> Select.render
                        |> Html.map (UpdateSeconds >> TimeMsg)
                    ]
                ]
            , div
                [ Css.applyButtonContainer ]
                [ div
                    [ Css.applyButton <| isTimeDateSelected || isDateSelected
                    , onClick Apply |> Html.attributeIf (isTimeDateSelected || isDateSelected)
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

    { state | selectedDate = Resettable.init (Resettable.getValue state.selectedDate) }


reset : State -> State
reset state =

    { state | selectedDate = Resettable.reset state.selectedDate }


setInitialDate : Maybe Posix -> State -> State
setInitialDate selectedDate state =

    { state | selectedDate = Resettable.init selectedDate }


setSelectedDate : Maybe Posix -> State -> State
setSelectedDate selectedDate state =

    { state | selectedDate = Resettable.update selectedDate state.selectedDate }


-- VIEW STATE SETTERS --


setMinDate : Maybe Posix -> ViewState -> ViewState
setMinDate date viewState =

    { viewState | minDate = date }


setMaxDate : Maybe Posix -> ViewState -> ViewState
setMaxDate date viewState =

    { viewState | maxDate = date }


setIncludeTime : Bool -> ViewState -> ViewState
setIncludeTime includeTime viewState =

    case includeTime of
        True ->
            { viewState | includeTime = True, toLabel = Helpers.toTimeLabel }

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


setToLabel : (Posix -> String) -> ViewState -> ViewState
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


getInitialDate : State -> Maybe Posix
getInitialDate =
    .selectedDate >> Resettable.getInitialValue


getSelectedDate : State -> Maybe Posix
getSelectedDate =
    .selectedDate >> Resettable.getValue


getId : ViewState -> Maybe String
getId =
    .id