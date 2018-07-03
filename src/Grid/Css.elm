module Grid.Css exposing (..)

import Css exposing (..)
import Css.Media as Media
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Grid.Size as Size exposing (..)


container : Attribute msg
container =
    css <|
        List.map containerWidth (List.reverse Size.asList)
        ++
        [ maxWidth (pct 100)
        , paddingLeft <| px 15
        , paddingRight <| px 15
        , position relative
        , marginLeft auto
        , marginRight auto
        , fontFamilies ["Arial"]
        ]


containerWidth : Size -> Style
containerWidth size =
    Media.withMedia
        [ Media.all [ Media.minWidth <| px (Size.breakpointWidth size) ] ]
        [ width <| px (Size.containerWidth size) ]


row : Attribute msg
row =
    css
        [ displayFlex
        , flexWrap wrap
        , marginLeft (px -15)
        , marginRight (px -15)
        ]


col : Cols -> List (Size, Cols) -> Attribute msg
col cols sizes =
    css <|
        List.map colSize (Size.orderBySize sizes)
        ++
        [ flexGrow <| num 1
        , paddingLeft <| px 15
        , paddingRight <| px 15
        , boxSizing borderBox
        , defaultColSize cols
        ]


defaultColSize : Cols -> Style
defaultColSize cols =

    Media.withMedia
        [ Media.all [] ]
        [ flexBasis <| pct (100 / 12 * (Size.colsToFloat cols))
        , maxWidth <| pct (100 / 12 * (Size.colsToFloat cols))
        ]


colSize : (Size, Cols) -> Style
colSize (size, cols) =

    Media.withMedia
        [ Media.all <| [ Media.minWidth <| px (breakpointWidth size) ] ]
        [ flexBasis <| pct (100 / 12 * (Size.colsToFloat cols))
        , maxWidth <| pct (100 / 12 * (Size.colsToFloat cols))
        ]