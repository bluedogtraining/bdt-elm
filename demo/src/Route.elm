module Route exposing (Route(..), fromUrl, href, replaceUrl, toString)

import Admin.Route as Admin
import Browser.Navigation as Navigation
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes as Attributes
import Index.Model as Index
import Trainer.Route as Trainer
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, s)


type Route
    = Index
    | Admin Admin.Route
    | Trainer Trainer.Route
    | Test


routeParser : Parser (Route -> subRoute) subRoute
routeParser =
    Parser.oneOf
        [ Parser.map Index Parser.top
        , Parser.map Admin (s "admin" </> Admin.routeParser)
        , Parser.map Trainer (s "trainer" </> Trainer.routeParser)
        , Parser.map Test (s "test")
        ]


toString : Route -> String
toString route =
    case route of
        Index ->
            "/"

        Admin adminRoute ->
            "/admin" ++ Admin.toString adminRoute

        Trainer trainerRoute ->
            "/trainer" ++ Trainer.toString trainerRoute

        Test ->
            "/test"


fromUrl : Url -> Maybe Route
fromUrl =
    Parser.parse routeParser


href : Route -> Attribute msg
href targetRoute =
    Attributes.href (toString targetRoute)


replaceUrl : Navigation.Key -> Route -> Cmd msg
replaceUrl key route =
    Navigation.replaceUrl key (toString route)
