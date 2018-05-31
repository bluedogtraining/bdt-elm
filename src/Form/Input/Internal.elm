module Form.Input.Internal exposing
    ( State, init
    , Msg, update
    , view, render
    , setValue
    , reset, reInitialize
    , setIsError, setIsLocked
    , getValue, getIsChanged
    )

import Html.Styled exposing (..)
import Html.Styled.Lazy as Html
import Html.Styled.Events exposing (..)

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
    }


initialViewState : ViewState
initialViewState =
    { isShown = True
    , isLocked = False
    , isError = False
    }


-- UPDATE --


type Msg
    = Input String


update : Msg -> State -> State
update (Input string) state =

    { state | value = Resettable.update string state.value }


-- VIEW --


view : State -> View
view state =

    View initialViewState state


viewIf : Bool -> State -> View
viewIf isShown state =

    View { initialViewState | isShown = isShown } state


render : View -> Html Msg
render (View viewState state) =

    s_input viewState.isLocked viewState.isError
        [ class "form-control"
        , disabled viewState.isLocked
        , value (Resettable.getValue state.value)
        , onInput Input
        ]
        []
        |> Html.viewIf viewState.isShown


-- GETTERS --


getValue : State -> String
getValue state =

    Resettable.getValue state.value


getIsChanged : State -> Bool
getIsChanged state =

    Resettable.isChanged state.value


-- SETTERS --


setValue : String -> State -> State
setValue value state =

    { state | value = Resettable.init value }


reInitialize : State -> State
reInitialize state =

    { state | value = Resettable.init (Resettable.getValue state.value) }


reset : State -> State
reset state =

    { state | value = Resettable.reset state.value }


-- VIEW STATE SETTERS --


setIsLocked : Bool -> View -> View
setIsLocked isLocked (View viewState state) =

    View { viewState | isLocked = isLocked } state


setIsError : Bool -> View -> View
setIsError isError (View viewState state) =

    View { viewState | isError = isError } state