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
import Html.Events
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Events.Bdt exposing (onContentEditableInput)
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
    , searchText : String
    }


init : Nonempty option -> State option
init options =
    { isOpen = False
    , options = options
    , selectedOptions = Resettable.init []
    , focusedOption = Nothing
    , searchText = ""
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
    | UpdateSearchText String
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
            ( { state | isOpen = False, searchText = "" }, Cmd.none )

        Select option ->
            ( { state | selectedOptions = toggleOption option state.selectedOptions }, Cmd.none )

        Clear ->
            ( { state | selectedOptions = Resettable.update [] state.selectedOptions }, Cmd.none )

        SelectKey _ Up ->
            ( { state | focusedOption = getPreviousOption (Nonempty.toList state.options) state.focusedOption }, Cmd.none )

        SelectKey _ Down ->
            ( { state | focusedOption = getNextOption (Nonempty.toList state.options) state.focusedOption }, Cmd.none )

        SelectKey _ Backspace ->
            ( state, Cmd.none )

        SelectKey _ (AlphaNum _) ->
            ( state, Cmd.none )

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

        UpdateSearchText value ->
            ( { state | searchText = value }, Cmd.none )

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
            , Form.onElementFocus Open |> Html.attributeIf (not viewState.isLocked)
            , onClick Open |> Html.attributeIf (not viewState.isLocked)
            ]
            [ div
                [ Css.title (Resettable.getValue state.selectedOptions |> List.isEmpty)
                , Css.contentEditableContainer
                , Css.noFocus
                , title (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions)
                , contenteditable True
                ]
                [ span
                    [ Css.inputLabelSpan ]
                    [ text (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions) ]
                , Html.divIf (not viewState.isLocked) [ Css.caret ] [ FeatherIcons.chevronDown |> FeatherIcons.withSize 18 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
                ]
            , clearButton state viewState
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
            [ div
                [ Css.title (Resettable.getValue state.selectedOptions |> List.isEmpty)
                , Css.contentEditableContainer
                , Css.noFocus
                , onBlur Blur
                , title (optionText viewState.defaultLabel viewState.toLabel state.selectedOptions)
                , contenteditable True
                , onContentEditableInput UpdateSearchText
                , placeholder state.searchText
                ]
                [ text "" ]
            ]
        , optionList state viewState
        ]


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =
    Html.divIf (viewState.isClearable && (not <| List.isEmpty (Resettable.getValue state.selectedOptions)))
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
    let
        filteredOptions =
            state.options
                |> Nonempty.toList
                |> filterOptionsBySearchText state.searchText viewState.toLabel
                |> filterBySelected (Resettable.getValue state.selectedOptions)

        selectedOptions =
            Resettable.getValue state.selectedOptions
                |> filterOptionsBySearchText state.searchText viewState.toLabel
    in
    if List.isEmpty filteredOptions then
        div
            [ Css.optionList ]
            [ selectedGroup selectedOptions state viewState
            , div
                [ Css.optionItem False False
                , tabindex -1
                ]
                [ text
                    ("No "
                        ++ (if List.length selectedOptions == 0 then
                                ""

                            else
                                "other "
                           )
                        ++ "options containing - \""
                        ++ state.searchText
                        ++ "\""
                    )
                ]
            ]

    else
        div
            []
            [ div
                [ Css.optionList ]
                (selectedGroup selectedOptions state viewState :: List.map (optionItem state viewState) filteredOptions)
            ]


selectedGroup : List option -> State option -> ViewState option -> Html (Msg option)
selectedGroup selectedOptions state viewState =
    if not <| List.isEmpty <| Resettable.getValue state.selectedOptions then
        div
            []
            [ div
                [ Css.optGroupLabel ]
                [ text
                    ((String.fromInt <| List.length <| Resettable.getValue state.selectedOptions)
                        ++ " option"
                        ++ (if List.length (Resettable.getValue state.selectedOptions) == 1 then
                                ""

                            else
                                "s"
                           )
                        ++ " selected"
                    )
                ]
            , div
                []
                (List.map (optionItem state viewState) selectedOptions)
            , hr
                [ Css.groupDivider ]
                []
            ]

    else
        text ""


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


filterOptionsBySearchText : String -> (option -> String) -> List option -> List option
filterOptionsBySearchText searchText toLabel options =
    List.filter (toLabel >> String.toLower >> String.contains searchText) options


filterBySelected : List option -> List option -> List option
filterBySelected selectedOptions options =
    List.filter (\option -> not <| List.member option selectedOptions) options



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
