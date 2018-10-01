module Admin.Route exposing (Route(..), routeParser, toString)

import Url.Parser as Parser exposing (Parser, s)


type Route
    = Courses
    | Units


routeParser : Parser (Route -> subRoute) subRoute
routeParser =
    Parser.oneOf
        [ Parser.map Courses (s "courses")
        , Parser.map Units (s "units")
        ]


toString : Route -> String
toString route =
    case route of
        Courses ->
            "/courses"

        Units ->
            "/units"
