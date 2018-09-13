module Form.DatePicker.Internal exposing
    ( Msg
    , State
    , ViewState
    , getId
    , getInitialPosix
    , getIsChanged
    , getIsOpen
    , getSelectedPosix
    , init
    , initialViewState
    , reInitialise
    , render
    , reset
    , setDefaultLabel
    , setId
    , setIncludeTime
    , setInitialPosix
    , setIsClearable
    , setIsError
    , setIsInput
    , setIsLocked
    , setMaxPosix
    , setMinPosix
    , setSelectedPosix
    , update
    )

import Browser.Dom as Dom
import Dict
import FeatherIcons
import Form.DatePicker.Css as Css
import Form.DatePicker.Helpers as Helpers
import Form.Helpers as Form
import Form.Select as Select
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
import Json.Decode as Decode exposing (Decoder)
import List.Extra as List
import List.Nonempty exposing (Nonempty(..))
import Resettable exposing (Resettable)
import Task
import Time exposing (Posix)
import Time.Bdt as Time
import Time.Date as Date exposing (Date)
import Time.Date.Bdt as Date
import Time.DateTime as DateTime exposing (DateTime)



-- MODEL --


type alias State =
    { isOpen : Bool
    , selectedPosix : Resettable (Maybe Posix)
    , navigationPosix : Maybe Posix -- date on which the datepicker is open
    , desiredPosix : Maybe Posix -- date selected with timepicker enabled
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

        minutes =
            List.range 1 59
                |> Nonempty 0
                |> Select.init

        seconds =
            List.range 1 59
                |> Nonempty 0
                |> Select.init
    in
    { isOpen = False
    , selectedPosix = Resettable.init Nothing
    , navigationPosix = Nothing
    , desiredPosix = Nothing
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
    , minPosix : MinPosix
    , maxPosix : MaxPosix
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
    , minPosix = Nothing
    , maxPosix = Nothing
    , toLabel = Time.toDateString
    , defaultLabel = "-- Nothing Selected --"
    , includeTime = False
    , id = Nothing
    }


type alias MinPosix =
    Maybe Posix


type alias MaxPosix =
    Maybe Posix


type alias IncludeTime =
    Bool


type TimeSelect
    = Hours
    | Minutes
    | Seconds



-- UPDATE --


type Msg
    = Open MinPosix MaxPosix IncludeTime
    | Blur
    | InitWithCurrentDate MinPosix MaxPosix Posix
    | PreviousYear MinPosix
    | PreviousMonth
    | NextYear MaxPosix
    | NextMonth
    | SelectDay Posix IncludeTime
    | OpenTimeSelect TimeSelect
    | UpdateHours (Select.Msg Int)
    | UpdateMinutes (Select.Msg Int)
    | UpdateSeconds (Select.Msg Int)
    | Apply
    | Clear
    | DomFocus (Result Dom.Error ())
    | NoOp


update : Msg -> State -> ( State, Cmd Msg )
update msg state =
    case msg of
        Open minPosix maxPosix includeTime ->
            ( { state
                | isOpen = True
                , navigationPosix = Resettable.getValue state.selectedPosix
                , desiredPosix = Resettable.getValue state.selectedPosix
                , hours =
                    state.selectedPosix
                        |> Resettable.getValue
                        |> Maybe.map (Time.toHour Time.utc)
                        |> (\option -> Select.setInitialOption (option |> Maybe.withDefault 0 |> Just) state.hours)
                , minutes =
                    state.selectedPosix
                        |> Resettable.getValue
                        |> Maybe.map (Time.toMinute Time.utc)
                        |> (\option -> Select.setInitialOption (option |> Maybe.withDefault 0 |> Just) state.minutes)
                , seconds =
                    state.selectedPosix
                        |> Resettable.getValue
                        |> Maybe.map (Time.toSecond Time.utc)
                        |> (\option -> Select.setInitialOption (option |> Maybe.withDefault 0 |> Just) state.seconds)
                , focusedSelect = Nothing
              }
            , openCmd (Resettable.getValue state.selectedPosix) minPosix maxPosix includeTime
            )

        Blur ->
            case state.focusedSelect == Nothing of
                True ->
                    ( { state | isOpen = False }, Cmd.none )

                False ->
                    ( state, Cmd.none )

        InitWithCurrentDate minPosix maxPosix posix ->
            ( { state | navigationPosix = Just <| Time.maybeClamp minPosix maxPosix posix }, Cmd.none )

        PreviousYear minPosix ->
            ( { state | navigationPosix = Maybe.map (Time.addMonths -12 >> Time.maybeClamp minPosix state.navigationPosix) state.navigationPosix }, Cmd.none )

        PreviousMonth ->
            ( { state | navigationPosix = Maybe.map (Time.addMonths -1) state.navigationPosix }, Cmd.none )

        NextYear maxPosix ->
            ( { state | navigationPosix = Maybe.map (Time.addMonths 12 >> Time.maybeClamp state.navigationPosix maxPosix) state.navigationPosix }, Cmd.none )

        NextMonth ->
            ( { state | navigationPosix = Maybe.map (Time.addMonths 1) state.navigationPosix }, Cmd.none )

        SelectDay posix includeTime ->
            case includeTime of
                False ->
                    let
                        newPosix =
                            case Resettable.getValue state.selectedPosix of
                                Nothing ->
                                    posix

                                Just currentPosix ->
                                    currentPosix
                                        |> DateTime.fromPosix
                                        |> DateTime.setYear (Time.toYear Time.utc posix)
                                        |> DateTime.setMonth (Time.toMonth Time.utc posix |> Time.monthNumber)
                                        |> DateTime.setDay (Time.toDay Time.utc posix)
                                        |> DateTime.toPosix
                    in
                    ( { state | selectedPosix = Resettable.update (Just newPosix) state.selectedPosix, isOpen = False }, Cmd.none )

                True ->
                    ( { state | desiredPosix = Just posix }, Cmd.none )

        Apply ->
            case state.desiredPosix of
                Nothing ->
                    ( state, Cmd.none )

                Just desiredPosix ->
                    let
                        newPosix =
                            DateTime.epoch
                                |> DateTime.setYear (Time.toYear Time.utc desiredPosix)
                                |> DateTime.setMonth (Time.toMonth Time.utc desiredPosix |> Time.monthNumber)
                                |> DateTime.setDay (Time.toDay Time.utc desiredPosix)
                                |> DateTime.setHour (Select.getSelectedOption state.hours |> Maybe.withDefault 0)
                                |> DateTime.setMinute (Select.getSelectedOption state.minutes |> Maybe.withDefault 0)
                                |> DateTime.setSecond (Select.getSelectedOption state.seconds |> Maybe.withDefault 0)
                                |> DateTime.toPosix
                    in
                    ( { state | selectedPosix = Resettable.update (Just newPosix) state.selectedPosix, isOpen = False }, Cmd.none )

        Clear ->
            ( { state | selectedPosix = Resettable.update Nothing state.selectedPosix, isOpen = False }, Cmd.none )

        OpenTimeSelect select ->
            ( { state | focusedSelect = Just select }, openTimeSelect select )

        UpdateHours selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg state.hours

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && state.focusedSelect == Just Hours then
                        Nothing

                    else
                        state.focusedSelect
            in
            ( { state
                | hours = newSelect
                , focusedSelect = focusedSelect
              }
            , Cmd.batch
                [ Cmd.map UpdateHours cmd
                , if focusedSelect /= Nothing then
                    Cmd.none

                  else
                    Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus)
                ]
            )

        UpdateMinutes selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg state.minutes

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && state.focusedSelect == Just Minutes then
                        Nothing

                    else
                        state.focusedSelect
            in
            ( { state
                | minutes = newSelect
                , focusedSelect = focusedSelect
              }
            , Cmd.batch
                [ Cmd.map UpdateMinutes cmd
                , if focusedSelect /= Nothing then
                    Cmd.none

                  else
                    Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus)
                ]
            )

        UpdateSeconds selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg state.seconds

                focusedSelect =
                    if not (Select.getIsOpen newSelect) && state.focusedSelect == Just Seconds then
                        Nothing

                    else
                        state.focusedSelect
            in
            ( { state
                | seconds = newSelect
                , focusedSelect = focusedSelect
              }
            , Cmd.batch
                [ Cmd.map UpdateSeconds cmd
                , if focusedSelect /= Nothing then
                    Cmd.none

                  else
                    Task.attempt DomFocus ("FORM_DATEPICKER" |> Dom.focus)
                ]
            )

        DomFocus _ ->
            ( state, Cmd.none )

        NoOp ->
            ( state, Cmd.none )


