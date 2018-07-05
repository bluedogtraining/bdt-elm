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

import VirtualDom

import Dom
import Dict
import Task
import Date exposing (Date)
import Color

import Date.Extra.Core as Date
import Date.Extra.Compare as Date
import List.Extra as List

import Json.Decode as Decode exposing (Decoder)

import Form.Helpers as Form
import Html.Styled.Bdt as Html exposing ((?))
import Resettable exposing (Resettable)

import Icon
import Icon.Internal as Icon

import Form.Select as Select

import Form.DatePicker.Helpers as Helpers
import Form.DatePicker.Css as Css


-- MODEL --


type alias State =
    { isOpen : Bool
    , selectedDate : Resettable (Maybe Date)
    , navigationDate : Maybe Date
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
    , minDate : Maybe Date
    , maxDate : Maybe Date
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


type alias Time =
    { hours : Select.Model String
    , minutes : Select.Model String
    , seconds : Select.Model String
    , focusedSelect : Maybe TimeSelect
    , selectedDate : Maybe Date
    }


initialTime : Resettable (Maybe Date) -> Time
initialTime formValue =

    let
        selectedDate =
            Resettable.getValue formValue

        defaultHours =
            selectedDate
                |> Maybe.map (Date.hour >> toString >> String.padLeft 2 '0')
                |> Maybe.withDefault "00"
                |> Just

        defaultMinutes =
            selectedDate
                |> Maybe.map (Date.minute >> toString >> String.padLeft 2 '0')
                |> Maybe.withDefault "00"
                |> Just

        defaultSeconds =
            selectedDate
                |> Maybe.map (Date.second >> toString >> String.padLeft 2 '0')
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
    = Open (Maybe Date) (Maybe Date) Bool
    | Blur
    | InitWithCurrentDate (Maybe Date) (Maybe Date) Date
    | PreviousYear (Maybe Date)
    | PreviousMonth
    | NextYear (Maybe Date)
    | NextMonth
    | SelectDay Date Bool
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
            { state
                | isOpen = True
                , navigationDate = Resettable.getValue state.selectedDate
                , time = initialTime state.selectedDate
            } ! [ openCmd (Resettable.getValue state.selectedDate) minDate maxDate includeTime ]

        Blur ->
            case Helpers.isTimeFocused state.time of
                True ->
                    state ! []

                False ->
                    { state | isOpen = False, navigationDate = Nothing } ! []

        InitWithCurrentDate minDate maxDate date ->
            { state | navigationDate = initNavigationDate minDate maxDate date } ! []

        PreviousYear minDate ->
            { state | navigationDate = Maybe.map (Helpers.previousYear >> Helpers.maybeClamp minDate state.navigationDate) state.navigationDate } ! []

        PreviousMonth ->
            { state | navigationDate = Maybe.map Helpers.previousMonth state.navigationDate } ! []

        NextYear maxDate ->
            { state | navigationDate = Maybe.map (Helpers.nextYear >> Helpers.maybeClamp state.navigationDate maxDate) state.navigationDate } ! []

        NextMonth ->
            { state | navigationDate = Maybe.map Helpers.nextMonth state.navigationDate } ! []

        SelectDay date includeTime ->

            case includeTime of
                False ->
                    { state | selectedDate = Resettable.update (Just date) state.selectedDate, isOpen = False } ! []

                True ->
                    let
                        time =
                            state.time

                    in
                        { state | time = { time | selectedDate = Just date } } ! []

        Apply ->
            { state | selectedDate = Resettable.update (apply state) state.selectedDate, isOpen = False } ! []

        Clear ->
            { state | selectedDate = Resettable.update Nothing state.selectedDate, isOpen = False } ! []

        TimeMsg timeMsg ->
            let
                (newTime, cmd) =
                    updateTime timeMsg state.time

            in
                { state | time = newTime } ! [cmd]

        NoOp ->
            state ! []

        DomFocus _ ->
            state ! []


openCmd : Maybe Date -> Maybe Date -> Maybe Date -> Bool -> Cmd Msg
openCmd selectedDate minDate maxDate includeTime =

    case selectedDate of
        Nothing ->
            Task.perform (InitWithCurrentDate minDate maxDate) Date.now

        _ ->
            Cmd.none


initNavigationDate : Maybe Date -> Maybe Date -> Date -> Maybe Date
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


apply : State -> Maybe Date
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
            { time | focusedSelect = Just select } ! [ openTimeSelect select ]

        UpdateHours selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg time.hours

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && time.focusedSelect == Just Hours then Nothing else time.focusedSelect

            in
                { time | hours = newSelect , focusedSelect = focusedSelect }
                    ! [ Cmd.map (UpdateHours >> TimeMsg) cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus) ]

        UpdateMinutes selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg time.minutes

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && time.focusedSelect == Just Minutes then Nothing else time.focusedSelect

            in
                { time | minutes = newSelect , focusedSelect = focusedSelect }
                    ! [ Cmd.map (UpdateMinutes >> TimeMsg) cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus) ]

        UpdateSeconds selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg time.seconds

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && time.focusedSelect == Just Seconds then Nothing else time.focusedSelect

            in
                { time | seconds = newSelect , focusedSelect = focusedSelect }
                    ! [ Cmd.map (UpdateSeconds >> TimeMsg) cmd, if focusedSelect /= Nothing then Cmd.none else Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus) ]


