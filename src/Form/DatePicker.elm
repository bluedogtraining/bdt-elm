module Form.DatePicker exposing
    ( Model, init
    , Msg, update
    , view, render
    , reInitialise, reset
    , setInitialDate, setSelectedDate
    , setMinDate, setMaxDate, setIncludeTime
    , setIsError, setIsLocked, setIsClearable, setIsInput
    , setDefaultLabel, setToLabel
    , setId
    , getIsChanged, getIsOpen
    , getInitialDate, getSelectedDate
    , getId
    )

import Html.Styled exposing (Html)

import Tuple
import Date exposing (Date)

import Form.DatePicker.Internal as Internal


type Model
    = Model Internal.State


type View
    = View Internal.State Internal.ViewState


init : Model
init =
    Model Internal.init


{-| Add a DatePicker.Msg to your Msg.

    type MyMsg
        = UpdateMyDatePicker DatePicker.Msg
-}
type alias Msg
    = Internal.Msg


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
update : Internal.Msg -> Model -> (Model, Cmd Internal.Msg)
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
view : Model -> View
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
render : View -> Html Internal.Msg
render (View state viewState) =

    Internal.render state viewState


{-| ReInitialise your Select.Model.
-}
reInitialise : Model -> Model
reInitialise (Model state) =

    Model <| Internal.reInitialise state


{-| Reset your Select.Model.
-}
reset : Model -> Model
reset (Model state) =

    Model <| Internal.reset state


{-| Set the initial Date of your Select.Model.
-}
setInitialDate : Maybe Date -> Model -> Model
setInitialDate selectedDate (Model state) =

    Model <| Internal.setInitialDate selectedDate state


{-| Change the Date of your Select.Model.
-}
setSelectedDate : Maybe Date -> Model -> Model
setSelectedDate selectedDate (Model state) =

    Model <| Internal.setSelectedDate selectedDate state


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


{-| Set whether your select is in error mode (red border).
-}
setIsError : Bool -> View -> View
setIsError isError (View state viewState) =

    View state (Internal.setIsError isError viewState)


{-| Set whether your select is locked (disabled).
-}
setIsLocked : Bool -> View -> View
setIsLocked isLocked (View state viewState) =

    View state (Internal.setIsLocked isLocked viewState)


{-| Set whether your select is clearable (x icon).
-}
setIsClearable : Bool -> View -> View
setIsClearable isClearable (View state viewState) =

    View state (Internal.setIsClearable isClearable viewState)


{-| Set whether your date picker is displayed as an input.
-}
setIsInput : Bool -> View -> View
setIsInput isInput (View state viewState) =

    View state (Internal.setIsInput isInput viewState)


{-| Set the default label, for example (-- NOTHING SELECTED --).
-}
setDefaultLabel : String -> View -> View
setDefaultLabel defaultLabel (View state viewState) =

    View state (Internal.setDefaultLabel defaultLabel viewState)


{-| Set how your Dates are printed to the screen.
-}
setToLabel : (Date -> String) -> View -> View
setToLabel toLabel (View state viewState) =

    View state (Internal.setToLabel toLabel viewState)


{-| Give your select an id. Can be useful for DOM selectors (focus, WebComponents etc.)
-}
setId : String -> View -> View
setId id (View state viewState) =

    View state (Internal.setId id viewState)


{-| Whether your select was changed. Useful if you want to disable save buttons unless there were changes etc.
-}
getIsChanged : Model -> Bool
getIsChanged (Model state) =

    Internal.getIsChanged state


{-| Whether this select is currently open.
-}
getIsOpen : Model -> Bool
getIsOpen (Model state) =

    Internal.getIsOpen state


{-| Get the initial Date of your select.
-}
getInitialDate : Model -> Maybe Date
getInitialDate (Model state) =

    Internal.getInitialDate state


{-| Get the current Date of your select. This is what you'd use to display the data somewhere outside of your select,
or to send the data to the backend for example etc.
-}
getSelectedDate : Model -> Maybe Date
getSelectedDate (Model state) =

    Internal.getSelectedDate state


{-| Useful if you need the id of the select in your update function, to set focus etc.
-}
getId : View -> Maybe String
getId (View _ viewState) =

    Internal.getId viewState