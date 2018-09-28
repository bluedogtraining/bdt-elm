module Trainer.Model exposing (Model, initialModel)


type alias Model =
    { trainingPlan : String
    , settings : String
    }


initialModel : Model
initialModel =
    { trainingPlan = ""
    , settings = ""
    }