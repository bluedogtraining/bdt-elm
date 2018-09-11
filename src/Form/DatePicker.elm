module Form.DatePicker exposing
    ( Model, init
    , Msg, update
    , view, render
    , reInitialise, reset
    , setInitialDate, setSelectedDateTime
    , setMinDate, setMaxDate, setIncludeTime, setIsInput
    , setIsError, setIsLocked, setIsClearable
    , setDefaultLabel
    , setId
    , getIsChanged, getIsOpen
    , getInitialDateTime, getSelectedDateTime
    , getId
    )

{-| This module is useful if you want to add a DatePicker Form element to your app.

# Initialise and update
@docs Model, init, Msg, update

# View and render
@docs view, render

# State Setters
@docs reInitialise, reset, setInitialDate, setSelectedDate

# View Setters
@docs setMinDate, setMaxDate, setIncludeTime, setIsInput, setIsError, setIsLocked, setIsClearable, setDefaultLabel, setToLabel, setId

# Getters
@docs getIsChanged, getIsOpen, getInitialDate, getSelectedDate, getId

-}

import Html.Styled exposing (Html)

import Tuple
import Time.Date exposing (Date)
import Time.DateTime exposing (DateTime)

import Form.DatePicker.Internal as Internal


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

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            UpdateMyDatePicker datePickerMsg ->
                let
                    (newDatePicker, cmd) =
                        DatePicker.update datePickerMsg mode.myDatePicker
                in
                    { model | myDatePicker = newDatePicker } ! [ cmd ]
-}
update : Internal.Msg -> Model -> (Model, Cmd Internal.Msg)
update msg (Model state) =

    Tuple.mapFirst Model (Internal.update msg state)


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
render : View -> Html Internal.Msg
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


{-| Set the initial Date of your DatePicker.Model.
-}
setInitialDate : Maybe DateTime -> Model -> Model
setInitialDate selectedDateTime (Model state) =

    Model <| Internal.setInitialDate selectedDateTime state


{-| Change the Date of your DatePicker.Model.
-}
setSelectedDateTime : Maybe DateTime -> Model -> Model
setSelectedDateTime selectedDateTime (Model state) =

    Model <| Internal.setSelectedDateTime selectedDateTime state


{-| Set the min. date. Dates prior to this can't be selected. Navigation is also capped to this date.
-}
setMinDate : Maybe Date -> View -> View
setMinDate date (View state viewState) =

    View state (Internal.setMinDate date viewState)


{-| Set the min. date. Dates subsequent to this can't be selected. Navigation is also capped to this date.
-}
setMaxDate : Maybe Date -> View -> View
setMaxDate date (View state viewState) =

    View state (Internal.setMaxDate date viewState)


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
getInitialDateTime : Model -> Maybe DateTime
getInitialDateTime (Model state) =

    Internal.getInitialDateTime state


{-| Get the current Date of your datePicker. This is what you'd use to display the data somewhere outside of your datePicker,
or to send the data to the backend for example etc.
-}
getSelectedDateTime : Model -> Maybe DateTime
getSelectedDateTime (Model state) =

    Internal.getSelectedDateTime state


{-| Useful if you need the id of the datePicker in your update function, to set focus etc.
-}
getId : View -> Maybe String
getId (View _ viewState) =

    Internal.getId viewState