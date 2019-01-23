module Form.Select.Internal exposing
    ( Msg
    , State
    , ViewState
    , getId
    , getInitialOption
    , getIsChanged
    , getIsOpen
    , getSelectedOption
    , init
    , initialViewState
    , reInitialise
    , render
    , reset
    , setDefaultLabel
    , setId
    , setInitialOption
    , setIsClearable
    , setIsError
    , setIsLocked
    , setIsOptionDisabled
    , setSelectedOption
    , update
    )

import FeatherIcons
import Form.Css as BaseCss
import Form.Helpers as Form exposing (SelectKey(..), onSelectKey)
import Form.Select.Css as Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
import Json.Decode as Decode exposing (Decoder)
import List.Extra as List
import List.Nonempty as Nonempty exposing (Nonempty)
import Resettable exposing (Resettable)


-- MODEL --


type alias State option =
    { isOpen : Bool
    , options : Nonempty option
    , selectedOption : Resettable (Maybe option)
    , focusedOption : Maybe option
    , searchText : String
    }


init : Nonempty option -> State option
init options =
    { isOpen = False
    , options = options
    , selectedOption = Resettable.init Nothing
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
    | Select option
    | Clear
    | SelectKey (option -> Bool) (option -> String) SelectKey
    | NoOp



-- At the moment there is no reason to return Cmds, but at some point we should use viewPort in the Browser module to scroll, so leave it as a placeholder


update : Msg option -> State option -> ( State option, Cmd (Msg option) )
update msg state =
    case msg of
        Open ->
            ( { state | isOpen = True }, Cmd.none )

        Blur ->
            ( { state | isOpen = False, focusedOption = Nothing, searchText = "" }, Cmd.none )

        Select option ->
            ( updateSelectedOption option state, Cmd.none )

        Clear ->
            ( { state | selectedOption = Resettable.update Nothing state.selectedOption }, Cmd.none )

        SelectKey _ toLabel Up ->
            ( { state | focusedOption = getPreviousOption (Nonempty.toList state.options) state.focusedOption state.searchText toLabel }, Cmd.none )

        SelectKey _ toLabel Down ->
            ( { state | focusedOption = getNextOption (Nonempty.toList state.options) state.focusedOption state.searchText toLabel }, Cmd.none )

        SelectKey _ _ Backspace ->
            ( { state | searchText = String.dropRight 1 state.searchText }, Cmd.none )

        SelectKey _ toLabel (AlphaNum charString) ->
            ( { state | searchText = state.searchText ++ charString }, Cmd.none)

        SelectKey isOptionDisabled _ _ ->
            case state.focusedOption of
                Nothing ->
                    ( state, Cmd.none )

                Just focusedOption ->
                    case isOptionDisabled focusedOption of
                        True ->
                            ( state, Cmd.none )

                        False ->
                            ( updateSelectedOption focusedOption state, Cmd.none )

        NoOp ->
            ( state, Cmd.none )


updateSelectedOption : option -> State option -> State option
updateSelectedOption option state =
    { state
        | selectedOption = Resettable.update (Just option) state.selectedOption
        , isOpen = False
        , focusedOption = Nothing
        , searchText = ""
    }


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
            , onSelectKey <| SelectKey viewState.isOptionDisabled viewState.toLabel
            , onBlur Blur
            ]
            [ inputContents state viewState ]
        , optionList state viewState
        ]


inputContents : State option -> ViewState option -> Html (Msg option)
inputContents state viewState =
    if String.isEmpty state.searchText
    then
        div
            [ title (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel)
            , Css.title (Resettable.getValue state.selectedOption == Nothing)
            ]
            [ text (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault viewState.defaultLabel) ]
    else
        text state.searchText


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =
    Html.divIf (viewState.isClearable && Resettable.getValue state.selectedOption /= Nothing)
        [ preventDefaultOn "mousedown" <| Decode.succeed ( Clear, True ), BaseCss.clearIcon ]
        [ FeatherIcons.x |> FeatherIcons.withSize 14 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


optionList : State option -> ViewState option -> Html (Msg option)
optionList state viewState =
    let
        filteredOptions =
            state.options
                |> Nonempty.toList
                |> filterOptions state.searchText viewState.toLabel

    in
        if List.isEmpty filteredOptions
        then
            div
                [ Css.optionList ]
                [ div
                    [ Css.optionItem False False
                    , tabindex -1
                    ]
                    [ text ("No options containing - \"" ++ state.searchText ++ "\"") ]
                ]
        else
            div
                [ Css.optionList ]
                (List.map (optionItem state viewState) filteredOptions)


optionItem : State option -> ViewState option -> option -> Html (Msg option)
optionItem state viewState option =
    div
        [ Css.optionItem (viewState.isOptionDisabled option) (state.focusedOption == Just option)
        , tabindex -1
        , preventDefaultOn "mousedown" <|
            Decode.succeed
                ( if viewState.isOptionDisabled option then
                    NoOp

                  else
                    Select option
                , True
                )
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


-- UTILITIES --
-- @todo -- Have moved these here since they're distinct from the search select focused option logic
-- @todo -- Should potentially move these back into the common utils to implement for multi select


getPreviousOption : List option -> Maybe option -> String -> (option -> String) -> Maybe option
getPreviousOption options focusedOption searchText toLabel =
   getNextOption (List.reverse options) focusedOption searchText toLabel


getNextOption : List option -> Maybe option -> String -> (option -> String) -> Maybe option
getNextOption options mFocusedOption searchText toLabel =
    let
        filteredOptions = filterOptions searchText toLabel options |> Debug.log "filter"

        mFilteredFocusOption =
            mFocusedOption
                |> Maybe.andThen (\option -> if List.member option filteredOptions then Just option else Nothing)
    in
        case mFilteredFocusOption of
            Nothing ->
                List.head filteredOptions

            Just focusedOption ->
                filteredOptions
                    |> List.dropWhile ((/=) focusedOption)
                    |> List.drop 1
                    |> List.head


filterOptions : String -> (option -> String) -> List option -> List option
filterOptions searchText toLabel options =
    List.filter (toLabel >> String.toLower >> String.contains searchText) options
