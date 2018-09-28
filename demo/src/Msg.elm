module Msg exposing (Msg(..))

import Index.Msg as Index
import Admin.Msg as Admin
import Trainer.Msg as Trainer
import Toasters
import Url exposing (Url)
import Browser exposing (UrlRequest)


type Msg
    = UrlChange Url
    | Navigate UrlRequest
    | ToastersMsg Toasters.Msg
    | ToggleAdminMenu
    | IndexMsg Index.Msg
    | AdminMsg Admin.Msg
    | TrainerMsg Trainer.Msg

