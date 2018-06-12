module Form.TextArea.Internal exposing
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

import Html exposing (..)
import Html.Lazy exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

import Html.Bdt as Html
import Resettable exposing (Resettable)


-- MODEL --


type alias State =
    { value : Resettable String
    }


init : State
init =
    { value = Resettable.init ""
    }


type Type
    = Text
    | Email
    | Password
    | Tel
    | Number


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

    { state | value = Resettable.update string state.value }


-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =

    lazy2 inputField state viewState


inputField : State -> ViewState -> Html Msg
inputField state viewState =

    textarea
        [ class "bdt-elm input"
        , classList [("locked", viewState.isLocked), ("error", viewState.isError)]
        , disabled viewState.isLocked
        , value <| Resettable.getValue state.value
        , onInput Input
        , placeholder viewState.placeholder
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


setInitialValue : String -> State -> State
setInitialValue value state =

    { state | value = Resettable.init value }


setValue : String -> State -> State
setValue value state =

    { state | value = Resettable.update value state.value }


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


getInitialValue : State -> String
getInitialValue state =

    Resettable.getInitialValue state.value


getValue : State -> String
getValue state =

    Resettable.getValue state.value


getId : ViewState -> Maybe String
getId =
    .id