module Form.Input.Internal exposing
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
    , setEmailType
    , setId
    , setInitialValue
    , setIsError
    , setIsLocked
    , setMaxLength
    , setNumberType
    , setPasswordType
    , setPlaceholder
    , setTelType
    , setTextType
    , setValue
    , update
    )

import Form.Input.Css as Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
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
    , placeholder : Maybe String
    , isLocked : Bool
    , isError : Bool
    , inputType : Type
    , id : Maybe String
    }


initialViewState : ViewState
initialViewState =
    { maxLength = Nothing
    , placeholder = Nothing
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
        , type_ (typeToString viewState.inputType)
        ]
        []


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
