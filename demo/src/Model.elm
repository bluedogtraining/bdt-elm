module Model exposing (Model, initialModel)

--import Admin.Model as Admin
--import Trainer.Model as Trainer

import Browser.Navigation as Navigation
import Dict exposing (Dict)
import Index.Model as Index
import Route exposing (Route(..))
import Toasters
import Trainer.Model as Trainer
import Admin.Model as Admin


type alias Model =
    { db : Db
    , toasters : Toasters.Model
    , route : Route
    , navigationKey : Navigation.Key
    , isAdminMenuOpen : Bool
    , index : Index.Model
    , admin : Admin.Model
    , trainer : Trainer.Model
    }


initialModel : Navigation.Key -> Model
initialModel navigationKey =
    { db = initialDb
    , toasters = Toasters.init
    , route = Index
    , navigationKey = navigationKey
    , isAdminMenuOpen = False
    , index = Index.initialModel
    , admin = Admin.initialModel
    , trainer = Trainer.initialModel
    }


type alias Db =
    { entities : Dict String String
    }


initialDb : Db
initialDb =
    { entities = Dict.empty
    }
