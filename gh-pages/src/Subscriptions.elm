module Subscriptions exposing (subscriptions)

import Model exposing (Model)
import Msg exposing (Msg)
import Toasters


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Toasters.subscription model.toasters |> Sub.map Msg.ToastersMsg
        ]
