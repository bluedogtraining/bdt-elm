module Form.SearchSelect.Internal exposing
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
import Html.Styled.Attributes exposing (..)

import VirtualDom

import Dom
import Dict
import Task
import Http

import List.Extra as List

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Decode

import Form.Helpers as Form
import Html.Styled.Bdt as Html exposing ((?))
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


initialViewState : ViewState option
initialViewState =
    { inputMinimum = 2
    , isLocked = False
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
    | UpdateSearchInput Int String
    | Response (Result Http.Error (SearchResponse option))
    | SelectOption option
    | Clear
    | KeyboardInput KeyboardInput
    | Focus option
    | BlurOption option
    | DomFocus (Result Dom.Error ())


update : Msg option -> State option -> (State option, Cmd (Msg option))
update msg state =

    case msg of
        Open ->
            { state | isOpen = True } ! []

        Blur ->
            { state | isOpen = False, input = "", focusedOption = Nothing } ! []

        UpdateSearchInput inputMinimum value ->
            { state | input = value, isSearching = shouldSearch inputMinimum value }
                ! [ if shouldSearch inputMinimum value then searchRequest state.searchUrl value state.optionDecoder else Cmd.none ]

        Response result ->
            case result of
                Err error ->
                    { state | isSearching = False } ! []

                Ok searchResponse ->
                    { state | isSearching = False, options = searchResponse.options, focusedOption = Nothing } ! []

        Clear ->
            { state | selectedOption = Resettable.update Nothing state.selectedOption } ! []

        SelectOption selectedOption ->
            { state
                | input = ""
                , selectedOption = Resettable.update (Just selectedOption) state.selectedOption
            } ! []

        KeyboardInput keyboardInput ->
            handleKeyboardInput state keyboardInput

        Focus option ->
            { state | focusedOption = Just (focusOption state.options option) } ! []

        BlurOption option ->
            if Just option == state.focusedOption then
                { state | focusedOption = Nothing, isOpen = False } ! []
            else
                state ! []

        DomFocus _ ->
            state ! []


type KeyboardInput
    = Enter
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
            Dict.fromList [(13, Enter), (38, Up), (40, Down)]

    in
        case Dict.get code dict of

            Just selectKeyboardInput ->
                Decode.succeed (msg selectKeyboardInput)

            Nothing ->
                Decode.fail "Not a search-select input key"


handleKeyboardInput: State option -> KeyboardInput -> (State option, Cmd (Msg option))
handleKeyboardInput state keyboardInput =

    case state.focusedOption of

        Nothing ->
            { state | focusedOption = List.head state.options } ! []

        Just focusedOption ->
            case keyboardInput of
                Enter ->
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
                            ! [ Task.attempt DomFocus (Form.toHtmlId newFocusedOption |> Dom.focus) ]

                Down ->
                    let
                        newFocusedOption = focusNextOption state.options focusedOption

                    in
                        { state | focusedOption = Just newFocusedOption }
                            ! [ Task.attempt DomFocus (Form.toHtmlId newFocusedOption |> Dom.focus) ]


focusOption : List option -> option -> option
focusOption options option =

    case List.member option options of
        True ->
            option

        False ->
            Debug.crash ("MULTISELECT ERROR - can't focus" ++ Form.toHtmlId option ++ " it is not a valid option for this select.")


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


-- SEARCH REQUEST --


searchRequest : String -> String -> Decoder option -> Cmd (Msg option)
searchRequest searchUrl input optionDecoder =
    searchResponseDecoder optionDecoder
        |> Http.get (searchUrl ++ input)
        |> Http.send Response


type alias SearchResponse option =
    { options : List option
    }


searchResponseDecoder : Decoder option -> Decoder (SearchResponse option)
searchResponseDecoder optionDecoder =
    Decode.decode SearchResponse
        |> Decode.required "options" (Decode.list optionDecoder)


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
        [ class "bdt-elm select-container" ]
        [ input
            [ class "input"
            , classList [("locked", viewState.isLocked), ("error", viewState.isError)]
            , Html.maybeAttribute id viewState.id
            , type_ "text"
            , disabled viewState.isLocked
            , tabindex 0 ? not viewState.isLocked
            , onFocus Open ? not viewState.isLocked
            , onClick Open ? not viewState.isLocked
            , value state.input
            ]
            []
        ]
        |> Html.toUnstyled


open : State option -> ViewState option -> VirtualDom.Node (Msg option)
open state viewState =

    div
        [ class "bdt-elm select-container" ]
        [ input
            [ class "input"
            , classList [("locked", viewState.isLocked), ("error", viewState.isError)]
            , Html.maybeAttribute id viewState.id
            , type_ "text"
            , placeholder (Maybe.map viewState.toLabel (Resettable.getValue state.selectedOption) |> Maybe.withDefault "")
            , tabindex -1
            , disabled viewState.isLocked
            , onInput <| UpdateSearchInput viewState.inputMinimum
            , onBlur Blur
            , onKeyboardInput KeyboardInput
            , value state.input
            ]
            []
        , searchResults state viewState
        ]
        |> Html.toUnstyled


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


type InfoMessage
    = InputMinimum Int
    | Searching
    | NoResults


infoMessage : InfoMessage -> Html (Msg option)
infoMessage message =

    case message of
        InputMinimum int ->
            infoMessageContainer ("please type at least " ++ toString int ++ " characters to search")

        Searching ->
            infoMessageContainer "searching .."

        NoResults ->
            infoMessageContainer "no results"


infoMessageContainer : String -> Html (Msg option)
infoMessageContainer message =

    div
        [ class "info-message" ]
        [ text message ]


searchResultList : State option -> ViewState option -> Html (Msg option)
searchResultList state viewState =

    div
        [ class "search-result-list" ]
        (List.map (searchResultItem state.focusedOption viewState.toLabel) state.options)


searchResultItem : Maybe option -> (option -> String) -> option -> Html (Msg option)
searchResultItem focusedOption toLabel option =

    div
        [ class "search-result-item"
        , classList [("hovered", Just option == focusedOption)]
        , id (Form.toHtmlId option)
        -- use onMouseDown over onClick so that it triggers before the onBlur on the input
        , onMouseDown (SelectOption option)
        , onFocus (Focus option)
        , onBlur (BlurOption option)
        , onKeyboardInput KeyboardInput
        ]
        [ text (toLabel option) ]


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


-- HELPERS --


shouldSearch : Int -> String -> Bool
shouldSearch inputMinimum input =
    String.length input >= inputMinimum