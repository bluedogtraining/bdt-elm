module Toasters.Css exposing (absoluteContainer, fixedContainer, relativeContainer, timerBar, timerColor, toaster, toasterBackgroundColor, toasterMessage)

import Css exposing (..)
import Css.Transitions as Transitions exposing (transition)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)
import Time
import Toasters.Color


relativeContainer : Attribute msg
relativeContainer =
    css
        [ position relative
        ]


absoluteContainer : Attribute msg
absoluteContainer =
    css
        [ position absolute
        , right <| px 320
        , top <| px 20
        ]


fixedContainer : Attribute msg
fixedContainer =
    css
        [ position fixed
        , zIndex <| int 101
        ]


toaster : Toasters.Color.Color -> Int -> Attribute msg
toaster toasterColor ticks =
    css
        [ backgroundColor <| toasterBackgroundColor toasterColor
        , borderRadius <| px 2
        , width <| px 300
        , marginBottom <| px 10
        , boxSizing borderBox
        , cursor pointer
        , opacity <|
            if ticks < 3 || ticks > 97 then
                int 0

            else
                int 1
        , transition
            [ Transitions.opacity <|
                if ticks < 3 then
                    0

                else
                    600
            ]
        , boxShadow4 (px 0) (px 8) (px 16) (rgba 0 0 0 0.3)
        ]


toasterMessage : Attribute msg
toasterMessage =
    css
        [ color <| hex "ffffff"
        , padding2 (px 15) (px 25)
        , fontFamilies [ "Arial" ]
        ]


timerBar : Toasters.Color.Color -> Int -> Attribute msg
timerBar toasterColor ticks =
    css
        [ backgroundColor <| timerColor toasterColor
        , width <| pct <| toFloat (101 - ticks)
        , height <| px 4
        , borderBottomLeftRadius <| px 2
        ]


toasterBackgroundColor : Toasters.Color.Color -> Color
toasterBackgroundColor toasterColor =
    case toasterColor of
        Toasters.Color.Green ->
            hex "51a351"

        Toasters.Color.Red ->
            hex "bd362f"


timerColor : Toasters.Color.Color -> Color
timerColor toasterColor =
    case toasterColor of
        Toasters.Color.Green ->
            hex "387238"

        Toasters.Color.Red ->
            hex "842520"
