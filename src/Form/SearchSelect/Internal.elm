module Form.SearchSelect.Internal exposing
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
import Form.Helpers as Form
    exposing
        ( SelectKey(..)
        , getNextOption
        , getPreviousOption
        , onSelectKey
        )
import Form.SearchSelect.Css as Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
import Http
import Json.Decode as Decode exposing (Decoder)
import Resettable exposing (Resettable)



-- MODEL --


type alias State option =
    { isOpen : Bool
    , input : String
    , searchUrl : String
    , isSearching : Bool
    , options : List option
    , optionDecoder : Decoder option
    , selectedOption : Resettable (Maybe option)
    , focusedOption : Maybe option
    }


init : String -> Decoder option -> State option
init searchUrl optionDecoder =
    { isOpen = False
    , input = ""
    , searchUrl = searchUrl
    , isSearching = False
    , options = []
    , optionDecoder = optionDecoder
    , selectedOption = Resettable.init Nothing
    , focusedOption = Nothing
    }


type alias ViewState option =
    { inputMinimum : Int
    , isLocked : Bool
    , isClearable : Bool
    , isError : Bool
    , isOptionDisabled : option -> Bool
    , toLabel : option -> String
    , defaultLabel : String
    , id : Maybe String
    }


initialViewState : (option -> String) -> ViewState option
initialViewState toLabel =
    { inputMinimum = 2
    , isLocked = False
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
    | UpdateSearchInput Int String
    | Response (Result Http.Error (List option))
    | Select option
    | Clear
    | SelectKey SelectKey


update : Msg option -> State option -> ( State option, Cmd (Msg option) )
update msg state =
    case msg of
        Open ->
            ( { state | isOpen = True }, Cmd.none )

        Blur ->
            ( { state | isOpen = False, input = "", focusedOption = Nothing }, Cmd.none )

        UpdateSearchInput inputMinimum value ->
            ( { state
                | input = value
                , isSearching = shouldSearch inputMinimum value
              }
            , if shouldSearch inputMinimum value then
                searchRequest state.searchUrl value state.optionDecoder

              else
                Cmd.none
            )

        Response result ->
            case result of
                Err error ->
                    ( { state | isSearching = False }, Cmd.none )

                Ok options ->
                    ( { state | isSearching = False, options = options, focusedOption = Nothing }, Cmd.none )

        Clear ->
            ( { state | selectedOption = Resettable.update Nothing state.selectedOption }, Cmd.none )

        Select selectedOption ->
            ( { state
                | input = ""
                , selectedOption = Resettable.update (Just selectedOption) state.selectedOption
              }
            , Cmd.none
            )

        SelectKey Up ->
            ( { state | focusedOption = getPreviousOption state.options state.focusedOption }, Cmd.none )

        SelectKey Down ->
            ( { state | focusedOption = getNextOption state.options state.focusedOption }, Cmd.none )

        SelectKey _ ->
            case state.focusedOption of
                Nothing ->
                    ( state, Cmd.none )

                Just focusedOption ->
                    ( { state
                        | input = ""
                        , selectedOption = Resettable.update (Just focusedOption) state.selectedOption
                        , isOpen = False
                      }
                    , Cmd.none
                    )



-- SEARCH REQUEST --


searchRequest : String -> String -> Decoder option -> Cmd (Msg option)
searchRequest searchUrl input optionDecoder =
    Http.get
        { url = searchUrl ++ input
        , expect = Http.expectJson Response (searchResponseDecoder optionDecoder)
        }


searchResponseDecoder : Decoder option -> Decoder (List option)
searchResponseDecoder optionDecoder =
    Decode.list optionDecoder



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
        [ Css.container ]
        [ input
            [ Css.input viewState.isError viewState.isLocked
            , Css.title (Resettable.getValue state.selectedOption == Nothing)
            , Html.maybeAttribute id viewState.id
            , type_ "text"
            , disabled viewState.isLocked
            , tabindex 0 |> Html.attributeIf (not viewState.isLocked)
            , Form.onElementFocus Open |> Html.attributeIf (not viewState.isLocked)
            , onClick Open |> Html.attributeIf (not viewState.isLocked)
            , value (state.selectedOption |> Resettable.getValue |> Maybe.map viewState.toLabel |> Maybe.withDefault "")
            ]
            []
        , div
            [ Css.carets ]
            [ span
                [ Css.displayInline ]
                [ clearButton state viewState ]
            ]
        ]


open : State option -> ViewState option -> Html (Msg option)
open state viewState =
    div
        [ Css.container ]
        [ input
            [ Css.input viewState.isLocked viewState.isError
            , Css.title (Resettable.getValue state.selectedOption == Nothing)
            , type_ "text"
            , placeholder (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault "")
            , tabindex -1
            , disabled viewState.isLocked
            , onInput <| UpdateSearchInput viewState.inputMinimum
            , onBlur Blur
            , onSelectKey SelectKey
            , value state.input
            ]
            []
        , searchResults state viewState
        ]


searchResults : State option -> ViewState option -> Html (Msg option)
searchResults state viewState =
    case shouldSearch viewState.inputMinimum state.input of
        False ->
            infoMessage (InputMinimum viewState.inputMinimum)

        True ->
            case state.isSearching of
                True ->
                    infoMessage Searching

                False ->
                    case List.isEmpty state.options of
                        True ->
                            infoMessage NoResults

                        False ->
                            searchResultList state viewState


clearButton : State option -> ViewState option -> Html (Msg option)
clearButton state viewState =
    Html.divIf (viewState.isClearable && Resettable.getValue state.selectedOption /= Nothing)
        [ preventDefaultOn "mousedown" <| Decode.succeed ( Clear, True ), BaseCss.clearIcon ]
        [ FeatherIcons.x |> FeatherIcons.withSize 14 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


type InfoMessage
    = InputMinimum Int
    | Searching
    | NoResults


infoMessage : InfoMessage -> Html (Msg option)
infoMessage message =
    case message of
        InputMinimum int ->
            infoMessageContainer ("please type at least " ++ String.fromInt int ++ " characters to search")

        Searching ->
            infoMessageContainer "searching .."

        NoResults ->
            infoMessageContainer "no results"


infoMessageContainer : String -> Html (Msg option)
infoMessageContainer message =
    div
        [ Css.infoMessage ]
        [ text message ]


searchResultList : State option -> ViewState option -> Html (Msg option)
searchResultList state viewState =
    div
        [ Css.optionList ]
        (List.map (searchResultItem state.focusedOption viewState.toLabel) state.options)


searchResultItem : Maybe option -> (option -> String) -> option -> Html (Msg option)
searchResultItem focusedOption toLabel option =
    div
        [ Css.optionItem (Just option == focusedOption)

        -- use onMouseDown over onClick so that it triggers before the onBlur on the input
        , onMouseDown <| Select option
        ]
        [ text <| toLabel option ]



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



-- HELPERS --


shouldSearch : Int -> String -> Bool
shouldSearch inputMinimum input =
    String.length input >= inputMinimum
