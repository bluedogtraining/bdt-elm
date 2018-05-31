module Form.Select.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reset
    , setDefaultLabel, setToLabel
    , setInitialOption, setSelectedOption, setIsOptionDisabled
    , setIsClearable, setIsError, setIsLocked
    , setId
    , getIsOpen, getIsChanged
    , getSelectedOption, getOriginalOption
    , getId
    )

import Html.Styled exposing (..)
import Html.Styled.Lazy as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)

import Dom
import VirtualDom
import Dict
import Task
import Http

import List.Extra as List
import String.Extra as String

import Json.Decode as Decode exposing (Decoder)

import Html.Bdt as Html exposing ((?))
import Resettable exposing (Resettable)

import Form.Select.Css as Css


type alias State option =
    { isOpen : Bool
    , options : List option
    , selectedOption : Resettable (Maybe option)
    , focusedOption : Maybe option
    }


init : List option -> State option
init options =
    { isOpen = False
    , options = options
    , selectedOption = Resettable.init Nothing
    , focusedOption = Nothing
    }


type alias ViewState option =
    { isLocked : Bool
    , isClearable : Bool
    , isError : Bool
    , isOptionDisabled : option -> Bool
    , toLabel : option -> String
    , defaultLabel : String
    , id : Maybe String
    }


initialViewState : ViewState option
initialViewState =
    { isLocked = False
    , isClearable = False
    , isError = False
    , isOptionDisabled = always False
    , toLabel = toString
    , defaultLabel = "-- Nothing Selected --"
    , id = Nothing
    }


-- UPDATE --


type Msg option
    = Open
    | Blur
    | Select option
    | Clear
    | KeyboardInput Bool KeyboardInput
    | Focus option
    | BlurOption option
    | DomFocus (Result Dom.Error ())


update : Msg option -> State option -> (State option, Cmd (Msg option))
update msg state =

    let
        (newState, cmd) =
            case msg of
                Open ->
                    { state | isOpen = True } ! []

                Blur ->
                    { state | isOpen = False, focusedOption = Nothing } ! [ Cmd.none ]

                Select option ->
                    { state
                        | selectedOption = Resettable.update (Just option) state.selectedOption
                        , isOpen = False
                        , focusedOption = Nothing
                    } ! []

                Clear ->
                    { state | selectedOption = Resettable.update Nothing state.selectedOption } ! []

                KeyboardInput isOptionDisabled keyboardInput ->
                    handleKeyboardInput state isOptionDisabled keyboardInput

                Focus option ->
                    { state | focusedOption = Just (focusOption state.options option) } ! []

                BlurOption option ->
                    case state.focusedOption == Just option of
                        True ->
                            { state | focusedOption = Nothing, isOpen = False } ! []

                        False ->
                            state ! []

                DomFocus _ ->
                    state ! []

    in
        newState ! [ cmd ]


type KeyboardInput
    = Enter
    | Space
    | Up
    | Down


onKeyboardInput : (KeyboardInput -> msg) -> Attribute msg
onKeyboardInput msg =

    onWithOptions
        "keydown"
        { preventDefault = True, stopPropagation = True }
        (Decode.andThen (isSelectInputKey msg) keyCode)


isSelectInputKey : (KeyboardInput -> msg) -> Int -> Decoder msg
isSelectInputKey msg code =

    let
        dict =
            Dict.fromList [(13, Enter), (32, Space), (38, Up), (40, Down)]

    in
        case Dict.get code dict of

            Just selectKeyboardInput ->
                Decode.succeed (msg selectKeyboardInput)

            Nothing ->
                Decode.fail "Not a select input key"


handleKeyboardInput: State option -> Bool -> KeyboardInput -> (State option, Cmd (Msg option))
handleKeyboardInput state isOptionDisabled keyboardInput =

    case state.focusedOption of

        Nothing ->
            { state | focusedOption = List.head state.options } ! []

        Just focusedOption ->
            case keyboardInput of
                Enter ->
                    case isOptionDisabled of
                        True ->
                            state ! []

                        False ->
                            { state
                                | selectedOption = Resettable.update (Just focusedOption) state.selectedOption
                                , isOpen = False
                            } ! []

                Space ->
                    case isOptionDisabled of
                        True ->
                            state ! []

                        False ->
                            { state
                                | selectedOption = Resettable.update (Just focusedOption) state.selectedOption
                                , isOpen = False
                            } ! []

                Up ->
                    let
                        newFocusedOption =
                            focusPreviousOption state.options focusedOption

                    in
                        { state | focusedOption = Just newFocusedOption }
                            ! [ Task.attempt DomFocus (toHtmlId newFocusedOption |> Dom.focus) ]

                Down ->
                    let
                        newFocusedOption =
                            focusNextOption state.options focusedOption

                    in
                        { state | focusedOption = Just newFocusedOption }
                            ! [ Task.attempt DomFocus (toHtmlId newFocusedOption |> Dom.focus) ]


focusOption : List option -> option -> option
focusOption options option =

    case List.member option options of
        True ->
            option

        False ->
            Debug.crash ("SELECT ERROR - can't focus" ++ toHtmlId option ++ " it is not a valid option for this select.")


