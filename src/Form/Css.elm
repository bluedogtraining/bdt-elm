module Form.Css exposing (..)

import Css exposing (..)

import Css.Bdt exposing ((?))


input : Bool -> Bool -> List Style
input isError isLocked =

    [ boxSizing borderBox
    , border3 (px 1) solid (hex <| if isError && not isLocked then "d9534f" else "cccccc")
    , width <| pct 100
    , maxWidth <| pct 100
    , height <| Css.rem 2
    , padding2 (Css.rem 0) (Css.rem 0.4)
    , margin2 (Css.rem 0.5) (Css.rem 0)
    , color <| hex "555555"
    , backgroundColor <| hex <| if isLocked then "dddddd" else "ffffff"
    , fontSize <| Css.rem 0.8
    , focus
        [ outlineWidth (Css.rem 0)
        ]
    ]


select : Bool -> Bool -> List Style
select isError isLocked =

    input isError isLocked
    ++
    [ displayFlex
    , cursor pointer
    , alignItems center
    ]


title : Bool -> List Style
title isFaded =

    [ flexGrow <| int 1
    , color (rgb 111 111 111) ? isFaded
    , fontWeight (int 200) ? isFaded
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
    , backgroundColor (hex "f2f9fc") ? isDisabled || isFocused
    , cursor pointer
    , outlineWidth <| px 0
    , hover
        [ backgroundColor (hex "f2f9fc") ? not isDisabled
        ]
    ]