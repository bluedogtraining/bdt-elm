module Form.Input.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setInitialValue, setValue
    , setPlaceholder, setMaxLength
    , setIsError, setIsLocked
    , setTextType, setEmailType, setPasswordType, setTelType, setNumberType
    , setId
    , getIsChanged, getInitialValue, getValue
    , getId
    )

import Html.Styled exposing (..)
import Html.Styled.Lazy as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import VirtualDom
import Regex exposing (Regex)

import Resettable exposing (Resettable)
import Html.Bdt as Html exposing ((?))

import Form.Input.Css as Css


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
    , inputType : Type
    , id : Maybe String
    }


initialViewState : ViewState
initialViewState =
    { maxLength = Nothing
    , placeholder = ""
    , isLocked = False
    , isError = False
    , inputType = Text
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
        , value <| Resettable.getValue state.value
        , onInput Input
        , placeholder viewState.placeholder
        , Html.maybeAttribute maxlength viewState.maxLength
        , type_ (typeToString viewState.inputType)
        ]
        []
        |> Html.Styled.toUnstyled


typeToString : Type -> String
typeToString inputType =

    case inputType of

        Text ->
            "text"
        Email ->
            "email"
        Password ->
            "password"
        Tel ->
            "tel"
        Number ->
            "number"


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


setTextType : ViewState -> ViewState
setTextType viewState =

    { viewState | inputType = Text }


setEmailType : ViewState -> ViewState
setEmailType viewState =

    { viewState | inputType = Email }


setPasswordType : ViewState -> ViewState
setPasswordType viewState =

    { viewState | inputType = Password }


setTelType : ViewState -> ViewState
setTelType viewState =

    { viewState | inputType = Tel }


setNumberType : ViewState -> ViewState
setNumberType viewState =

    { viewState | inputType = Number }


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