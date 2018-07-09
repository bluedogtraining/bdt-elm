module Form.Css exposing (..)

import Css exposing (..)

import Css.Bdt exposing ((?))


input : Bool -> Bool -> List Style
input isError isLocked =

    [ boxSizing borderBox
    , border3 (px 1) solid (hex <| if isError && not isLocked then "d9534f" else "cccccc")
    , width <| pct 100
    , padding2 (px 6) (px 8)
    , margin2 (px 10) (px 0)
    , color <| hex "555555"
    , backgroundColor <| hex <| if isLocked then "dddddd" else "ffffff"
    , fontSize <| pt 12
    , focus
        [ outlineWidth (px 0)
        ]
    ]


select : Bool -> Bool -> List Style
select isError isLocked =

    input isError isLocked
    ++
    [ displayFlex
    , cursor pointer
    ]


selectOptionList : List Style
selectOptionList =

    [ position absolute
    , top <| px 31
    , left <| px 0
    , right <| px 0
    , zIndex <| int 10
    , maxHeight <| px 200
    , overflowY scroll
    , border3 (px 1) solid (hex "cccccc")
    , borderTopColor <| hex "eeeeee"
    , padding <| px 0
    , backgroundColor <| hex "ffffff"
    ]


selectOptionItem : Bool -> Bool -> List Style
selectOptionItem isDisabled isFocused =

    [ padding2 (px 8) (px 12)
    , margin <| px 0
    , displayFlex
    , alignItems center
    , backgroundColor (hex "f2f9fc") ? isDisabled || isFocused
    , cursor pointer
    , outlineWidth <| px 0
    , hover
        [ backgroundColor (hex "f2f9fc") ? not isDisabled
        ]
    ]