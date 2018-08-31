module Form.MultiSelect exposing
    ( Model, init
    , Msg, update
    , view, render
    , reInitialise, reset
    , setInitialOptions, setSelectedOptions, setIsOptionDisabled
    , setIsError, setIsLocked, setIsClearable
    , setDefaultLabel, setToLabel
    , setId
    , getIsChanged, getIsOpen
    , getInitialOptions, getSelectedOptions
    , getId
    )

{-| This module is useful if you want to add a MultiSelect Form element to your app.

# Initialise and update
@docs Model, init, Msg, update

# View and render
@docs view, render

# State Setters
@docs reInitialise, reset, setInitialOptions, setSelectedOptions, setIsOptionDisabled

# View Setters
@docs setIsError, setIsLocked, setIsClearable, setDefaultLabel, setToLabel, setId

# Getters
@docs getIsChanged, getIsOpen, getInitialOptions, getSelectedOptions, getId

-}

import Html.Styled exposing (Html)

import Tuple

import List.Nonempty exposing (Nonempty)

import Form.MultiSelect.Internal as Internal


{-| Add a MultiSelect.Model to your model.

    type MusicGenre
        = Rock
        | Jazz
        | Blues
        | Metal

    type alias MyModel =
        { myMultiSelect : MultiSelect.Model MusicGenre
        }
-}
type Model option
    = Model (Internal.State option)


type View option
    = View (Internal.State option) (Internal.ViewState option)


{-| Add a MultiSelect.Model to your model.

    myInitialModel : MyModel
    myInitialModel =
        { myMultiSelect = MultiSelect.init <| Nonempty Rock [Jazz, Blues, Metal]
        }
-}
init : Nonempty option -> Model option
init =
    Internal.init >> Model


{-| Add a MultiSelect.Msg to your Msg.

    type MyMsg
        = UpdateMyMultiSelect MultiSelect.Msg
-}
type alias Msg option =
    Internal.Msg option


{-| Use in your update function.

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            UpdateMyMultiSelect selectMsg ->
                let
                    (newSelect, cmd) =
                        MultiSelect.update selectMsg mode.myMultiSelect
                in
                    { model | myMultiSelect = newSelect } ! [ cmd ]
-}
update : Internal.Msg option -> Model option -> (Model option, Cmd (Internal.Msg option))
update msg (Model state) =

    Tuple.mapFirst Model (Internal.update msg state)


{-| Transform an MultiSelect.Model into an MultiSelect.View, which allows us to pipe View Setters on it.

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ MultiSelect.view model.myMultiSelect -- pipe view setters here, for example |> setIsLocked 'your logic here'
            ]
-}
view : Model option -> (option -> String) -> View option
view (Model state) toLabel =

    View state (Internal.initialViewState toLabel)


{-| Transforms an MultiSelect.View into Html MultiSelect.Msg

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ MultiSelect.view model.myMultiSelect
                |> MultiSelect.render
                |> Html.map UpdateMyMultiSelect
            ]
-}
render : View option -> Html (Internal.Msg option)
render (View state viewState) =

    Internal.render state viewState


{-| ReInitialise your MultiSelect.Model.
-}
reInitialise : Model option -> Model option
reInitialise (Model state) =

    Model <| Internal.reInitialise state


{-| Reset your MultiSelect.Model.
-}
reset : Model option -> Model option
reset (Model state) =

    Model <| Internal.reset state


{-| Set the initial option of your MultiSelect.Model.
-}
setInitialOptions : List option -> Model option -> Model option
setInitialOptions selectedOptions (Model state) =

    Model <| Internal.setInitialOptions selectedOptions state


{-| Change the option of your MultiSelect.Model.
-}
setSelectedOptions : List option -> Model option -> Model option
setSelectedOptions selectedOptions (Model state) =

    Model <| Internal.setSelectedOptions selectedOptions state


{-| This function allows you to disable specific options.
-}
setIsOptionDisabled : (option -> Bool) -> View option -> View option
setIsOptionDisabled isOptionDisabled (View state viewState) =

    View state (Internal.setIsOptionDisabled isOptionDisabled viewState)


{-| Set whether your select is locked (disabled).
-}
setIsLocked : Bool -> View option -> View option
setIsLocked isLocked (View state viewState) =

    View state (Internal.setIsLocked isLocked viewState)


{-| Set whether your select is in error mode (red border).
-}
setIsError : Bool -> View option -> View option
setIsError isError (View state viewState) =

    View state (Internal.setIsError isError viewState)


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
getInitialOptions : Model option -> List option
getInitialOptions (Model state) =

    Internal.getInitialOptions state


{-| Get the current option of your select. This is what you'd use to display the data somewhere outside of your select,
or to send the data to the backend for example etc.
-}
getSelectedOptions : Model option -> List option
getSelectedOptions (Model state) =

    Internal.getSelectedOptions state


{-| Useful if you need the id of the select in your update function, to set focus etc.
-}
getId : View option -> Maybe String
getId (View _ viewState) =

    Internal.getId viewState