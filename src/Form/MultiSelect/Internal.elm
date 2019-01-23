module Form.MultiSelect.Internal exposing
    ( Msg
    , State
    , ViewState
    , getId
    , getInitialOptions
    , getIsChanged
    , getIsOpen
    , getSelectedOptions
    , init
    , initialViewState
    , reInitialise
    , render
    , reset
    , setDefaultLabel
    , setId
    , setInitialOptions
    , setIsClearable
    , setIsError
    , setIsLocked
    , setIsOptionDisabled
    , setSelectedOptions
    , update
    )

import Browser.Dom as Dom
import Dict
import FeatherIcons
import Form.Css as BaseCss
import Form.Helpers as Form
    exposing
        ( SelectKey(..)
        , getNextOption
        , getPreviousOption
        , onSelectKey
        )
import Form.MultiSelect.Css as Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
import Json.Decode as Decode exposing (Decoder)
import List.Nonempty as Nonempty exposing (Nonempty)
import Resettable exposing (Resettable)
import Task



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
    | SelectKey (option -> Bool) SelectKey
    | NoOp



-- At the moment there is no reason to return Cmds, but at some point we should use viewPort in the Browser module to scroll, so leave it as a placeholder


update : Msg option -> State option -> ( State option, Cmd (Msg option) )
update msg state =
    case msg of
        Open ->
            ( { state | isOpen = True }, Cmd.none )

        Blur ->
            ( { state | isOpen = False }, Cmd.none )

        Select option ->
            ( { state | selectedOptions = toggleOption option state.selectedOptions }, Cmd.none )

        Clear ->
            ( { state | selectedOptions = Resettable.update [] state.selectedOptions }, Cmd.none )

        SelectKey _ Up ->
            ( { state | focusedOption = getPreviousOption (Nonempty.toList state.options) state.focusedOption }, Cmd.none )

        SelectKey _ Down ->
            ( { state | focusedOption = getNextOption (Nonempty.toList state.options) state.focusedOption }, Cmd.none )

        SelectKey _ Backspace ->
            (state, Cmd.none)

        SelectKey _ (AlphaNum _) ->
            (state, Cmd.none)

        SelectKey isOptionDisabled _ ->
            case state.focusedOption of
                Nothing ->
                    ( state, Cmd.none )

                Just focusedOption ->
                    case isOptionDisabled focusedOption of
                        True ->
                            ( state, Cmd.none )

                        False ->
                            ( { state | selectedOptions = toggleOption focusedOption state.selectedOptions }, Cmd.none )

        NoOp ->
            ( state, Cmd.none )


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
            , Html.divIf (not viewState.isLocked) [] [ FeatherIcons.chevronDown |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
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
            , onSelectKey <| SelectKey viewState.isOptionDisabled
            , Css.title <| List.isEmpty <| Resettable.getValue state.selectedOptions
            , title <| optionText viewState.defaultLabel viewState.toLabel state.selectedOptions
            ]
            [ text <| optionText viewState.defaultLabel viewState.toLabel state.selectedOptions ]
        , optionList state viewState
        ]


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =
    Html.divIf (viewState.isClearable && List.isEmpty (Resettable.getValue state.selectedOptions))
        [ preventDefaultOn "mousedown" <| Decode.succeed ( Clear, True ), BaseCss.clearIcon ]
        [ FeatherIcons.x |> FeatherIcons.withSize 14 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


optionText : String -> (option -> String) -> Resettable (List option) -> String
optionText defaultLabel toLabel selectedOptions =
    case List.isEmpty (Resettable.getValue selectedOptions) of
        True ->
            defaultLabel

        False ->
            String.fromInt (List.length (Resettable.getValue selectedOptions))
                ++ " option"
                ++ (if List.length (Resettable.getValue selectedOptions) > 1 then
                        "s"

                    else
                        ""
                   )
                ++ " selected: "
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
        , preventDefaultOn "mousedown" <|
            Decode.succeed
                ( if viewState.isOptionDisabled option then
                    NoOp

                  else
                    Select option
                , True
                )
        , tabindex -1
        ]
        [ div
            [ Css.checkBox ]
            [ if List.member option <| Resettable.getValue state.selectedOptions then
                FeatherIcons.checkSquare |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled

              else
                FeatherIcons.square |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled
            ]
        , div
            [ title <| viewState.toLabel option ]
            [ text <| viewState.toLabel option ]
        ]



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
