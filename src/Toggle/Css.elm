module Toggle.Css exposing (..)

import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Css exposing (..)
import Css.Transitions as Transitions exposing (transition)


toggle : Bool -> Bool -> Bool -> Attribute msg
toggle toggle_ isDisabled isError =
    css
        [ position relative
        , display inlineBlock
        , cursor <| if isDisabled then notAllowed else pointer
        , width <| Css.rem 3
        , height <| Css.rem 1.5
        , boxSizing borderBox
        , backgroundColor <| toggleColor toggle_ isDisabled isError
        , border3 (px 1) solid (toggleColor toggle_ isDisabled isError)
        , borderRadius <| Css.rem 1.5
        , transition
            [ Transitions.backgroundColor 400
            , Transitions.borderColor 400
            ]
        , before
            [ display block
            , position absolute
            , top <| px 1
            , right <| px 1
            , left <| px 1
            , bottom <| px 1
            , property "content" ""
            , backgroundColor (if toggle_ then hex "8ce196" else hex "f1f1f1")
            , borderRadius <| Css.rem 1.3
            ]
        , after
            [ display block
            , position absolute
            , top <| px 1
            , left <| px 1
            , bottom <| px 1
            , property "content" "''"
            , width <| Css.rem 1.3
            , backgroundColor <| if isDisabled then hex "eee" else hex "fff"
            , borderRadius <| Css.rem 1.3
            , boxShadow4 (px 0) (px 2) (px 5) (rgba 0 0 0 0.3)
            , transition
                [ Transitions.margin 400
                ]
            , marginLeft (if toggle_ then Css.rem 1.45 else Css.rem 0)
            ]
        ]


toggleColor : Bool -> Bool -> Bool -> Color
toggleColor toggle_ isDisabled isError =

    case (toggle_, isDisabled, isError) of

        (True, False, False) ->
            rgb 81 163 81

        (False, False, False) ->
            hex "ddd"

        (_, False, True) ->
            rgb 163 81 81

        (_, True, _) ->
            hex "efefef"


labelContainer : Attribute msg
labelContainer =
    css
        [ display inlineFlex
        , alignItems center
        ]


label : Attribute msg
label =
    css
        [ fontFamilies
            [ "-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif" ]
        , fontWeight <| int 100
        , color <| Css.rgb 111 111 111
        , marginLeft <| px 5
        ]