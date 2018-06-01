module Form.Input.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialize, reset
    , setInitialValue ,setValue
    , setIsError, setIsLocked
    , setId
    , getValue, getIsChanged
    , getId
    )

import Html.Styled exposing (..)
import Html.Styled.Lazy as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import VirtualDom
import Regex exposing (Regex)

import Html.Bdt as Html exposing ((?))
import Resettable exposing (Resettable)

import Form.Input.Css as Css


-- MODEL --


type alias State =
    { value : Resettable String
    }


init : State
init =
    { value = Resettable.init ""
    }


type alias ViewState =
    { isShown : Bool
    , isLocked : Bool
    , isError : Bool
    , id : Maybe String
    }


initialViewState : ViewState
initialViewState =
    { isShown = True
    , isLocked = False
    , isError = False
    , id = Nothing
    }


-- UPDATE --


type Msg
    = Input String


update : Msg -> State -> State
update (Input string) state =

    { state | value = Resettable.update string state.value }


-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =

    Html.lazy2 inputField state viewState


inputField : State -> ViewState -> VirtualDom.Node Msg
inputField state viewState =

    input
        [ Css.inputField viewState.isLocked viewState.isError
        , class "form-control"
        , disabled viewState.isLocked
        , value (Resettable.getValue state.value)
        , onInput Input
        ]
        []
        |> Html.viewIf viewState.isShown
        |> Html.Styled.toUnstyled


-- STATE SETTERS --


reInitialize : State -> State
reInitialize state =

    { state | value = Resettable.init (Resettable.getValue state.value) }


reset : State -> State
reset state =

    { state | value = Resettable.reset state.value }


setInitialValue : String -> State -> State
setInitialValue value state =

    { state | value = Resettable.init value }


setValue : String -> State -> State
setValue value state =

    { state | value = Resettable.update value state.value }


-- VIEW STATE SETTERS --


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


getValue : State -> String
getValue state =

    Resettable.getValue state.value


getIsChanged : State -> Bool
getIsChanged state =

    Resettable.isChanged state.value


getId : ViewState -> Maybe String
getId =
    .id