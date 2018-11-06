module Msg exposing (Msg(..))

import Admin.Msg as Admin
import Browser exposing (UrlRequest)
import Index.Msg as Index
import Toasters
import Trainer.Msg as Trainer
import Url exposing (Url)


type Msg
    = UrlChange Url
    | Navigate UrlRequest
    | ToastersMsg Toasters.Msg
    | ToggleAdminMenu
    | IndexMsg Index.Msg
    | AdminMsg Admin.Msg
    | TrainerMsg Trainer.Msg
