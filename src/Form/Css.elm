module Form.Css exposing (clearIcon, input, select, selectOptionItem, selectOptionList, title)

import Css exposing (..)
import Css.Bdt as Css
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


input : Bool -> Bool -> List Style
input isError isLocked =
    [ boxSizing borderBox
    , border3 (px 1)
        solid
        (hex <|
            if isError && not isLocked then
                "d9534f"

            else
                "cccccc"
        )
    , width <| pct 100
    , maxWidth <| pct 100
    , height <| Css.rem 2
    , padding2 (Css.rem 0) (Css.rem 0.4)
    , margin2 (Css.rem 0.5) (Css.rem 0)
    , color <| hex "555555"
    , backgroundColor <|
        hex <|
            if isLocked then
                "dddddd"

            else
                "ffffff"
    , fontSize <| Css.rem 0.8
    , whiteSpace noWrap
    , textOverflow ellipsis
    , overflowX hidden
    , focus
        [ outlineWidth (Css.rem 0)
        ]
    ]


select : Bool -> Bool -> List Style
select isError isLocked =
    input isError isLocked
        ++ [ displayFlex
           , cursor pointer
           , alignItems center
           ]


title : Bool -> List Style
title isFaded =
    [ flexGrow <| int 1
    , color (rgb 111 111 111) |> Css.styleIf isFaded
    , fontWeight (int 200) |> Css.styleIf isFaded
    , fontFamilies
        [ "-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif" ]
    , whiteSpace noWrap
    , textOverflow ellipsis
    , overflowX hidden
    , maxWidth <| pct 100
    ]


selectOptionList : List Style
selectOptionList =
    [ position absolute
    , top <| px 31
    , left <| px 0
    , right <| px 0
    , zIndex <| int 10
    , maxHeight <| px 200
    , overflowY auto
    , border3 (px 1) solid (hex "cccccc")
    , borderTopColor <| hex "eeeeee"
    , padding <| px 0
    , backgroundColor <| hex "ffffff"
    ]


selectOptionItem : Bool -> Bool -> List Style
selectOptionItem isDisabled isFocused =
    [ padding2 (Css.rem 0) (Css.rem 0.4)
    , margin <| px 0
    , boxSizing borderBox
    , height <| Css.rem 2
    , displayFlex
    , alignItems center
    , backgroundColor (hex "f2f9fc") |> Css.styleIf isFocused
    , backgroundColor (hex "eeeeee") |> Css.styleIf isDisabled
    , cursor pointer
    , cursor notAllowed |> Css.styleIf isDisabled
    , outlineWidth <| px 0
    , overflowX hidden
    , whiteSpace noWrap
    , textOverflow ellipsis
    , maxWidth <| pct 100
    , hover
        [ backgroundColor (hex "f2f9fc") |> Css.styleIf (not isDisabled)
        ]
    ]


clearIcon : Attribute msg
clearIcon =
    css
        [ displayFlex
        ]
