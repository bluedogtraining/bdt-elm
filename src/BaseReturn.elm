module BaseReturn exposing (BaseReturn, Data, addCmd, addEntities, addGreenToaster, addRedToaster, get, init, map, mapMsg, toData)

import Toasters


type BaseReturn entities msg model
    = BaseReturn model (Data entities msg)


type alias Data entities msg =
    { entities : List entities
    , cmd : List (Cmd msg)
    , toasters : Toasters.Model
    }


init : model -> BaseReturn entities msg model
init model =
    BaseReturn
        model
        { entities = []
        , cmd = []
        , toasters = Toasters.init
        }


map : (modelA -> modelB) -> BaseReturn entities msg modelA -> BaseReturn entities msg modelB
map f (BaseReturn model data) =
    BaseReturn
        (f model)
        { entities = data.entities
        , cmd = data.cmd
        , toasters = data.toasters
        }


get : (model -> a) -> BaseReturn entities msg model -> a
get f (BaseReturn model data) =
    f model


mapMsg : (msgA -> msgB) -> BaseReturn entities msgA model -> BaseReturn entities msgB model
mapMsg f (BaseReturn model data) =
    BaseReturn
        model
        { entities = data.entities
        , cmd = List.map (Cmd.map f) data.cmd
        , toasters = data.toasters
        }


addGreenToaster : String -> BaseReturn entities msg model -> BaseReturn entities msg model
addGreenToaster text (BaseReturn model data) =
    BaseReturn model { data | toasters = Toasters.addGreen text data.toasters }


addRedToaster : String -> BaseReturn entities msg model -> BaseReturn entities msg model
addRedToaster text (BaseReturn model data) =
    BaseReturn model { data | toasters = Toasters.addRed text data.toasters }


addCmd : Cmd msg -> BaseReturn entities msg model -> BaseReturn entities msg model
addCmd cmd (BaseReturn model data) =
    BaseReturn model { data | cmd = data.cmd ++ [ cmd ] }


addEntities : entities -> BaseReturn entities msg model -> BaseReturn entities msg model
addEntities entities (BaseReturn model data) =
    BaseReturn model { data | entities = data.entities ++ [ entities ] }


toData : BaseReturn entities msg model -> ( model, Data entities msg )
toData (BaseReturn model data) =
    ( model, data )
