module Card.Css exposing (block, body, card, footer, header, headerTitle)

import Css exposing (..)
import Css.Media as Media
import Grid.Css
import Grid.Size as Size exposing (..)
import Grid.SizeHelpers as SizeHelpers
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


card : Attribute msg
card =
    css
        [ backgroundColor <| hex "ffffff"
        , border3 (px 1) solid (hex "cccccc")
        , borderRadius <| px 2
        , color <| hex "4f4f4f"
        , marginBottom <| Css.rem 0.8
        , padding2 (Css.rem 0.8) (Css.rem 0)
        ]


header : Attribute msg
header =
    css
        [ displayFlex
        , justifyContent spaceBetween
        , alignItems center
        , padding2 (Css.rem 0) (Css.rem 0.8)
        , fontFamilies
            [ "-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif" ]
        , fontSize <| Css.rem 1.2
        , fontWeight <| int 600
        ]


headerTitle : Attribute msg
headerTitle =
    css
        [ displayFlex
        , flexGrow <| int 1
        ]


body : Attribute msg
body =
    css
        [ displayFlex
        , flexWrap wrap
        , padding2 (Css.rem 0.8) (Css.rem 0)
        ]


block : Cols -> List ( Size, Cols ) -> Attribute msg
block cols sizes =
    css <|
        List.map Grid.Css.colSize (SizeHelpers.orderBySize sizes)
            ++ [ flexGrow <| num 1
               , padding2 (Css.rem 0.2) (Css.rem 0.8)
               , boxSizing borderBox
               , Grid.Css.defaultColSize cols
               ]


footer : Attribute msg
footer =
    css
        [ displayFlex
        , justifyContent flexEnd
        , padding2 (Css.rem 0) (Css.rem 0.8)
        ]
