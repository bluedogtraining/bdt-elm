module Form.TextArea.Internal exposing
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
    , setReplacements
    , setValue
    , update
    )

import Form.Textarea.Css as Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Html.Styled.Lazy exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Resettable exposing (Resettable)



-- MODEL --


type alias State =
    { value : Resettable String
    , substituteTabs : Bool
    , replacements : List ( String, String )
    }


init : State
init =
    { value = Resettable.init ""
    , substituteTabs = False
    , replacements = []
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
update msg state =
    case msg of
        Input string ->
            { state | value = Resettable.update (List.foldl replace string state.replacements) state.value }


replace : ( String, String ) -> String -> String
replace ( search, replacement ) acc =
    String.replace search replacement acc



-- VIEW --


render : State -> ViewState -> Html Msg
render state viewState =
    lazy2 inputField state viewState


inputField : State -> ViewState -> Html Msg
inputField state viewState =
    textarea
        [ Css.input viewState.isError viewState.isLocked
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


setReplacements : List ( String, String ) -> State -> State
setReplacements replacements state =
    { state | replacements = replacements }



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
