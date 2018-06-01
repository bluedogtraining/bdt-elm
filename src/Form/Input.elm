module Form.Input exposing
    ( Model, View
    , init
    , Msg, update
    , view, render
    , reInitialize, reset
    , setInitialValue ,setValue
    , setIsError, setIsLocked
    , setId
    , getValue, getIsChanged
    , getId
    )

import Html.Styled exposing (Html)

import Form.Input.Internal as Internal


-- MODEL --


type Model
    = Model Internal.State


type View
    = View Internal.State Internal.ViewState


init : Model
init =
    Model Internal.init


-- UPDATE --


type Msg
    = Input String


update : Internal.Msg -> Model -> Model
update msg (Model state) =

    Model (Internal.update msg state)


-- VIEW --


view : Model -> View
view (Model state) =

    View state Internal.initialViewState


render : View -> Html Internal.Msg
render (View state viewState) =

    Internal.render state viewState


-- STATE SETTERS --


reInitialize : Model -> Model
reInitialize (Model state) =

    Model <| Internal.reInitialize state


reset : Model -> Model
reset (Model state) =

    Model <| Internal.reset state


setInitialValue : String -> Model -> Model
setInitialValue value (Model state) =

    Model <| Internal.setInitialValue value state


setValue : String -> Model -> Model
setValue value (Model state) =

    Model <| Internal.setValue value state


-- VIEW STATE SETTERS --


setIsLocked : Bool -> View -> View
setIsLocked isLocked (View state viewState) =

    View state (Internal.setIsLocked isLocked viewState)


setIsError : Bool -> View -> View
setIsError isError (View state viewState) =

    View state (Internal.setIsError isError viewState)


setId : String -> View -> View
setId id (View state viewState) =

    View state (Internal.setId id viewState)


-- GETTERS --


getValue : Model -> String
getValue (Model state) =

    Internal.getValue state


getIsChanged : Model -> Bool
getIsChanged (Model state) =

    Internal.getIsChanged state


getId : View -> Maybe String
getId (View _ viewState) =

    Internal.getId viewState