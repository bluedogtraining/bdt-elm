module Form.DatePicker exposing
    ( Model, init, Msg, update
    , view, render
    , reInitialise, reset, setInitialPosix, setSelectedPosix
    , setMinPosix, setMaxPosix, setIncludeTime, setIsInput, setIsError, setIsLocked, setIsClearable, setDefaultLabel, setId
    , getIsChanged, getIsOpen, getInitialPosix, getSelectedPosix, getId
    , setTimeZone
    )

{-| This module is useful if you want to add a DatePicker Form element to your app.


# Initialise and update

@docs Model, init, Msg, update


# View and render

@docs view, render


# State Setters

@docs reInitialise, reset, setTimeZone, setInitialPosix, setSelectedPosix


# View Setters

@docs setMinPosix, setMaxPosix, setIncludeTime, setIsInput, setIsError, setIsLocked, setIsClearable, setDefaultLabel, setId


# Getters

@docs getIsChanged, getIsOpen, getInitialPosix, getSelectedPosix, getId

-}

import Form.DatePicker.Internal as Internal
import Html.Styled exposing (Html)
import Time exposing (Posix)
import Tuple


{-| Add a DatePicker.Model to your model.

    type alias MyModel =
        { myDatePicker : DatePicker.Model
        }

-}
type Model
    = Model Internal.State


type View
    = View Internal.State Internal.ViewState


{-| Init a DatePicker.Model in your model.

    myInitialModel : MyModel
    myInitialModel =
        { myDatePicker = DatePicker.init
        }

-}
init : Model
init =
    Model Internal.init


{-| Add a DatePicker.Msg to your Msg.

    type MyMsg
        = UpdateMyDatePicker DatePicker.Msg

-}
type alias Msg =
    Internal.Msg


{-| Use in your update function.

    myUpdate : Msg -> Model -> ( Model, Cmd Msg )
    myUpdate msg model =
        case msg of
            UpdateMyDatePicker datePickerMsg ->
                let
                    ( newDatePicker, cmd ) =
                        DatePicker.update datePickerMsg mode.myDatePicker
                in
                { model | myDatePicker = newDatePicker } ! [ cmd ]

-}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg (Model state) =
    Tuple.mapFirst Model <| Internal.update msg state


{-| Transform an DatePicker.Model into an DatePicker.View, which allows us to pipe View Setters on it.

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ DatePicker.view model.myDatePicker -- pipe view setters here, for example |> setIsLocked 'your logic here'
            ]

-}
view : Model -> View
view (Model state) =
    View state Internal.initialViewState


{-| Transforms an DatePicker.View into Html DatePicker.Msg

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ DatePicker.view model.myDatePicker
                |> DatePicker.render
                |> Html.map UpdateMyDatePicker
            ]

-}
render : View -> Html Msg
render (View state viewState) =
    Internal.render state viewState


{-| ReInitialise your DatePicker.Model.
-}
reInitialise : Model -> Model
reInitialise (Model state) =
    Model <| Internal.reInitialise state


{-| Reset your DatePicker.Model.
-}
reset : Model -> Model
reset (Model state) =
    Model <| Internal.reset state


{-| Set the TimeZone
-}
setTimeZone : Time.Zone -> Model -> Model
setTimeZone timeZone (Model state) =
    Model <| Internal.setTimeZone timeZone state


{-| Set the initial Date of your DatePicker.Model.
-}
setInitialPosix : Maybe Posix -> Model -> Model
setInitialPosix posix (Model state) =
    Model <| Internal.setInitialPosix posix state


{-| Change the Date of your DatePicker.Model.
-}
setSelectedPosix : Maybe Posix -> Model -> Model
setSelectedPosix posix (Model state) =
    Model <| Internal.setSelectedPosix posix state


{-| Set the min. date. Dates prior to this can't be selected. Navigation is also capped to this date.
-}
setMinPosix : Maybe Posix -> View -> View
setMinPosix posix (View state viewState) =
    View state (Internal.setMinPosix posix viewState)


{-| Set the min. date. Dates subsequent to this can't be selected. Navigation is also capped to this date.
-}
setMaxPosix : Maybe Posix -> View -> View
setMaxPosix posix (View state viewState) =
    View state (Internal.setMaxPosix posix viewState)


{-| Sets whether your date picker should include a time picker.
-}
setIncludeTime : Bool -> View -> View
setIncludeTime includeTime (View state viewState) =
    View state (Internal.setIncludeTime includeTime viewState)


{-| Set whether your date picker is displayed as an input.
-}
setIsInput : Bool -> View -> View
setIsInput isInput (View state viewState) =
    View state (Internal.setIsInput isInput viewState)


{-| Set whether your datePicker is in error mode (red border).
-}
setIsError : Bool -> View -> View
setIsError isError (View state viewState) =
    View state (Internal.setIsError isError viewState)


{-| Set whether your datePicker is locked (disabled).
-}
setIsLocked : Bool -> View -> View
setIsLocked isLocked (View state viewState) =
    View state (Internal.setIsLocked isLocked viewState)


{-| Set whether your datePicker is clearable (x icon).
-}
setIsClearable : Bool -> View -> View
setIsClearable isClearable (View state viewState) =
    View state (Internal.setIsClearable isClearable viewState)


{-| Set the default label, for example (-- NOTHING SELECTED --).
-}
setDefaultLabel : String -> View -> View
setDefaultLabel defaultLabel (View state viewState) =
    View state (Internal.setDefaultLabel defaultLabel viewState)


{-| Give your datePicker an id. Can be useful for DOM selectors (focus, WebComponents etc.)
-}
setId : String -> View -> View
setId id (View state viewState) =
    View state (Internal.setId id viewState)


{-| Whether your datePicker was changed. Useful if you want to disable save buttons unless there were changes etc.
-}
getIsChanged : Model -> Bool
getIsChanged (Model state) =
    Internal.getIsChanged state


{-| Whether this datePicker is currently open.
-}
getIsOpen : Model -> Bool
getIsOpen (Model state) =
    Internal.getIsOpen state


{-| Get the initial Date of your datePicker.
-}
getInitialPosix : Model -> Maybe Posix
getInitialPosix (Model state) =
    Internal.getInitialPosix state


{-| Get the current Date of your datePicker. This is what you'd use to display the data somewhere outside of your datePicker,
or to send the data to the backend for example etc.
-}
getSelectedPosix : Model -> Maybe Posix
getSelectedPosix (Model state) =
    Internal.getSelectedPosix state


{-| Useful if you need the id of the datePicker in your update function, to set focus etc.
-}
getId : View -> Maybe String
getId (View _ viewState) =
    Internal.getId viewState
