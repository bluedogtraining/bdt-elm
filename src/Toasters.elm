module Toasters exposing
    ( Model, init
    , Msg, update
    , subscription
    , addGreen, addRed
    , view
    )

import Html.Styled exposing (Html)

import Toasters.Internal as Internal
import Toasters.Color exposing (Color (..))


type alias Msg =
    Internal.Msg


type Model =
    Model (List Internal.Toaster)


init : Model
init  =
    Model []


update : Msg -> Model -> Model
update toasterMsg (Model toasters) =

    Model <| Internal.update toasterMsg toasters


subscription : Model -> Sub Msg
subscription (Model toasters) =

    Internal.subscription toasters


addGreen : String -> Model -> Model
addGreen message (Model toasters) =

    Model <| Internal.add Green message toasters


addRed : String -> Model -> Model
addRed message (Model toasters) =

    Model <| Internal.add Red message toasters


view : Model -> Html Msg
view (Model toasters) =

    Internal.view toasters