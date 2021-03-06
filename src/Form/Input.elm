module Form.Input exposing
    ( Model, init, Msg, update
    , view, render
    , reInitialise, reset, setInitialValue, setValue
    , setPlaceholder, setMaxLength, setIsError, setIsLocked, setId
    , setTextType, setEmailType, setPasswordType, setTelType, setNumberType
    , getInitialValue, getValue, getIsChanged, getId
    )

{-| This module is useful if you want to add an Input Form element to your app.


# Initialise and update

@docs Model, init, Msg, update


# View and render

@docs view, render


# State Setters

@docs reInitialise, reset, setInitialValue, setValue


# View Setters

@docs setPlaceholder, setMaxLength, setIsError, setIsLocked, setId


# Type Setters

@docs setTextType, setEmailType, setPasswordType, setTelType, setNumberType


# Getters

@docs getInitialValue, getValue, getIsChanged, getId

-}

import Form.Input.Internal as Internal
import Html.Styled exposing (Html)


{-| Add a Input.Model to your model.

    type alias MyModel =
        { myInput : Input.Model
        }

-}
type Model
    = Model Internal.State


type View
    = View Internal.State Internal.ViewState


{-| Add a Input.Model to your model.

    myInitialModel : MyModel
    myInitialModel =
        { myInput = Input.init -- optionally pipe into State Setters
        }

-}
init : Model
init =
    Model Internal.init


{-| Add a Input.Msg to your Msg.

    type MyMsg
        = UpdateMyInput Input.Msg

-}
type alias Msg =
    Internal.Msg


{-| Use in your update function.

    myUpdate : Msg -> Model -> ( Model, Cmd Msg )
    myUpdate msg model =
        case msg of
            UpdateMyInput inputMsg ->
                { model | myInput = Input.update inputMsg mode.myInput } ! []

-}
update : Msg -> Model -> Model
update msg (Model state) =
    Model (Internal.update msg state)


{-| Transform an Input.Model into an Input.View, which allows us to pipe View Setters on it.

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ Input.view model.myInput -- pipe view setters here, for example |> setIsLocked 'your logic here'
            ]

-}
view : Model -> View
view (Model state) =
    View state Internal.initialViewState


{-| Transforms an Input.View into Html Input.Msg

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ Input.view model.myInput
                |> Input.render
                |> Html.map UpdateMyInput
            ]

-}
render : View -> Html Msg
render (View state viewState) =
    Internal.render state viewState


{-| ReInitialise your Input.Model.
-}
reInitialise : Model -> Model
reInitialise (Model state) =
    Model <| Internal.reInitialise state


{-| Reset your Input.Model.
-}
reset : Model -> Model
reset (Model state) =
    Model <| Internal.reset state


{-| Set the initial value of your Input.Model.
-}
setInitialValue : String -> Model -> Model
setInitialValue value (Model state) =
    Model <| Internal.setInitialValue value state


{-| Change the value of your Input.Model.
-}
setValue : String -> Model -> Model
setValue value (Model state) =
    Model <| Internal.setValue value state


{-| Set the max length for your input string.
-}
setMaxLength : Int -> View -> View
setMaxLength maxLength (View state viewState) =
    View state (Internal.setMaxLength maxLength viewState)


{-| Set a placeholder for your input.
-}
setPlaceholder : String -> View -> View
setPlaceholder placeholder (View state viewState) =
    View state (Internal.setPlaceholder placeholder viewState)


{-| Set whether your input is locked (disabled).
-}
setIsLocked : Bool -> View -> View
setIsLocked isLocked (View state viewState) =
    View state (Internal.setIsLocked isLocked viewState)


{-| Set whether your input is in error mode (red border).
-}
setIsError : Bool -> View -> View
setIsError isError (View state viewState) =
    View state (Internal.setIsError isError viewState)


{-| Give your input an id. Can be useful for DOM selectors (focus, WebComponents etc.)
-}
setId : String -> View -> View
setId id (View state viewState) =
    View state (Internal.setId id viewState)


{-| Set the type\_ of your input to "text"
-}
setTextType : View -> View
setTextType (View state viewState) =
    View state (Internal.setTextType viewState)


{-| Set the type\_ of your input to "email"
-}
setEmailType : View -> View
setEmailType (View state viewState) =
    View state (Internal.setEmailType viewState)


{-| Set the type\_ of your input to "password"
-}
setPasswordType : View -> View
setPasswordType (View state viewState) =
    View state (Internal.setPasswordType viewState)


{-| Set the type\_ of your input to "tel"
-}
setTelType : View -> View
setTelType (View state viewState) =
    View state (Internal.setTelType viewState)


{-| Set the type\_ of your input to "number"
-}
setNumberType : View -> View
setNumberType (View state viewState) =
    View state (Internal.setNumberType viewState)


{-| Whether your input was changed. Useful if you want to disable save buttons unless there were changes etc.
-}
getIsChanged : Model -> Bool
getIsChanged (Model state) =
    Internal.getIsChanged state


{-| Get the initial value of your input.
-}
getInitialValue : Model -> String
getInitialValue (Model state) =
    Internal.getInitialValue state


{-| Get the current value of your input. This is what you'd use to display the data somewhere outside of your input,
or to send the data to the backend for example etc.
-}
getValue : Model -> String
getValue (Model state) =
    Internal.getValue state


{-| Useful if you need the id of the input in your update function, so set focus etc.
-}
getId : View -> Maybe String
getId (View _ viewState) =
    Internal.getId viewState
