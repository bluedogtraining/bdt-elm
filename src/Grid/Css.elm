module Grid.Css exposing (col, colSize, container, containerWidth, containerWidths, defaultColSize, row)

import Css exposing (..)
import Css.Media as Media
import Grid.Size as Size exposing (..)
import Grid.SizeHelpers as SizeHelpers
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


container : Attribute msg
container =
    css <|
        containerWidths
            ++ [ maxWidth (pct 100)
               , boxSizing borderBox
               , paddingLeft <| px 15
               , paddingRight <| px 15
               , marginLeft auto
               , marginRight auto
               , fontFamilies [ "Arial" ]
               ]


containerWidths : List Style
containerWidths =
    [ width <| calc (pct 100) minus (Css.rem 2) ]
        ++ List.map containerWidth (List.reverse SizeHelpers.sizeAsList)


containerWidth : Size -> Style
containerWidth size =
    Media.withMedia
        [ Media.all [ Media.minWidth <| px (SizeHelpers.breakpointPxWidth size) ] ]
        [ width <| px (SizeHelpers.containerPxWidth size) ]


row : Attribute msg
row =
    css
        [ displayFlex
        , flexWrap wrap
        , marginLeft (px -15)
        , marginRight (px -15)
        ]


col : Cols -> List ( Size, Cols ) -> Attribute msg
col cols sizes =
    css <|
        List.map colSize (SizeHelpers.orderBySize sizes)
            ++ [ flexGrow <| num 1
               , paddingLeft <| px 15
               , paddingRight <| px 15
               , boxSizing borderBox
               , defaultColSize cols
               ]


defaultColSize : Cols -> Style
defaultColSize cols =
    Media.withMedia
        [ Media.all [] ]
        [ flexBasis <| pct (100 / 12 * SizeHelpers.colsToFloat cols)
        , maxWidth <| pct (100 / 12 * SizeHelpers.colsToFloat cols)
        ]


colSize : ( Size, Cols ) -> Style
colSize ( size, cols ) =
    Media.withMedia
        [ Media.all <| [ Media.minWidth <| px (SizeHelpers.breakpointPxWidth size) ] ]
        [ flexBasis <| pct (100 / 12 * SizeHelpers.colsToFloat cols)
        , maxWidth <| pct (100 / 12 * SizeHelpers.colsToFloat cols)
        ]