openCmd : Maybe Posix -> MinPosix -> MaxPosix -> IncludeTime -> Cmd Msg
openCmd date minPosix maxPosix includeTime =
    case date of
        Nothing ->
            Task.perform (InitWithCurrentDate minPosix maxPosix) Time.now

        _ ->
            Cmd.none


openTimeSelect : TimeSelect -> Cmd Msg
openTimeSelect timeSelect =
    case timeSelect of
        Hours ->
            Task.attempt DomFocus (Dom.focus "FORM_DATEPICKER_HOURS")

        Minutes ->
            Task.attempt DomFocus (Dom.focus "FORM_DATEPICKER_MINUTES")

        Seconds ->
            Task.attempt DomFocus (Dom.focus "FORM_DATEPICKER_SECONDS")



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
            , onFocus (Open viewState.minPosix viewState.maxPosix viewState.includeTime) |> Html.attributeIf (not viewState.isLocked)
            , onClick (Open viewState.minPosix viewState.maxPosix viewState.includeTime) |> Html.attributeIf (not viewState.isLocked)
            ]
            [ div
                [ Css.title (Resettable.getValue state.selectedPosix == Nothing) ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedPosix) |> Maybe.withDefault viewState.defaultLabel) ]
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
                [ Css.title (Resettable.getValue state.selectedPosix == Nothing) ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedPosix) |> Maybe.withDefault viewState.defaultLabel) ]
            , Html.divIf viewState.isInput
                []
                [ FeatherIcons.calendar |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            ]
        , calendar state viewState
        ]


