module Toggle.Css exposing (..)

import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Css exposing (..)
import Css.Transitions as Transitions exposing (transition)


toggle : Bool -> Attribute msg
toggle toggle =
    css
        [ position relative
        , display inlineBlock
        , cursor pointer
        , width <| Css.rem 3
        , height <| Css.rem 1.5
        , boxSizing borderBox
        , backgroundColor (if toggle then rgb 81 163 81 else hex "ddd")
        , border3 (px 1) solid (if toggle then rgb 81 163 81 else hex "ddd")
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
            , backgroundColor (if toggle then hex "8ce196" else hex "f1f1f1")
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
            , backgroundColor <| hex "fff"
            , borderRadius <| Css.rem 1.3
            , boxShadow4 (px 0) (px 2) (px 5) (rgba 0 0 0 0.3)
            , transition
                [ Transitions.margin 400
                ]
            , marginLeft (if toggle then Css.rem 1.45 else Css.rem 0.05)
            ]
        ]


labelContainer : Attribute msg
labelContainer =
    css
        [ display inlineFlex
        , alignItems center
        ]


label : Attribute msg
label =
    css
        [ marginLeft <| px 5 ]