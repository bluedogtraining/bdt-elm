module Form.IntInput.Internal exposing
    ( Msg
    , State
    , ViewState
    , getId
    , getInitialValue
    , getIsChanged
    , getValue
    , init
    , initialViewState
    , reInitialise
    , render
    , reset
    , setId
    , setInitialValue
    , setIsError
    , setIsLocked
    , setMaxLength
    , setPlaceholder
    , setValue
    , update
    )

import Form.IntInput.Css as Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
import Resettable exposing (Resettable)


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
    , placeholder : Maybe String
    , isLocked : Bool
    , isError : Bool
    , id : Maybe String
    }


initialViewState : ViewState
initialViewState =
    { maxLength = Nothing
    , placeholder = Nothing
    , isLocked = False
    , isError = False
    , id = Nothing
    }



-- UPDATE --


type Msg
    = Input String


update : Msg -> State -> State
update (Input string) state =
    case ( String.toInt string, string == "" ) of
        ( Nothing, False ) ->
            { state | bypassLazy = state.bypassLazy + 1 }

        _ ->
            { state | value = Resettable.update string state.value }



-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =
    lazy2 inputField state viewState


inputField : State -> ViewState -> Html Msg
inputField state viewState =
    input
        [ Css.input viewState.isError viewState.isLocked
        , disabled viewState.isLocked
        , value <| Resettable.getValue state.value
        , onInput Input
        , Html.maybeAttribute placeholder viewState.placeholder
        , Html.maybeAttribute maxlength viewState.maxLength
        , Html.maybeAttribute id viewState.id
        ]
        []



-- STATE SETTERS --


reInitialise : State -> State
reInitialise state =
    { state | value = Resettable.init <| Resettable.getValue state.value }


reset : State -> State
reset state =
    { state | value = Resettable.reset state.value }


setInitialValue : Int -> State -> State
setInitialValue value state =
    { state | value = Resettable.init (String.fromInt value) }


setValue : Int -> State -> State
setValue value state =
    { state | value = Resettable.update (String.fromInt value) state.value }



-- VIEW STATE SETTERS --


setMaxLength : Int -> ViewState -> ViewState
setMaxLength maxLength viewState =
    { viewState | maxLength = Just maxLength }


setPlaceholder : String -> ViewState -> ViewState
setPlaceholder placeholder viewState =
    { viewState | placeholder = Just placeholder }


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
    .value >> Resettable.getInitialValue >> String.toInt


getValue : State -> Maybe Int
getValue =
    .value >> Resettable.getValue >> String.toInt


getId : ViewState -> Maybe String
getId =
    .id
