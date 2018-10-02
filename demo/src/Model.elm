module Model exposing (Model, initialModel)

import Admin.Page as Admin
import BaseReturn as Return
import Browser.Navigation as Navigation
import Dict exposing (Dict)
import Entities exposing (Entities)
import Index.Model as Index
import Msg exposing (Msg)
import Page exposing (Page)
import Return exposing (Return)
import Route exposing (Route(..))
import Toasters
import Trainer.Page as Trainer


type alias Model =
    { db : Db
    , toasters : Toasters.Model
    , navigationKey : Navigation.Key
    , isAdminMenuOpen : Bool
    , page : Page
    }


initialModel : Navigation.Key -> Return Msg Model
initialModel navigationKey =
    Return.init
        { db = initialDb
        , toasters = Toasters.init
        , navigationKey = navigationKey
        , isAdminMenuOpen = False
        , page = Page.Index Index.initialModel
        }


type alias Db =
    { entities : Entities
    }


initialDb : Db
initialDb =
    { entities = Entities.init
    }
