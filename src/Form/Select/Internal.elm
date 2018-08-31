module Form.Select.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setDefaultLabel, setToLabel
    , setInitialOption, setSelectedOption, setIsOptionDisabled
    , setIsError, setIsLocked, setIsClearable
    , setId
    , getIsChanged, getIsOpen
    , getSelectedOption, getInitialOption
    , getId
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Lazy exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)

import Browser.Dom as Dom
import Dict
import Task

import List.Extra as List

import Json.Decode as Decode exposing (Decoder)

import FeatherIcons

import Form.Helpers as Form
import Html.Styled.Bdt as Html
import Resettable exposing (Resettable)

import Form.Select.Css as Css


-- MODEL --


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


initialViewState : (option -> String) -> ViewState option
initialViewState toLabel =
    { isLocked = False
    , isClearable = False
    , isError = False
    , isOptionDisabled = always False
    , toLabel = toLabel
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

    case msg of
        Open ->
            ({ state | isOpen = True }, Cmd.none)

        Blur ->
            case state.focusedOption of
                Nothing ->
                    ({ state | isOpen = False, focusedOption = Nothing }, Cmd.none)

                _ ->
                    (state, Cmd.none)

        Select option ->
            ({ state
                | selectedOption = Resettable.update (Just option) state.selectedOption
                , isOpen = False
                , focusedOption = Nothing
            }, Cmd.none)

        Clear ->
            ({ state | selectedOption = Resettable.update Nothing state.selectedOption }, Cmd.none)

        KeyboardInput isOptionDisabled keyboardInput ->
            handleKeyboardInput state isOptionDisabled keyboardInput

        Focus option ->
            ({ state | focusedOption = Just (focusOption state.options option) }, Cmd.none)

        BlurOption option ->
            case state.focusedOption == Just option of
                True ->
                    ({ state | focusedOption = Nothing, isOpen = False }, Cmd.none)

                False ->
                    (state, Cmd.none)

        DomFocus _ ->
            (state, Cmd.none)


type KeyboardInput
    = Enter
    | Space
    | Up
    | Down


onKeyboardInput : (KeyboardInput -> msg) -> Attribute msg
onKeyboardInput msg =

    preventDefaultOn
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
            ({ state | focusedOption = List.head state.options }, Cmd.none)

        Just focusedOption ->
            case keyboardInput of
                Enter ->
                    case isOptionDisabled of
                        True ->
                            (state, Cmd.none)

                        False ->
                            ({ state
                                | selectedOption = Resettable.update (Just focusedOption) state.selectedOption
                                , isOpen = False
                            }, Cmd.none)

                Space ->
                    case isOptionDisabled of
                        True ->
                            (state, Cmd.none)

                        False ->
                            ({ state
                                | selectedOption = Resettable.update (Just focusedOption) state.selectedOption
                                , isOpen = False
                            }, Cmd.none)

                Up ->
                    let
                        newFocusedOption =
                            focusPreviousOption state.options focusedOption

                    in
                        ({ state | focusedOption = Just newFocusedOption
                        }, Task.attempt DomFocus (Form.toHtmlId newFocusedOption |> Dom.focus))

                Down ->
                    let
                        newFocusedOption =
                            focusNextOption state.options focusedOption

                    in
                        ({ state | focusedOption = Just newFocusedOption
                        }, Task.attempt DomFocus (Form.toHtmlId newFocusedOption |> Dom.focus))


focusOption : List option -> option -> option
focusOption options option =

    case List.member option options of
        True ->
            option

        False ->
            Debug.todo ("SELECT ERROR - can't focus" ++ Form.toHtmlId option ++ " it is not a valid option for this select.")


focusPreviousOption : List option -> option -> option
focusPreviousOption options option =

    focusNextOption (List.reverse options) option


focusNextOption : List option -> option -> option
focusNextOption options option =

    options
        |> List.dropWhile ((/=) option)
        |> List.drop 1
        |> List.head
        |> Maybe.withDefault option


-- VIEW --


render : State option -> ViewState option -> Html (Msg option)
render state viewState =

    case state.isOpen of
        False ->
            lazy2 closed state viewState

        True ->
            lazy2 open state viewState


closed : State option -> ViewState option -> Html (Msg option)
closed state viewState =

    div
        []
        [ div
            [ Css.input viewState.isError viewState.isLocked
            , Html.maybeAttribute id viewState.id
            , disabled viewState.isLocked
            , tabindex 0 |> Html.attributeIf (not viewState.isLocked)
            , onFocus Open |> Html.attributeIf (not viewState.isLocked)
            , onClick Open |> Html.attributeIf (not viewState.isLocked)
            ]
            [ div
                [ title (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel)
                , Css.title (Resettable.getValue state.selectedOption == Nothing)
                ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel) ]
            , clearButton state viewState
            , FeatherIcons.chevronDown |> FeatherIcons.toHtml
            ]
        ]


