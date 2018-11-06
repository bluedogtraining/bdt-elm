module Trainer.Route exposing (Route(..), routeParser, toString)

import Url.Parser as Parser exposing ((</>), Parser, s)


type Route
    = TrainingPlan
    | Settings


routeParser : Parser (Route -> subRoute) subRoute
routeParser =
    Parser.oneOf
        [ Parser.map TrainingPlan (s "training-plan")
        , Parser.map Settings (s "settings")
        ]


toString : Route -> String
toString route =
    case route of
        TrainingPlan ->
            "/training-plan"

        Settings ->
            "/settings"