-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =

    case state.isOpen of
        False ->
            lazy2 closed state viewState

        True ->
            lazy2 open state viewState


closed : State -> ViewState -> VirtualDom.Node Msg
closed state viewState =

   div
        [ Css.container ]
        [ div
            [ Css.input viewState.isLocked viewState.isError
            , tabindex 0 ? not viewState.isLocked
            , onFocus (Open viewState.minDate viewState.maxDate viewState.includeTime) ? not viewState.isLocked
            , onClick (Open viewState.minDate viewState.maxDate viewState.includeTime) ? not viewState.isLocked
            ]
            [ div
                [ Css.title ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedDate) |> Maybe.withDefault viewState.defaultLabel) ]
            , Html.divIf viewState.isInput
                []
                [ Icon.render Icon.Calendar 16 Color.black ]
            ]
        ]
        |> Html.toUnstyled


open : State -> ViewState -> VirtualDom.Node Msg
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
                [ Css.title ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedDate) |> Maybe.withDefault viewState.defaultLabel)  ]
            , Html.divIf viewState.isInput
                []
                [ Icon.render Icon.Calendar 16 Color.black ]
            ]
        , calendar state viewState
        ]
        |> Html.toUnstyled


calendar : State -> ViewState -> Html Msg
calendar state viewState =

    case state.navigationDate of
        Nothing ->
            text ""

        Just date ->
            div
                [ Css.calendar
                , disableMouseDown ? not (Helpers.isTimeFocused state.time) ]
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
    onWithOptions "mousedown" { stopPropagation = False, preventDefault = True } (Decode.succeed NoOp)


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

    (Date.year date |> toString) ++ " - " ++ (Date.month date |> Helpers.monthToString)


previousYearArrow : ViewState -> Date -> Html Msg
previousYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.minDate == Just (Date.year navigationDate) &&
            Maybe.map Date.month viewState.minDate == Just (Date.month navigationDate)

    in
        div
            [ Css.yearArrows isDisabled
            , onClick (PreviousYear viewState.minDate) ? not isDisabled
            ]
            [ div
                [ Css.offsetYearArrow ]
                [ Icon.render Icon.ChevronLeft 16 Color.black ]
            , Icon.render Icon.ChevronLeft 16 Color.black
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
            , onClick PreviousMonth ? not isDisabled
            ]
            [ Icon.render Icon.ChevronLeft 16 Color.black ]


nextYearArrow : ViewState -> Date -> Html Msg
nextYearArrow viewState navigationDate =

    let
        isDisabled =
            Maybe.map Date.year viewState.maxDate == Just (Date.year navigationDate) &&
            Maybe.map Date.month viewState.maxDate == Just (Date.month navigationDate)

    in
        div
            [ Css.yearArrows isDisabled
            , onClick (NextYear viewState.maxDate) ? not isDisabled
            ]
            [ div
                [ Css.offsetYearArrow ]
                [ Icon.render Icon.ChevronRight 16 Color.black ]
            , Icon.render Icon.ChevronRight 16 Color.black
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
            , onClick NextMonth ? not isDisabled
            ]
            [ Icon.render Icon.ChevronRight 16 Color.black ]


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
            Date.toFirstOfMonth navigationDate

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
            , onClick (SelectDay date viewState.includeTime) ? isCurrentMonth && isInRange ]
            [ text (toString dayNumber) ]


timePickerContainer : State -> Bool -> Html Msg
timePickerContainer state includeTime =

    timePicker state.time (Resettable.getValue state.selectedDate)
        |> Html.viewIf includeTime


timePicker : Time -> Maybe Date -> Html Msg
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
                , onMouseDown (OpenTimeSelect Hours |> TimeMsg) ? time.focusedSelect /= Just Hours ]
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
                , onMouseDown (OpenTimeSelect Minutes |> TimeMsg) ? time.focusedSelect /= Just Minutes ]
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
                , onMouseDown (OpenTimeSelect Seconds |> TimeMsg) ? time.focusedSelect /= Just Seconds ]
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
                    , onClick Apply ? isTimeDateSelected || isDateSelected
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
        , onClick Clear ? Resettable.getValue state.selectedDate /= Nothing
        ]
        [ text "clear currently selected date" ]


-- STATE SETTERS --


reInitialise : State -> State
reInitialise state =

    { state | selectedDate = Resettable.init (Resettable.getValue state.selectedDate) }


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