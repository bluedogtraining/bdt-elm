module Form.IntInput.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setInitialValue, setValue
    , setPlaceholder, setMaxLength
    , setIsError, setIsLocked
    , setId
    , getIsChanged, getInitialValue, getValue
    , getId
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Lazy exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import VirtualDom

import Regex exposing (Regex)

import Html.Styled.Bdt as Html
import Resettable exposing (Resettable)

import Form.IntInput.Css as Css


type alias State =
    { value : Resettable String
    -- Add bypassLazy so that we can use lazy in render (so that external changes don't re-render),
    -- but still update the DOM to update the value on the input (to remove the letter).
    , bypassLazy : Int
    }


init : State
init =
    { value = Resettable.init ""
    , bypassLazy = 0
    }


type alias ViewState =
    { maxLength : Maybe Int
    , placeholder : String
    , isLocked : Bool
    , isError : Bool
    , id : Maybe String
    }


initialViewState : ViewState
initialViewState =
    { maxLength = Nothing
    , placeholder = ""
    , isLocked = False
    , isError = False
    , id = Nothing
    }


-- UPDATE --


type Msg
    = Input String


update : Msg -> State -> State
update (Input string) state =

    case Regex.contains (Regex.regex "^[-]?[0-9]*$") string of

        True ->
            { state | value = Resettable.update string state.value }

        False ->
            { state | bypassLazy = state.bypassLazy + 1 }


-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =

    lazy2 inputField state viewState


inputField : State -> ViewState -> VirtualDom.Node Msg
inputField state viewState =

    input
        [ Css.input viewState.isError viewState.isLocked
        , disabled viewState.isLocked
        , value <| Resettable.getValue state.value
        , onInput Input
        , placeholder viewState.placeholder
        , Html.maybeAttribute maxlength viewState.maxLength
        , Html.maybeAttribute id viewState.id
        ]
        []
        |> Html.toUnstyled


-- STATE SETTERS --


reInitialise : State -> State
reInitialise state =

    { state | value = Resettable.init <| Resettable.getValue state.value }


reset : State -> State
reset state =

    { state | value = Resettable.reset state.value }


setInitialValue : Int -> State -> State
setInitialValue value state =

    { state | value = Resettable.init (toString value) }


setValue : Int -> State -> State
setValue value state =

    { state | value = Resettable.update (toString value) state.value }


-- VIEW STATE SETTERS --


setMaxLength : Int -> ViewState -> ViewState
setMaxLength maxLength viewState =

    { viewState | maxLength = Just maxLength }


setPlaceholder : String -> ViewState -> ViewState
setPlaceholder placeholder viewState =

    { viewState | placeholder = placeholder }


setIsLocked : Bool -> ViewState -> ViewState
setIsLocked isLocked viewState =

    { viewState | isLocked = isLocked }


setIsError : Bool -> ViewState -> ViewState
setIsError isError viewState =

    { viewState | isError = isError }


setId : String -> ViewState -> ViewState
setId id viewState =

    { viewState | id = Just id }


-- GETTERS --


getIsChanged : State -> Bool
getIsChanged state =

    Resettable.getIsChanged state.value


getInitialValue : State -> Maybe Int
getInitialValue =

    .value >> Resettable.getInitialValue >> stringToMaybeInt


getValue : State -> Maybe Int
getValue =

    .value >> Resettable.getValue >> stringToMaybeInt


stringToMaybeInt : String -> Maybe Int
stringToMaybeInt string =

    case string of

        "" ->
            Nothing

        value ->
            -- Don't use withDefault or mapError here, Debug.crash STILL gets called even if successful (compiler bug)
            case String.toInt value of

                Err _ ->
                    Debug.crash "Failed to parse IntInput String to Int"

                Ok int ->
                    Just int


getId : ViewState -> Maybe String
getId =
    .id