focusPreviousOption : List option -> option -> option
focusPreviousOption options option =

    focusNextOption (List.reverse options) option


focusNextOption : List option -> option -> option
focusNextOption options option =

    let
        maybeNextOption =
            options
                |> List.dropWhile ((/=) option)
                |> List.drop 1
                |> List.head

    in
        case maybeNextOption of
            Nothing ->
                option

            Just nextOption ->
                nextOption


-- VIEW --


render : State option -> ViewState option -> Html (Msg option)
render state viewState =

    case state.isOpen of
        False ->
            Html.lazy2 closed state viewState

        True ->
            Html.lazy2 open state viewState


closed : State option -> ViewState option -> VirtualDom.Node (Msg option)
closed state viewState =

    div
        [ Css.container ]
        [ div
            [ Css.optionTextContainer viewState.isLocked viewState.isError
            , class "form-control"
            , id (viewState.id |> Maybe.withDefault "")
            , disabled viewState.isLocked
            , tabindex 0 ? not viewState.isLocked
            , onFocus Open ? not viewState.isLocked
            , onClick Open ? not viewState.isLocked
            ]
            [ div
                [ title (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel) ]
                [ div
                    [ Css.optionText ]
                    [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel) ]
                ]
            , clearButton state viewState
            , Html.divIf (not viewState.isLocked)
                [ class "glyphicons glyphicons-chevron-down" ]
                []
            ]
        ]
        |> Html.Styled.toUnstyled


open : State option -> ViewState option -> VirtualDom.Node (Msg option)
open state viewState =

    div
        [ Css.container ]
        [ div
            [ Css.optionTextContainer viewState.isLocked viewState.isError
            , class "form-control"
            , id (viewState.id |> Maybe.withDefault "")
            , onKeyboardInput (KeyboardInput False)
            , tabindex -1
            , onBlur Blur
            ]
            [ div
                [ Css.optionText
                , title (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel)
                ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel) ]
            ]
        , optionList state viewState
        ]
        |> Html.Styled.toUnstyled


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =

    Html.divIf (viewState.isClearable && Resettable.getValue state.selectedOption /= Nothing)
        [ class "glyphicons glyphicons-remove"
        , onWithOptions "mousedown" { preventDefault = True, stopPropagation = True } (Decode.succeed Clear)
        ]
        []


optionList : State option -> ViewState option -> Html (Msg option)
optionList state viewState =

    div
        [ Css.optionList ]
        (List.map (optionItem state viewState) state.options)


optionItem : State option -> ViewState option -> option -> Html (Msg option)
optionItem state viewState option =

    div
        [ Css.optionItem (viewState.isOptionDisabled option) (Just option == state.focusedOption)
        , id (toHtmlId option)
        , onFocus (Focus option)
        , onBlur (BlurOption option)
        , onKeyboardInput (KeyboardInput (viewState.isOptionDisabled option))
        , tabindex -1
        , onMouseDown (Select option) ? not (viewState.isOptionDisabled option)
        ]
        [ text (viewState.toLabel option) ]


-- INTERNAL SETTERS --


setInitialOption : Maybe option -> State option -> State option
setInitialOption selectedOption state =

    { state | selectedOption = Resettable.init selectedOption }


setSelectedOption : Maybe option -> State option -> State option
setSelectedOption selectedOption state =

    { state | selectedOption = Resettable.update selectedOption state.selectedOption }


reset : State option -> State option
reset state =

    { state | selectedOption = Resettable.reset state.selectedOption }


-- VIEW SETTERS --


setToLabel : (option -> String) -> ViewState option -> ViewState option
setToLabel toLabel viewState =

    { viewState | toLabel = toLabel }


setDefaultLabel : String -> ViewState option -> ViewState option
setDefaultLabel defaultLabel viewState =

    { viewState | defaultLabel = defaultLabel }


setIsOptionDisabled : (option -> Bool) -> ViewState option -> ViewState option
setIsOptionDisabled isOptionDisabled viewState =

    { viewState | isOptionDisabled = isOptionDisabled }


setIsLocked : Bool -> ViewState option -> ViewState option
setIsLocked isLocked viewState =

    { viewState | isLocked = isLocked }


setIsClearable : Bool -> ViewState option -> ViewState option
setIsClearable isClearable viewState =

    { viewState | isClearable = isClearable }


setIsError : Bool -> ViewState option -> ViewState option
setIsError isError viewState =

    { viewState | isError = isError }


setId : String -> ViewState option -> ViewState option
setId id viewState =

    { viewState | id = Just id }


-- GETTERS --


getSelectedOption : State option -> Maybe option
getSelectedOption state =

    Resettable.getValue state.selectedOption


getOriginalOption : State option -> Maybe option
getOriginalOption state =

    Resettable.getOriginalValue state.selectedOption


getIsChanged : State option -> Bool
getIsChanged state =

    Resettable.isChanged state.selectedOption


getIsOpen : State option -> Bool
getIsOpen =
    .isOpen


getId : ViewState option -> Maybe String
getId =
    .id


-- HELPERS --


toHtmlId : option -> String
toHtmlId option =
    option
        |> toString
        |> Http.encodeUri
        |> String.replace "%" ""