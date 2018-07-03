module Form.Css exposing (..)

import Css exposing (..)


input : Bool -> Bool -> List Style
input isError isLocked =

    [ boxSizing borderBox
    , border3 (px 1) solid (hex <| if isError && not isLocked then "d9534f" else "cccccc")
    , width <| pct 100
    , padding2 (px 6) (px 8)
    , color <| hex "555555"
    , backgroundColor <| hex <| if isLocked then "dddddd" else "ffffff"
    , marginTop <| px 4
    , marginBottom <| px 4
    , fontSize <| pt 12
    , focus
        [ borderColor <| hex "67b8ed"
        , outlineWidth (px 0)
        ]
    ]


select : Bool -> Bool -> List Style
select isError isLocked =

    input isError isLocked
    ++
    [ displayFlex
    , cursor pointer
    ]