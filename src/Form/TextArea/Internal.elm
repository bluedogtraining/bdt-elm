module Form.TextArea.Internal exposing
    ( State, ViewState
    , init, initialViewState
    , Msg, update
    , render
    , reInitialise, reset
    , setInitialValue, setValue
    , setSubstituteTabs, setReplacements
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

import Json.Decode as Decode exposing (Decoder)

import String.Extra as String

import Html.Bdt as Html exposing ((?))
import Resettable exposing (Resettable)


-- MODEL --


type alias State =
    { value : Resettable String
    , substituteTabs : Bool
    , replacements : List (String, String)
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
    | Tab String


update : Msg -> State -> State
update msg state =

    case msg of
        Input string ->
            { state | value = Resettable.update (List.foldl replace string state.replacements) state.value }

        Tab string ->
            { state | value = Resettable.update string state.value }


replace : (String, String) -> String -> String
replace (search, replacement) acc =

    String.replace search replacement acc


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
        -- Hack it in js, as elm currently has no notion of cursor position. Best we could do is add spaces at the end of the textarea, not where the cursor is.
        , attribute "onkeydown" "if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}" ? state.substituteTabs
        -- Since we use the above js hack, our model doesn't get updated the conventional way. We need to grab the new value after the tab was pressed, and update our state accordingly.
        , on "keyup" (Decode.andThen shouldUpdateTab keyCode) ? state.substituteTabs
        ]
        []


shouldUpdateTab : Int -> Decoder Msg
shouldUpdateTab keyCode =

    case keyCode of
        9 ->
            Decode.andThen (Decode.succeed << Tab) targetValue

        _ ->
            Decode.fail "Not Tab"


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


setSubstituteTabs : Bool -> State -> State
setSubstituteTabs substituteTabs state =

    { state | substituteTabs = substituteTabs }


setReplacements : List (String, String) -> State -> State
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