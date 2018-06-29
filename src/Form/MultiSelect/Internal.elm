module Form.MultiSelect.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setDefaultLabel, setToLabel
    , setInitialOptions, setSelectedOptions, setIsOptionDisabled
    , setIsError, setIsLocked, setIsClearable
    , setId
    , getIsChanged, getIsOpen
    , getSelectedOptions, getInitialOptions
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

import List.Extra as List
import List.Nonempty as Nonempty exposing (Nonempty)

import Json.Decode as Decode exposing (Decoder)

import Form.Helpers as Form
import Html.Styled.Bdt as Html exposing ((?))
import Resettable exposing (Resettable)


-- MODEL --


type alias State option =
    { isOpen : Bool
    , options : Nonempty option
    , selectedOptions : Resettable (List option)
    , focusedOption : Maybe option
    }


init : Nonempty option -> State option
init options =
    { isOpen = False
    , options = options
    , selectedOptions = Resettable.init []
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
    | Unselect option
    | Clear
    | KeyboardInput Bool KeyboardInput
    | Focus option
    | BlurOption option
    | DomFocus (Result Dom.Error ())


update : Msg option -> State option -> (State option, Cmd (Msg option))
update msg state =

    case msg of
        Open ->
            { state | isOpen = True } ! []

        Blur ->
            case state.focusedOption of
                Nothing ->
                    { state | isOpen = False } ! []

                Just _ ->
                     state ! []

        BlurOption option ->
            case Just option == state.focusedOption of
                True ->
                    { state | focusedOption = Nothing, isOpen = False } ! []

                False ->
                     state ! []

        Select option ->
            { state | selectedOptions = Resettable.update (selectOption state option) state.selectedOptions } ! []

        Unselect option ->
            { state | selectedOptions = Resettable.update (unselectOption state.selectedOptions option) state.selectedOptions } ! []

        Clear ->
            { state | selectedOptions = Resettable.update [] state.selectedOptions } ! []

        KeyboardInput isOptionDisabled keyboardInput ->
            handleKeyboardInput state isOptionDisabled keyboardInput

        Focus option ->
            { state | focusedOption = Just (focusOption state.options option) } ! []

        DomFocus result ->
            state ! []


selectOption : State option -> option -> List option
selectOption state option =

    case Nonempty.member option state.options of
        True ->
            option :: Resettable.getValue state.selectedOptions

        False ->
            Debug.crash ("MULTISELECT ERROR - can't select " ++ toString option ++ " is not a valid option for this select.")


unselectOption : Resettable (List option) -> option -> List option
unselectOption selectedOptions option =

    case List.member option (Resettable.getValue selectedOptions) of
        True ->
            List.filter ((/=) option) (Resettable.getValue selectedOptions)

        False ->
            Debug.crash ("MULTISELECT ERROR - can't unselect " ++ toString option ++ " it isn't selected")


focusOption : Nonempty option -> option -> option
focusOption options option =

    case Nonempty.member option options of
        True ->
            option

        False ->
            Debug.crash ("MULTISELECT ERROR - can't focus " ++ toString option ++ " it is not a valid option for this select.")


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
            { state | focusedOption = Just (Nonempty.head state.options) } ! []

        Just focusedOption ->
            case keyboardInput of
                Enter ->
                    case isOptionDisabled of
                        True ->
                            state ! []

                        False ->
                            { state
                                 | selectedOptions = Resettable.update (toggleOption focusedOption state.selectedOptions) state.selectedOptions
                            } ! []

                Space ->
                    case isOptionDisabled of
                        True ->
                            state ! []

                        False ->
                            { state
                                | selectedOptions = Resettable.update (toggleOption focusedOption state.selectedOptions) state.selectedOptions
                            } ! []

                Up ->
                    let
                        newFocusedOption =
                            focusPreviousOption state.options focusedOption

                    in
                        { state | focusedOption = Just newFocusedOption }
                            ! [ Task.attempt DomFocus (Form.toHtmlId newFocusedOption |> Dom.focus) ]

                Down ->
                    let
                        newFocusedOption =
                            focusNextOption state.options focusedOption

                    in
                        { state | focusedOption = Just newFocusedOption }
                            ! [ Task.attempt DomFocus (Form.toHtmlId newFocusedOption |> Dom.focus) ]


toggleOption : option -> Resettable (List option) -> List option
toggleOption option selectedOptions =

    case List.member option (Resettable.getValue selectedOptions) of
        True ->
            List.filter ((/=) option) (Resettable.getValue selectedOptions)

        False ->
            option :: (Resettable.getValue selectedOptions)


focusPreviousOption : Nonempty option -> option -> option
focusPreviousOption options option =

    focusNextOption (Nonempty.reverse options) option


focusNextOption : Nonempty option -> option -> option
focusNextOption options option =

    options
        |> Nonempty.toList
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


closed : State option -> ViewState option -> VirtualDom.Node (Msg option)
closed state viewState =

    div
        [ class "bdt-elm select-container"
        , tabindex -1
        ]
        [ div
            [ class "input option-label-container"
            , classList [("locked", viewState.isLocked), ("error", viewState.isError)]
            , tabindex 0 ? not viewState.isLocked
            , onFocus Open ? not viewState.isLocked
            ]
            [ div
                [ class "option-label"
                , title (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions)
                ]
                [ text (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions) ]
            , clearButton state viewState
            , Html.divIf (not viewState.isLocked)
                [ class "material-icons" ]
                [ text "expand_more" ]
            ]
        ]
        |> Html.toUnstyled


open : State option -> ViewState option -> VirtualDom.Node (Msg option)
open state viewState =

    div
        [ class "bdt-elm select-container"
        ]
        [ div
            [ class "input option-label"
            , tabindex -1
            , onBlur Blur
            , onKeyboardInput <| KeyboardInput False
            , title (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions)
            ]
            [ text (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions) ]
        , optionList state viewState
        ]
        |> Html.toUnstyled


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =

    Html.divIf (viewState.isClearable && List.isEmpty (Resettable.getValue state.selectedOptions))
        [ class "material-icons"
        , onWithOptions "mousedown" { preventDefault = True, stopPropagation = True } (Decode.succeed Clear)
        ]
        [ text "clear" ]


optionText : String -> (option -> String) -> Resettable (List option) -> String
optionText defaultLabel toLabel selectedOptions =

    case List.isEmpty (Resettable.getValue selectedOptions) of
        True ->
            defaultLabel

        False ->
            toString (List.length (Resettable.getValue selectedOptions))
                ++ " options selected: "
                ++ String.join ", " (List.map toLabel (Resettable.getValue selectedOptions))


optionList : State option -> ViewState option -> Html (Msg option)
optionList state viewState =

    div
        [ class "option-list" ]
        (List.map (optionItem state viewState) (Nonempty.toList state.options))


optionItem : State option -> ViewState option -> option -> Html (Msg option)
optionItem state viewState option =

    div
        [ class "option-item"
        , classList [("disabled", viewState.isOptionDisabled option), ("focus", state.focusedOption == Just option)]
        , id <| Form.toHtmlId option
        , handleMouseDown state.selectedOptions option
        , onFocus <| Focus option
        , onBlur <| BlurOption option
        , onKeyboardInput <| KeyboardInput viewState.isLocked
        , tabindex -1
        ]
        [ div
            [ class "material-icons" ]
            [ text (if List.member option (Resettable.getValue state.selectedOptions) then "check_box" else "check_box_outline_blank") ]
        , text (viewState.toLabel option)
        ]


handleMouseDown : Resettable (List option) -> option -> Attribute (Msg option)
handleMouseDown selectedOptions option =

    -- use onMouseDown over onClick so that it triggers before the onBlur on the input
    case List.member option (Resettable.getValue selectedOptions) of
        True ->
            onWithOptions "mousedown" { stopPropagation = False, preventDefault = True } (Decode.succeed <| Unselect option)

        False ->
            onWithOptions "mousedown" { stopPropagation = False, preventDefault = True } (Decode.succeed <| Select option)


-- STATE SETTERS --


reInitialise : State option -> State option
reInitialise state =

    { state | selectedOptions = Resettable.init (Resettable.getValue state.selectedOptions) }


reset : State option -> State option
reset state =

    { state | selectedOptions = Resettable.reset state.selectedOptions }


setInitialOptions : List option -> State option -> State option
setInitialOptions selectedOptions state =

    { state | selectedOptions = Resettable.init selectedOptions }


setSelectedOptions : List option -> State option -> State option
setSelectedOptions selectedOptions state =

    { state | selectedOptions = Resettable.update selectedOptions state.selectedOptions }


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

    Resettable.getIsChanged state.selectedOptions


getInitialOptions : State option -> List option
getInitialOptions state =

    Resettable.getInitialValue state.selectedOptions


getSelectedOptions : State option -> List option
getSelectedOptions state =

    Resettable.getValue state.selectedOptions


getIsOpen : State option -> Bool
getIsOpen =
    .isOpen


getId : ViewState option -> Maybe String
getId =
    .id