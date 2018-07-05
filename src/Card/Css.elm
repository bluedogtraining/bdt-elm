module Card.Css exposing (..)

import Css exposing (..)
import Css.Media as Media
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Grid.Css
import Grid.Size as Size exposing (..)


card : Attribute msg
card =
    css
        [ backgroundColor <| hex "ffffff"
        , border3 (px 1) solid (hex "dfdfdf")
        , boxShadow4 (px 0) (px 1) (px 3) (rgba 0 0 0 0.12)
        , borderRadius <| px 2
        , color <| hex "4f4f4f"
        , marginBottom <| px 15
        ]


header : Attribute msg
header =
    css
        [ displayFlex
        , padding2 (px 12) (px 16)
        , borderBottom3 (px 1) solid (hex "ededed")
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
        ]


block : Cols -> List (Size, Cols) -> Attribute msg
block cols sizes =
    css <|
        List.map Grid.Css.colSize (Size.orderBySize sizes)
        ++
        [ flexGrow <| num 1
        , padding <| px 15
        , boxSizing borderBox
        , Grid.Css.defaultColSize cols
        ]