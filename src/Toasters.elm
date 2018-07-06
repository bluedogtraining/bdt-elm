module Toasters exposing
    ( Model, init
    , Msg, update
    , subscription
    , addGreen, addRed
    , view
    )

{-| Module to add Toasters to your app

# Initialise and update
@docs Model, init, Msg, update

# Subscription
@docs subscription

# Add toasters
@docs addGreen, addRed

# Add to your view
@docs view

-}

import Html.Styled exposing (Html)

import Toasters.Internal as Internal
import Toasters.Color exposing (Color (..))


{-| Add a Toasters.Model to your model.

    type alias MyModel =
        { toasters : Toasters.Model
        }
-}
type Model =
    Model (List Internal.Toaster)


{-| Add a Toasters.Model to your model.

    myInitialModel : MyModel
    myInitialModel =
        { toasters = Toasters.init
        }
-}
init : Model
init  =
    Model []


{-| Add a Toasters.Msg to your Msg.

    type MyMsg
        = ToastersMsg Toasters.Msg
-}
type alias Msg =
    Internal.Msg


{-| Use in your update function.

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            ToastersMsg toastersMsg ->
                { model | toasters = Toasters.update toastersMsg model.toasters } ! []
-}
update : Msg -> Model -> Model
update toasterMsg (Model toasters) =

    Model <| Internal.update toasterMsg toasters


{-| Add to your subscription function.

    subscriptions : Model -> Sub Msg
    subscriptions model =
        Sub.batch
            [ Toasters.subscription model.toasters |> Sub.map Msg.ToastersMsg
            ]
-}
subscription : Model -> Sub Msg
subscription (Model toasters) =

    Internal.subscription toasters


{-| Add to your subscription function.

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            SavedSuccessfully ->
                { model
                    | isSaving = False
                    , toasters = Toasters.addGreen "Data saved Successfully :)" model.toasters
                } ! []
-}
addGreen : String -> Model -> Model
addGreen message (Model toasters) =

    Model <| Internal.add Green message toasters


{-| Add to your subscription function.

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            SavingFailed ->
                { model
                    | isSaving = False
                    , toasters = Toasters.addRed "Data could not be saved :(" model.toasters
                } ! []
-}
addRed : String -> Model -> Model
addRed message (Model toasters) =

    Model <| Internal.add Red message toasters


{-| Add to your view function.

    div
        []
        [ Toasters.view model.toasters
            |> Html.map ToastersMsg
        , div
            []
            [ text "My Cool App" ]
        ]
-}
view : Model -> Html Msg
view (Model toasters) =

    Internal.view toasters