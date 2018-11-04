module Trainer.View exposing (view)

import Html.Styled exposing (..)
import Trainer.Page as Trainer
import Trainer.Msg as Trainer


view : Trainer.Page -> Html Trainer.Msg
view model =
    div
        []
        [ text "trainer view" ]
