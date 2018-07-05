module Subscriptions exposing (subscriptions)

import Toasters

import Msg exposing (Msg)
import Model exposing (Model)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Toasters.subscription model.toasters |> Sub.map Msg.ToastersMsg
        ]