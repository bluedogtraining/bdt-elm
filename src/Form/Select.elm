module Form.Select exposing
    ( Model, init
    , Msg, update
    , view, render
    , reInitialise, reset
    , setInitialOption, setSelectedOption, setIsOptionDisabled
    , setIsError, setIsLocked, setIsClearable
    , setDefaultLabel, setToLabel
    , setId
    , getIsChanged, getIsOpen
    , getInitialOption, getSelectedOption
    , getId
    )

{-| This module is useful if you want to add a Select Form element to your app.

# Initialise and update
@docs Model, init, Msg, update

# View and render
@docs view, render

# State Setters
@docs reInitialise, reset, setInitialOption, setSelectedOption, setIsOptionDisabled

# View Setters
@docs setIsError, setIsLocked, setIsClearable, setDefaultLabel, setToLabel, setId

# Getters
@docs getIsChanged, getIsOpen, getInitialOption, getSelectedOption, getId

-}

import Html.Styled exposing (Html)

import Tuple

import Form.Select.Internal as Internal


{-| Add a Select.Model to your model.

    type Title
        = Mr
        | Ms
        | Dr

    type alias MyModel =
        { mySelect : Select.Model Title
        }
-}
type Model option
    = Model (Internal.State option)


type View option
    = View (Internal.State option) (Internal.ViewState option)


{-| Add a Select.Model to your model.

    myInitialModel : MyModel
    myInitialModel =
        { mySelect = Select.init [Mr, Ms, Dr]
        }
-}
init : List option -> Model option
init =
    Internal.init >> Model


{-| Add a Select.Msg to your Msg.

    type MyMsg
        = UpdateMySelect Select.Msg
-}
type alias Msg option =
    Internal.Msg option


{-| Use in your update function.

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            UpdateMySelect selectMsg ->
                let
                    (newSelect, cmd) =
                        Select.update selectMsg mode.mySelect
                in
                    { model | mySelect = newSelect } ! [ cmd ]
-}
update : Internal.Msg option -> Model option -> (Model option, Cmd (Internal.Msg option))
update msg (Model state) =

    Tuple.mapFirst Model (Internal.update msg state)


{-| Transform an Select.Model into an Select.View, which allows us to pipe View Setters on it.

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ Select.view model.mySelect -- pipe view setters here, for example |> setIsLocked 'your logic here'
            ]
-}
view : Model option -> View option
view (Model state) =

    View state Internal.initialViewState


{-| Transforms an Select.View into Html Select.Msg

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ Select.view model.mySelect
                |> Select.render
                |> Html.map UpdateMySelect
            ]
-}
render : View option -> Html (Internal.Msg option)
render (View state viewState) =

    Internal.render state viewState


{-| ReInitialise your Select.Model.
-}
reInitialise : Model option -> Model option
reInitialise (Model state) =

    Model <| Internal.reInitialise state


{-| Reset your Select.Model.
-}
reset : Model option -> Model option
reset (Model state) =

    Model <| Internal.reset state


{-| Set the initial option of your Select.Model.
-}
setInitialOption : Maybe option -> Model option -> Model option
setInitialOption selectedOption (Model state) =

    Model <| Internal.setInitialOption selectedOption state


{-| Change the option of your Select.Model.
-}
setSelectedOption : Maybe option -> Model option -> Model option
setSelectedOption selectedOption (Model state) =

    Model <| Internal.setSelectedOption selectedOption state


{-| This function allows you to disable specific options.
-}
setIsOptionDisabled : (option -> Bool) -> View option -> View option
setIsOptionDisabled isOptionDisabled (View state viewState) =

    View state (Internal.setIsOptionDisabled isOptionDisabled viewState)


{-| Set whether your select is in error mode (red border).
-}
setIsError : Bool -> View option -> View option
setIsError isError (View state viewState) =

    View state (Internal.setIsError isError viewState)


{-| Set whether your select is locked (disabled).
-}
setIsLocked : Bool -> View option -> View option
setIsLocked isLocked (View state viewState) =

    View state (Internal.setIsLocked isLocked viewState)


{-| Set whether your select is clearable (x icon).
-}
setIsClearable : Bool -> View option -> View option
setIsClearable isClearable (View state viewState) =

    View state (Internal.setIsClearable isClearable viewState)


{-| Set how your options are printed to the screen.
-}
setToLabel : (option -> String) -> View option -> View option
setToLabel toLabel (View state viewState) =

    View state (Internal.setToLabel toLabel viewState)


{-| Set the default label, for example (-- NOTHING SELECTED --).
-}
setDefaultLabel : String -> View option -> View option
setDefaultLabel defaultLabel (View state viewState) =

    View state (Internal.setDefaultLabel defaultLabel viewState)


{-| Give your select an id. Can be useful for DOM selectors (focus, WebComponents etc.)
-}
setId : String -> View option -> View option
setId id (View state viewState) =

    View state (Internal.setId id viewState)


{-| Whether your select was changed. Useful if you want to disable save buttons unless there were changes etc.
-}
getIsChanged : Model option -> Bool
getIsChanged (Model state) =

    Internal.getIsChanged state


{-| Whether this select is currently open.
-}
getIsOpen : Model option -> Bool
getIsOpen (Model state) =

    Internal.getIsOpen state


{-| Get the initial option of your select.
-}
getInitialOption : Model option -> Maybe option
getInitialOption (Model state) =

    Internal.getInitialOption state


{-| Get the current option of your select. This is what you'd use to display the data somewhere outside of your select,
or to send the data to the backend for example etc.
-}
getSelectedOption : Model option -> Maybe option
getSelectedOption (Model state) =

    Internal.getSelectedOption state


{-| Useful if you need the id of the select in your update function, to set focus etc.
-}
getId : View option -> Maybe String
getId (View _ viewState) =

    Internal.getId viewState