calendar : State -> ViewState -> Html Msg
calendar state viewState =
    case state.navigationPosix of
        Nothing ->
            text ""

        Just posix ->
            div
                [ Css.calendar
                , disableMouseDown |> Html.attributeIf (state.focusedSelect == Nothing)
                ]
                [ calendarNavigation state viewState posix
                , div
                    [ Css.weekDayList ]
                    (List.map calendarWeekDay [ "mon", "tue", "wed", "thu", "fri", "sat", "sun" ])
                , div
                    []
                    [ calendarDays state viewState posix ]
                , timePickerContainer state viewState.includeTime
                , clearDateContainer state viewState
                ]


disableMouseDown : Attribute Msg
disableMouseDown =
    preventDefaultOn "mousedown" <| Decode.succeed ( NoOp, True )


calendarNavigation : State -> ViewState -> Posix -> Html Msg
calendarNavigation state viewState navigationPosix =
    div
        [ Css.navigation ]
        [ previousYearArrow viewState navigationPosix
        , previousMonthArrow viewState navigationPosix
        , div
            [ Css.date ]
            [ text <| calendarNavigationTitle navigationPosix ]
        , nextMonthArrow viewState navigationPosix
        , nextYearArrow viewState navigationPosix
        ]


calendarNavigationTitle : Posix -> String
calendarNavigationTitle posix =
    (Time.toYear Time.utc posix |> String.fromInt) ++ " - " ++ (Time.toMonth Time.utc posix |> Time.monthString)


