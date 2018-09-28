module Admin.Model exposing (Model, initialModel)


type alias Model =
    { courses : String
    , units : String
    }


initialModel : Model
initialModel =
    { courses = ""
    , units = ""
    }