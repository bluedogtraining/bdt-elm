module Button.Css exposing (button, buttonHeight, buttonPadding, buttonWidth, lightenColor, loading, loadingText, loadingTextContainer, spinKeyFrames)

import Button.Size exposing (Size(..))
import Content exposing (Content(..))
import Css exposing (..)
import Css.Global exposing (..)
import Css.Transitions as Transitions exposing (transition)
import Html.Styled exposing (Attribute, Html)
import Html.Styled.Attributes exposing (css)


button : Size -> Content -> Color -> Bool -> Bool -> Attribute msg
button size content color isDisabled isLoading =
    css
        [ border3 (px 1) solid (rgba color.red color.green color.blue 0.2)
        , borderRadius (px 2)
        , backgroundColor transparent
        , Css.color color |> important
        , display inlineFlex
        , justifyContent center
        , alignItems center
        , outlineWidth <| px 0
        , cursor <|
            if isDisabled || isLoading then
                notAllowed

            else
                pointer
        , opacity <|
            if isDisabled then
                num 0.4

            else
                num 1
        , height <| buttonHeight size
        , buttonWidth content size
        , padding2 (px 0) (buttonPadding content size)
        , boxSizing borderBox
        , margin2 (px 0) (Css.rem 0.2)
        , fontSize <| Css.rem 0.8
        , verticalAlign middle
        , textDecoration none |> important
        , property "user-select" "none"
        , whiteSpace noWrap
        , overflow hidden
        , hover
            [ backgroundColor <| lightenColor color
            ]
        ]


buttonHeight : Size -> Rem
buttonHeight size =
    case size of
        Small ->
            Css.rem 1.4

        Normal ->
            Css.rem 1.8


buttonWidth : Content -> Size -> Style
buttonWidth content size =
    case ( content, size ) of
        ( Icon _, Small ) ->
            width <| Css.rem 1.4

        ( Icon _, Normal ) ->
            width <| Css.rem 1.8

        _ ->
            width <| auto


buttonPadding : Content -> Size -> Rem
buttonPadding content size =
    case ( content, size ) of
        ( Text _, Small ) ->
            Css.rem 0.5

        ( Text _, Normal ) ->
            Css.rem 0.8

        _ ->
            Css.rem 0


lightenColor : Color -> Color
lightenColor color =
    rgba color.red color.green color.blue 0.2



-- @todo: I would like to change the color itself, not just set a lighter alpha


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


loading : Float -> Attribute msg
loading size =
    css
        [ property "animation" "spin 1.5s linear infinite"
        , height (px size)
        ]


spinKeyFrames : Html msg
spinKeyFrames =
    global
        [ selector "@keyframes spin"
            [ property "0% { transform" "rotate(0deg); } 100% { transform: rotate(360deg); }" ]
        ]
