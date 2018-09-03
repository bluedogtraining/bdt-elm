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

import Browser.Dom as Dom
import Dict
import Task

import List.Nonempty as Nonempty exposing (Nonempty)

import Json.Decode as Decode exposing (Decoder)

import FeatherIcons

import Form.Helpers as Form exposing
    ( UpDown (..), onUpDown, onSpaceEnter
    , getNextOption, getPreviousOption
    , focusOption
    )
import Html.Styled.Bdt as Html
import Resettable exposing (Resettable)

import Form.MultiSelect.Css as Css


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
    | UpDown (option -> String) UpDown
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
                    ({ state | isOpen = False }, Cmd.none)

                Just _ ->
                     (state, Cmd.none)

        BlurOption option ->
            case Just option == state.focusedOption of
                True ->
                    ({ state | focusedOption = Nothing, isOpen = False }, Cmd.none)

                False ->
                     (state, Cmd.none)

        Select option ->
            ({ state | selectedOptions = toggleOption option state.selectedOptions }, Cmd.none)

        Clear ->
            ({ state | selectedOptions = Resettable.update [] state.selectedOptions }, Cmd.none)

        UpDown toLabel Up ->
            let
                newFocusedOption =
                    getPreviousOption (Nonempty.toList state.options) state.focusedOption

            in
                ({ state | focusedOption = newFocusedOption }, focusOption toLabel newFocusedOption DomFocus)

        UpDown toLabel Down ->
            let
                newFocusedOption =
                    getNextOption (Nonempty.toList state.options) state.focusedOption

            in
                ({ state | focusedOption = newFocusedOption }, focusOption toLabel newFocusedOption DomFocus)

        Focus option ->
            ({ state | focusedOption = Just option }, Cmd.none)

        DomFocus result ->
            (state, Cmd.none)


toggleOption : option -> Resettable (List option) -> Resettable (List option)
toggleOption option selectedOptions =
    let
        options =
            Resettable.getValue selectedOptions

        newOptions =
            case List.member option options of
                True ->
                    List.filter ((/=) option) options

                False ->
                    option :: options

    in
        Resettable.update newOptions selectedOptions


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
        [ Css.container
        , tabindex -1
        ]
        [ div
            [ Css.input viewState.isError viewState.isLocked
            , tabindex 0 |> Html.attributeIf (not viewState.isLocked)
            , onFocus Open |> Html.attributeIf (not viewState.isLocked)
            ]
            [ div
                [ Css.title (Resettable.getValue state.selectedOptions |> List.isEmpty)
                , title (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions)
                ]
                [ text (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions) ]
            , clearButton state viewState
            , Html.divIf (not viewState.isLocked) [] [ FeatherIcons.chevronDown |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
            ]
        ]


open : State option -> ViewState option -> Html (Msg option)
open state viewState =

    div
        [ Css.container ]
        [ div
            [ Css.input viewState.isError viewState.isLocked
            , tabindex -1
            , onBlur Blur
            , onUpDown <| UpDown viewState.toLabel
            , Css.title (Resettable.getValue state.selectedOptions |> List.isEmpty)
            , title (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions)
            ]
            [ text (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions) ]
        , optionList state viewState
        ]


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =

    Html.divIf (viewState.isClearable && List.isEmpty (Resettable.getValue state.selectedOptions))
        [ preventDefaultOn "mousedown" <| Decode.succeed (Clear, True) ]
        [ FeatherIcons.x |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


optionText : String -> (option -> String) -> Resettable (List option) -> String
optionText defaultLabel toLabel selectedOptions =

    case List.isEmpty (Resettable.getValue selectedOptions) of
        True ->
            defaultLabel

        False ->
            String.fromInt (List.length (Resettable.getValue selectedOptions))
                ++ " option" ++ (if List.length (Resettable.getValue selectedOptions) > 1 then "s" else "") ++ " selected: "
                ++ String.join ", " (List.map toLabel (Resettable.getValue selectedOptions))


optionList : State option -> ViewState option -> Html (Msg option)
optionList state viewState =

    div
        [ Css.optionList ]
        (List.map (optionItem state viewState) (Nonempty.toList state.options))


optionItem : State option -> ViewState option -> option -> Html (Msg option)
optionItem state viewState option =

    div
        [ Css.optionItem (viewState.isOptionDisabled option) (state.focusedOption == Just option)
        , id <| Form.toHtmlId viewState.toLabel option
        , onFocus <| Focus option
        , onBlur <| BlurOption option
        , handleMouseDown state.selectedOptions option
        , onSpaceEnter (Select option) |> Html.attributeIf (not (viewState.isOptionDisabled option))
        , tabindex -1
        ]
        [ div
            [ Css.checkBox ]
            [
                if List.member option (Resettable.getValue state.selectedOptions)
                then FeatherIcons.checkSquare |> FeatherIcons.toHtml [] |> Html.fromUnstyled
                else FeatherIcons.square |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]
        , text (viewState.toLabel option)
        ]


handleMouseDown : Resettable (List option) -> option -> Attribute (Msg option)
handleMouseDown selectedOptions option =

    -- use onMouseDown over onClick so that it triggers before the onBlur on the input
    preventDefaultOn "mousedown" <| Decode.succeed (Select option, True)


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