previousYearArrow : ViewState -> Posix -> Html Msg
previousYearArrow viewState navigationPosix =
    let
        isDisabled =
            Helpers.isSameMonthAndYear navigationPosix viewState.minPosix
    in
    div
        [ Css.yearArrows isDisabled
        , onClick (PreviousYear viewState.minPosix) |> Html.attributeIf (not isDisabled)
        ]
        [ div
            [ Css.offsetYearArrow ]
            [ FeatherIcons.chevronLeft |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
        , FeatherIcons.chevronLeft |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled
        ]


previousMonthArrow : ViewState -> Posix -> Html Msg
previousMonthArrow viewState navigationPosix =
    let
        isDisabled =
            Helpers.isSameMonthAndYear navigationPosix viewState.minPosix
    in
    div
        [ Css.monthArrows isDisabled
        , onClick PreviousMonth |> Html.attributeIf (not isDisabled)
        ]
        [ FeatherIcons.chevronLeft |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


nextYearArrow : ViewState -> Posix -> Html Msg
nextYearArrow viewState navigationPosix =
    let
        isDisabled =
            Helpers.isSameMonthAndYear navigationPosix viewState.maxPosix
    in
    div
        [ Css.yearArrows isDisabled
        , onClick (NextYear viewState.maxPosix) |> Html.attributeIf (not isDisabled)
        ]
        [ div
            [ Css.offsetYearArrow ]
            [ FeatherIcons.chevronRight |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
        , FeatherIcons.chevronRight |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled
        ]


nextMonthArrow : ViewState -> Posix -> Html Msg
nextMonthArrow viewState navigationPosix =
    let
        isDisabled =
            Helpers.isSameMonthAndYear navigationPosix viewState.maxPosix
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


calendarDays : State -> ViewState -> Posix -> Html Msg
calendarDays state viewState navigationPosix =
    let
        rows =
            Helpers.visibleDays navigationPosix
    in
    div
        []
        (List.map (calendarDayRow state viewState navigationPosix) rows)


calendarDayRow : State -> ViewState -> Posix -> List Posix -> Html Msg
calendarDayRow state viewState navigationPosix row =
    div
        [ Css.calendarDayRow ]
        (List.map (calendarDay state viewState navigationPosix) row)


calendarDay : State -> ViewState -> Posix -> Posix -> Html Msg
calendarDay state viewState navigationPosix posix =
    let
        isCurrentMonth =
            Time.posixToMillis posix == Time.posixToMillis navigationPosix

        isSelectedPosix =
            case Resettable.getValue state.selectedPosix of
                Nothing ->
                    False

                Just selectedPosix ->
                    Time.posixToMillis posix == Time.posixToMillis selectedPosix

        isDesiredPosix =
            case state.desiredPosix of
                Nothing ->
                    False

                Just desiredPosix ->
                    Time.posixToMillis posix == Time.posixToMillis desiredPosix

        isInRange =
            posix
                |> Time.maybeClamp viewState.minPosix viewState.maxPosix
                |> (\clamped -> Time.posixToMillis posix == Time.posixToMillis clamped)
    in
    div
        [ Css.calendarDayItem isSelectedPosix isDesiredPosix (isCurrentMonth && isInRange)
        , onClick (SelectDay posix viewState.includeTime) |> Html.attributeIf (isCurrentMonth && isInRange)
        ]
        [ text <| String.fromInt <| Time.toDay Time.utc posix ]


timePickerContainer : State -> Bool -> Html Msg
timePickerContainer state includeTime =
    timePicker state
        |> Html.viewIf includeTime


timePicker : State -> Html Msg
timePicker state =
    let
        isDateSelected =
            Resettable.getValue state.selectedPosix /= Nothing

        isDesiredDateSelected =
            state.desiredPosix /= Nothing
    in
    div
        [ Css.timePickerContainer ]
        [ div
            [ Css.selectContainer
            , onMouseDown (OpenTimeSelect Hours) |> Html.attributeIf (state.focusedSelect /= Just Hours)
            ]
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
            , onMouseDown (OpenTimeSelect Minutes) |> Html.attributeIf (state.focusedSelect /= Just Minutes)
            ]
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
            , onMouseDown (OpenTimeSelect Seconds) |> Html.attributeIf (state.focusedSelect /= Just Seconds)
            ]
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
        [ Css.clearButton <| Resettable.getValue state.selectedPosix /= Nothing
        , onClick Clear |> Html.attributeIf (Resettable.getValue state.selectedPosix /= Nothing)
        ]
        [ text "clear currently selected date" ]



-- STATE SETTERS --


reInitialise : State -> State
reInitialise state =
    { state | selectedPosix = Resettable.init <| Resettable.getValue state.selectedPosix }


reset : State -> State
reset state =
    { state | selectedPosix = Resettable.reset state.selectedPosix }


setInitialPosix : Maybe Posix -> State -> State
setInitialPosix posix state =
    { state | selectedPosix = Resettable.init posix }


setSelectedPosix : Maybe Posix -> State -> State
setSelectedPosix posix state =
    { state | selectedPosix = Resettable.update posix state.selectedPosix }



-- VIEW STATE SETTERS --


setMinPosix : Maybe Posix -> ViewState -> ViewState
setMinPosix posix viewState =
    { viewState | minPosix = posix }


setMaxPosix : Maybe Posix -> ViewState -> ViewState
setMaxPosix posix viewState =
    { viewState | maxPosix = posix }


setIncludeTime : Bool -> ViewState -> ViewState
setIncludeTime includeTime viewState =
    case includeTime of
        True ->
            { viewState | includeTime = True, toLabel = Time.toDateTimeString }

        False ->
            { viewState | includeTime = False, toLabel = Time.toDateString }


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
    .selectedPosix >> Resettable.getIsChanged


getIsOpen : State -> Bool
getIsOpen =
    .isOpen


getInitialPosix : State -> Maybe Posix
getInitialPosix =
    .selectedPosix >> Resettable.getInitialValue


getSelectedPosix : State -> Maybe Posix
getSelectedPosix =
    .selectedPosix >> Resettable.getValue


getId : ViewState -> Maybe String
getId =
    .id
