module Toggle exposing (view, viewWithLabel)

import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (css)
import Html.Styled.Events exposing (..)

import Css exposing (..)
import Css.Transitions as Transitions exposing (transition)


view : Bool -> msg -> Html msg
view toggle msg =

    div
        [ switch toggle
        , onClick msg
        ]
        []


viewWithLabel : String -> Bool -> msg -> Html msg
viewWithLabel string toggle msg =

    div
        [ css
            [ display inlineFlex
            , alignItems center
            ]
        ]
        [ view toggle msg
        , span
            [ css
                [ marginLeft <| px 5 ]
            ]
            [ text string ]
        ]


switch : Bool -> Attribute msg
switch toggle =
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