open : State option -> ViewState option -> Html (Msg option)
open state viewState =

    div
        [ Css.container ]
        [ div
            [ Css.input viewState.isError viewState.isLocked
            , Html.maybeAttribute id viewState.id
            , onKeyboardInput <| KeyboardInput False
            , tabindex -1
            , onBlur Blur
            ]
            [ div
                [ title (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel)
                , Css.title (Resettable.getValue state.selectedOption == Nothing)
                ]
                [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel) ]
            ]
        , optionList state viewState
        ]


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =

    Html.divIf (viewState.isClearable && Resettable.getValue state.selectedOption /= Nothing)
        [ preventDefaultOn "mousedown" { preventDefault = True, stopPropagation = True } (Decode.succeed Clear) ]
        [ FeatherIcons.x |> FeatherIcons.toHtml ]


optionList : State option -> ViewState option -> Html (Msg option)
optionList state viewState =

    div
        [ Css.optionList ]
        (List.map (optionItem state viewState) state.options)


optionItem : State option -> ViewState option -> option -> Html (Msg option)
optionItem state viewState option =

    div
        [ Css.optionItem (viewState.isOptionDisabled option) (state.focusedOption == Just option)
        , id <| Form.toHtmlId option
        , onFocus <| Focus option
        , onBlur <| BlurOption option
        , onKeyboardInput <| KeyboardInput (viewState.isOptionDisabled option)
        , tabindex -1
        , onMouseDown (Select option) |> Html.attributeIf (not (viewState.isOptionDisabled option))
        ]
        [ text (viewState.toLabel option) ]


-- STATE SETTERS --


reInitialise : State option -> State option
reInitialise state =

    { state | selectedOption = Resettable.init (Resettable.getValue state.selectedOption) }


reset : State option -> State option
reset state =

    { state | selectedOption = Resettable.reset state.selectedOption }


setInitialOption : Maybe option -> State option -> State option
setInitialOption selectedOption state =

    { state | selectedOption = Resettable.init selectedOption }


setSelectedOption : Maybe option -> State option -> State option
setSelectedOption selectedOption state =

    { state | selectedOption = Resettable.update selectedOption state.selectedOption }


-- VIEW STATE SETTERS --


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


setIsError : Bool -> ViewState option -> ViewState option
setIsError isError viewState =

    { viewState | isError = isError }


setIsClearable : Bool -> ViewState option -> ViewState option
setIsClearable isClearable viewState =

    { viewState | isClearable = isClearable }


setId : String -> ViewState option -> ViewState option
setId id viewState =

    { viewState | id = Just id }


-- GETTERS --


getIsChanged : State option -> Bool
getIsChanged state =

    Resettable.getIsChanged state.selectedOption


getInitialOption : State option -> Maybe option
getInitialOption state =

    Resettable.getInitialValue state.selectedOption


getSelectedOption : State option -> Maybe option
getSelectedOption state =

    Resettable.getValue state.selectedOption


getIsOpen : State option -> Bool
getIsOpen =
    .isOpen


getId : ViewState option -> Maybe String
getId =
    .id