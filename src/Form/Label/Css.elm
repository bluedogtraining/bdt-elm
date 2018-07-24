module Form.Label.Css exposing (label, mandatory)

import Css exposing (..)

import Html.Styled exposing (Html, Attribute)
import Html.Styled.Attributes exposing (css)


label : Attribute msg
label =

    css
        [ fontFamilies
            [ "-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif" ]
        , fontWeight <| int 100
        , color <| Css.rgb 111 111 111
        , marginBottom <| px 0
        ]


mandatory : Attribute msg
mandatory =

    css
        [ Css.color <| Css.rgb 189 54 47
        , display inlineFlex
        , marginLeft <| px 5
        ]