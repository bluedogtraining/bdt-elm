module Form.Input exposing
    ( Model, init
    , Msg, update
    , view, render
    , setValue
    , reset, reInitialize
    , setIsError, setIsLocked
    , getValue, getIsChanged
    )

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

import Styled exposing (..)
import Styled.Html

import Helpers.Html as Html

import Form.Value as FormValue exposing (FormValue)

import Regex exposing (Regex)

import Styles.Utility as S


-- MODEL --


type Model
    = Model InternalState


type alias InternalState =
    { value : FormValue String
    }


init : Model
init =
    Model { value = FormValue.init "" }


type View
    = View ViewState InternalState


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


update : Msg -> Model -> Model
update (Input string) (Model internalState) =

    Model { internalState | value = FormValue.update string internalState.value }


-- VIEW --


view : Model -> View
view (Model internalState) =

    View initialViewState internalState


viewIf : Bool -> Model -> View
viewIf isShown (Model internalState) =

    View { initialViewState | isShown = isShown } internalState


render : View -> Html Msg
render (View viewState internalState) =

    s_input viewState.isLocked viewState.isError
        [ class "form-control"
        , disabled viewState.isLocked
        , value (FormValue.getFormValue internalState.value)
        , onInput Input
        ]
        []
        |> Html.viewIf viewState.isShown


-- GETTERS --


type alias Component = List (Attribute Msg) -> List (Html Msg) -> Html Msg


s_input : Bool -> Bool -> Component
s_input isLocked isError =

    Styled.Html.input
        [ backgroundColor (if isLocked then rgba 245 245 245 1 else rgba 255 255 255 1) |> important
        , borderColor (if isError then S.dangerColour else hex "dddddd") |> important
        ]


getValue : Model -> String
getValue (Model internalState) =

    FormValue.getFormValue internalState.value


getIsChanged : Model -> Bool
getIsChanged (Model internalState) =

    FormValue.isChanged internalState.value


-- SETTERS --


setValue : String -> Model -> Model
setValue value (Model internalState) =

    Model { internalState | value = FormValue.init value }


reInitialize : Model -> Model
reInitialize (Model internalState) =

    Model { internalState | value = FormValue.init (FormValue.getFormValue internalState.value) }


reset : Model -> Model
reset (Model internalState) =

    Model { internalState | value = FormValue.reset internalState.value }


-- VIEW STATE SETTERS --


setIsLocked : Bool -> View -> View
setIsLocked isLocked (View viewState internalState) =

    View { viewState | isLocked = isLocked } internalState


setIsError : Bool -> View -> View
setIsError isError (View viewState internalState) =

    View { viewState | isError = isError } internalState