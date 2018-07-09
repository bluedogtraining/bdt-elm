module Button.Css exposing (..)

import Css exposing (..)
import Css.Foreign exposing (..)
import Css.Transitions as Transitions exposing (transition)

import Html.Styled exposing (Html, Attribute)
import Html.Styled.Attributes exposing (css)

import Color

import Html.Styled.Bdt exposing ((?))

import Button.Content exposing (Content (..))
import Button.Size exposing (Size (..))


button : Size -> Content -> Color.Color -> Bool -> Bool -> Attribute msg
button size content color isDisabled isLoading =

    css
        [ border (px 0)
        , border3 (px 1) solid (Css.rgba (Color.toRgb color |> .red) (Color.toRgb color |> .green) (Color.toRgb color |> .blue) 0.2)
        , borderRadius (px 2)
        , backgroundColor transparent
        , fontWeight bold
        , Css.color <| Css.rgb (Color.toRgb color |> .red) (Color.toRgb color |> .green) (Color.toRgb color |> .blue)
        , displayFlex
        , justifyContent center
        , alignItems center
        , display inlineBlock
        , outlineWidth <| px 0
        , cursor <| if isDisabled || isLoading then notAllowed else pointer
        , height <| buttonHeight size
        , buttonWidth content size
        , padding2 (px 0) (buttonPadding content size)
        , margin2 (px 0) (Css.rem 0.2)
        , fontSize <| Css.rem 0.8
        , verticalAlign middle
        , hover
            [ backgroundColor (lightenColor color)
            ]
        ]


buttonHeight : Size -> Rem
buttonHeight size =

    case size of
        Small -> Css.rem 1.4
        Normal -> Css.rem 1.8


buttonWidth : Content -> Size -> Style
buttonWidth content size =

    case (content, size) of
        (Icon _, Small) -> width <| Css.rem 1.4
        (Icon _, Normal) -> width <| Css.rem 1.8
        _ -> width <| auto


buttonPadding : Content -> Size -> Rem
buttonPadding content size =

    case (content, size) of
        (Text _, Small) -> Css.rem 0.3
        (Text _, Normal) -> Css.rem 0.8
        _ -> Css.rem 0


lightenColor : Color.Color -> Css.Color
lightenColor color =
    color
        |> Color.toHsl
        |> (\color -> Color.hsl color.hue color.saturation (color.lightness + 0.45))
        |> Color.toRgb
        |> (\color -> Css.rgb color.red color.green color.blue)


loadingTextContainer : Attribute msg
loadingTextContainer =

    css
        [ displayFlex
        , alignItems center
        , justifyContent center
        ]


loadingText : Attribute msg
loadingText =

    css
        [ marginLeft <| Css.rem 0.25
        ]


-- Hacky stuff below, @todo: fix it up once this is ready: https://github.com/rtfeldman/elm-css/issues/431


loading : Attribute msg
loading =
    css
        [ property "animation" "spin 1.5s linear infinite"
        ]


spinKeyFrames : Html msg
spinKeyFrames =

    global
         [ selector "@keyframes spin"
             [ property "0% { transform" "rotate(0deg); } 100% { transform: rotate(360deg); }" ]
         ]