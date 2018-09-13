module Form.TextArea exposing
    ( Model, init, Msg, update
    , view, render
    , reInitialise, reset, setInitialValue, setValue, setSubstituteTabs, setReplacements
    , setPlaceholder, setMaxLength, setIsError, setIsLocked, setId
    , getInitialValue, getValue, getIsChanged, getId
    )

{-| This module is useful if you want to add an TextArea Form element to your app.


# Initialise and update

@docs Model, init, Msg, update


# View and render

@docs view, render


# State Setters

@docs reInitialise, reset, setInitialValue, setValue, setSubstituteTabs, setReplacements


# View Setters

@docs setPlaceholder, setMaxLength, setIsError, setIsLocked, setId


# Getters

@docs getInitialValue, getValue, getIsChanged, getId

-}

import Form.TextArea.Internal as Internal
import Html.Styled exposing (Html)


{-| Add a TextArea.Model to your model.

    type alias MyModel =
        { myTextArea : TextArea.Model
        }

-}
type Model
    = Model Internal.State


type View
    = View Internal.State Internal.ViewState


{-| Add a TextArea.Model to your model.

    myInitialModel : MyModel
    myInitialModel =
        { myTextArea = TextArea.init -- optionally pipe into State Setters
        }

-}
init : Model
init =
    Model Internal.init


{-| Add a TextArea.Msg to your Msg.

    type MyMsg
        = UpdateMyTextArea TextArea.Msg

-}
type alias Msg =
    Internal.Msg


{-| Use in your update function.

    myUpdate : Msg -> Model -> ( Model, Cmd Msg )
    myUpdate msg model =
        case msg of
            UpdateMyTextArea inputMsg ->
                { model | myTextArea = TextArea.update inputMsg mode.myTextArea } ! []

-}
update : Internal.Msg -> Model -> Model
update msg (Model state) =
    Model (Internal.update msg state)


{-| Transform an TextArea.Model into an TextArea.View, which allows us to pipe View Setters on it.

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ TextArea.view model.myTextArea -- pipe view setters here, for example |> setIsLocked 'your logic here'
            ]

-}
view : Model -> View
view (Model state) =
    View state Internal.initialViewState


{-| Transforms an TextArea.View into Html TextArea.Msg

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ TextArea.view model.myTextArea
                |> TextArea.render
                |> Html.map UpdateMyTextArea
            ]

-}
render : View -> Html Internal.Msg
render (View state viewState) =
    Internal.render state viewState


{-| ReInitialise your TextArea.Model.
-}
reInitialise : Model -> Model
reInitialise (Model state) =
    Model <| Internal.reInitialise state


{-| Reset your TextArea.Model.
-}
reset : Model -> Model
reset (Model state) =
    Model <| Internal.reset state


{-| Set the initial value of your TextArea.Model.
-}
setInitialValue : String -> Model -> Model
setInitialValue value (Model state) =
    Model <| Internal.setInitialValue value state


{-| Change the value of your TextArea.Model.
-}
setValue : String -> Model -> Model
setValue value (Model state) =
    Model <| Internal.setValue value state


{-| Set whether the `tab` should insert spaces instead of tabbing out of the field.
-}
setSubstituteTabs : Bool -> Model -> Model
setSubstituteTabs bool (Model state) =
    Model (Internal.setSubstituteTabs bool state)


{-| Set a ist of string that should be replaced.
-}
setReplacements : List ( String, String ) -> Model -> Model
setReplacements replacements (Model state) =
    Model (Internal.setReplacements replacements state)


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
