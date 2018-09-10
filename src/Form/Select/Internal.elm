module Form.Select.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setDefaultLabel
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

import List.Nonempty as Nonempty exposing (Nonempty)

import Json.Decode as Decode exposing (Decoder)

import FeatherIcons

import Form.Helpers as Form exposing
    ( SelectKey (..), onSelectKey
    , getNextOption, getPreviousOption
    )
import Html.Styled.Bdt as Html
import Resettable exposing (Resettable)

import Form.Css as BaseCss
import Form.Select.Css as Css


-- MODEL --


type alias State option =
    { isOpen : Bool
    , options : Nonempty option
    , selectedOption : Resettable (Maybe option)
    , focusedOption : Maybe option
    }


init : Nonempty option -> State option
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
    | SelectKey (option -> Bool) SelectKey


-- At the moment there is no reason to return Cmds, but at some point we should use viewPort in the Browser module to scroll, so leave it as a placeholder
update : Msg option -> State option -> (State option, Cmd (Msg option))
update msg state =

    case msg of
        Open ->
            ({ state | isOpen = True }, Cmd.none)

        Blur ->
            ({ state | isOpen = False, focusedOption = Nothing }, Cmd.none)

        Select option ->
            ({ state
                | selectedOption = Resettable.update (Just option) state.selectedOption
                , isOpen = False
                , focusedOption = Nothing
            }, Cmd.none)

        Clear ->
            ({ state | selectedOption = Resettable.update Nothing state.selectedOption }, Cmd.none)

        SelectKey _ Up ->
            ({ state | focusedOption = getPreviousOption (Nonempty.toList state.options) state.focusedOption }, Cmd.none)

        SelectKey _ Down ->
            ({ state | focusedOption = getNextOption (Nonempty.toList state.options) state.focusedOption }, Cmd.none)

        SelectKey isOptionDisabled _ ->
            case state.focusedOption of
                Nothing ->
                    (state, Cmd.none)

                Just focusedOption ->
                    case isOptionDisabled focusedOption of
                        True ->
                            (state, Cmd.none)

                        False ->
                            ({ state
                                | selectedOption = Resettable.update (Just focusedOption) state.selectedOption
                                , isOpen = False
                                , focusedOption = Nothing
                            }, Cmd.none)


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
            , FeatherIcons.chevronDown |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]
        ]


open : State option -> ViewState option -> Html (Msg option)
open state viewState =

    div
        [ Css.container ]
        [ div
            [ Css.input viewState.isError viewState.isLocked
            , Html.maybeAttribute id viewState.id
            , tabindex -1
            , onSelectKey <| SelectKey viewState.isOptionDisabled
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
        [ preventDefaultOn "mousedown" <| Decode.succeed (Clear, True), BaseCss.clearIcon ]
        [ FeatherIcons.x |> FeatherIcons.withSize 14 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


optionList : State option -> ViewState option -> Html (Msg option)
optionList state viewState =

    div
        [ Css.optionList ]
        (List.map (optionItem state viewState) (Nonempty.toList state.options))


optionItem : State option -> ViewState option -> option -> Html (Msg option)
optionItem state viewState option =

    div
        [ Css.optionItem (viewState.isOptionDisabled option) (state.focusedOption == Just option)
        , tabindex -1
        , onMouseDown (Select option) |> Html.attributeIf (not <| viewState.isOptionDisabled option)
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