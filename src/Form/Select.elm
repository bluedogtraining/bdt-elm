module Form.Select exposing
    ( Model, View
    , init
    , Msg, update
    , view, render
    , reInitialize, reset
    , setDefaultLabel, setToLabel
    , setInitialOption, setSelectedOption, setIsOptionDisabled
    , setIsError, setIsLocked, setIsClearable
    , setId
    , getIsOpen, getIsChanged
    , getSelectedOption, getOriginalOption
    , getId
    )

import Html.Styled exposing (Html)

import Tuple

import Form.Select.Internal as Internal


-- MODEL --


type Model option
    = Model (Internal.State option)


type View option
    = View (Internal.State option) (Internal.ViewState option)


init : List option -> Model option
init =
    Internal.init >> Model


-- UPDATE --


type alias Msg
    = Internal.Msg


update : Internal.Msg option -> Model option -> (Model option, Cmd (Internal.Msg option))
update msg (Model state) =

    Tuple.mapFirst Model (Internal.update msg state)


-- VIEW --


view : Model option -> View option
view (Model state) =

    View state Internal.initialViewState


render : View option -> Html (Internal.Msg option)
render (View state viewState) =

    Internal.render state viewState


-- STATE SETTERS --


reInitialize : Model option -> Model option
reInitialize (Model state) =

    Model <| Internal.reInitialize state


reset : Model option -> Model option
reset (Model state) =

    Model <| Internal.reset state


setInitialOption : Maybe option -> Model option -> Model option
setInitialOption selectedOption (Model state) =

    Model <| Internal.setInitialOption selectedOption state


setSelectedOption : Maybe option -> Model option -> Model option
setSelectedOption selectedOption (Model state) =

    Model <| Internal.setSelectedOption selectedOption state


-- VIEW STATE SETTERS --


setToLabel : (option -> String) -> View option -> View option
setToLabel toLabel (View state viewState) =

    View state (Internal.setToLabel toLabel viewState)


setDefaultLabel : String -> View option -> View option
setDefaultLabel defaultLabel (View state viewState) =

    View state (Internal.setDefaultLabel defaultLabel viewState)


setIsOptionDisabled : (option -> Bool) -> View option -> View option
setIsOptionDisabled isOptionDisabled (View state viewState) =

    View state (Internal.setIsOptionDisabled isOptionDisabled viewState)


setIsLocked : Bool -> View option -> View option
setIsLocked isLocked (View state viewState) =

    View state (Internal.setIsLocked isLocked viewState)


setIsError : Bool -> View option -> View option
setIsError isError (View state viewState) =

    View state (Internal.setIsError isError viewState)


setIsClearable : Bool -> View option -> View option
setIsClearable isClearable (View state viewState) =

    View state (Internal.setIsClearable isClearable viewState)


setId : String -> View option -> View option
setId id (View state viewState) =

    View state (Internal.setId id viewState)


-- GETTERS --


getSelectedOption : Model option -> Maybe option
getSelectedOption (Model state) =

    Internal.getSelectedOption state


getOriginalOption : Model option -> Maybe option
getOriginalOption (Model state) =

    Internal.getOriginalOption state


getIsChanged : Model option -> Bool
getIsChanged (Model state) =

    Internal.getIsChanged state


getIsOpen : Model option -> Bool
getIsOpen (Model state) =

    Internal.getIsOpen state


getId : View option -> Maybe String
getId (View _ viewState) =

    Internal.getId viewState