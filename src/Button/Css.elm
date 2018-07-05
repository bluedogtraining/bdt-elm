module Button.Css exposing (..)

import Css exposing (..)
import Color

import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Html.Styled.Bdt exposing ((?))

import Button.Content as Content exposing (Content)
import Button.Size as Size exposing (Size)


button : Size -> Content -> Color.Color -> Attribute msg
button size content color =

    css
        [ contentPadding size content
        , border (px 0)
        , backgroundColor transparent
        , fontWeight bold
        , Css.color <| Css.rgb (Color.toRgb color |> .red) (Color.toRgb color |> .green) (Color.toRgb color |> .blue)
        , lineHeight (Css.rem 1)
        , hover
            [ backgroundColor (lightenColor color)
            ]
        ]


contentPadding : Size -> Content -> Style
contentPadding size content =

    case content of

        Content.Text _ ->
            padding2 (Size.paddingY size) (Size.paddingX size)

        Content.Icon _ ->
            padding (Size.paddingY size)


lightenColor : Color.Color -> Css.Color
lightenColor color =
    color
        |> Color.toHsl
        |> (\color -> Color.hsl color.hue color.saturation (color.lightness + 0.45) )
        |> Color.toRgb
        |> (\color -> Css.rgb color.red color.green color.blue)
