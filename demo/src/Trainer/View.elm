module Trainer.View exposing (view)

import Html.Styled exposing (..)
import Trainer.Model as Trainer
import Trainer.Msg as Trainer
import Trainer.Route as Trainer


view : Trainer.Route -> Trainer.Model -> Html Trainer.Msg
view route model =
    div
        []
        [ text "trainer view" ]
