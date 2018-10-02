module Admin.Courses.Search.Model exposing (Model, initialModel)


type alias Model =
    { search : String
    }


initialModel : Model
initialModel =
    { search = ""
    }