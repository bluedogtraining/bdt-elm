module Modal.Css exposing (..)

import Css exposing (..)
import Css.Foreign as Foreign
import Html.Styled exposing (Html, Attribute)
import Html.Styled.Attributes exposing (css)

import Grid.Css as Grid
import Grid.Size exposing (Size, Cols)
import Grid.SizeHelpers as SizeHelpers


removeBodyScroll : Html msg
removeBodyScroll =

    Foreign.global
         [ Foreign.body
            [ overflow hidden
            ]
         ]


background : Attribute msg
background =
    css
        [ backgroundColor <| rgba 0 0 0 0.4
        , position fixed
        , top <| px 0
        , right <| px 0
        , bottom <| px 0
        , left <| px 0
        , zIndex <| int 100
        ]


modal : Size -> Attribute msg
modal size =
    css <|
        Grid.containerWidths
        ++
        [ maxWidth <| px <| SizeHelpers.containerPxWidth size
        , position fixed
        , top <| Css.rem 3
        , left <| pct 50
        , transform <| translate <| pct -50
        , zIndex <| int 100
        , backgroundColor <| hex "ffffff"
        , borderRadius <| px 2
        , padding <| Css.rem 1
        , border3 (px 1) solid (hex "777777")
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
        , margin2 (Css.rem 0.8) (Css.rem 0)
        , maxHeight <| calc (vh 100) minus (Css.rem 13)
        , overflowY auto
        ]


block : Cols -> List (Size, Cols) -> Attribute msg
block cols sizes =
    css <|
        List.map Grid.colSize (SizeHelpers.orderBySize sizes)
        ++
        [ flexGrow <| num 1
        , padding2 (Css.rem 0.2) (Css.rem 0.8)
        , boxSizing borderBox
        , Grid.defaultColSize cols
        ]


footer : Attribute msg
footer =
    css
        [ displayFlex
        , justifyContent flexEnd
        , padding2 (Css.rem 0) (Css.rem 0.8)
        ]


closeIcon : Attribute msg
closeIcon =
    css
        [ position absolute
        , right <| Css.rem 1
        , top <| Css.rem 1
        , cursor pointer
        ]