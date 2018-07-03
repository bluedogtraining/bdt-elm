module Icon exposing (..)

import Css exposing (..)
import Html.Styled exposing (Html, div, fromUnstyled)
import Html.Styled.Attributes exposing (css)

import Svg exposing (Svg, svg)
import Svg.Attributes

import Color exposing (Color)

import Material.Icons.Navigation as MaterialIcon
import Material.Icons.Content as MaterialIcon


icon : Int -> (Color.Color -> Int -> Svg msg) -> Html msg
icon size materialIcon =

    div
        [ css [ displayFlex, justifyContent center, alignItems center, minHeight <| pct 100 ] ]
        [ svg
            [ Svg.Attributes.width <| toString size, Svg.Attributes.height <| toString size]
            [ materialIcon Color.black size ]
            |> fromUnstyled
        ]


expand_more : Html msg
expand_more =
    icon 16 MaterialIcon.expand_more


clear : Html msg
clear =
    icon 12 MaterialIcon.clear