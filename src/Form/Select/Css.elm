module Form.Select.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Form.Css as Css

import Css.Bdt exposing ((?))


container : Attribute msg
container =
    css
        [ position relative
        ]


input : Bool -> Bool -> Attribute msg
input isError isLocked =

    css <| Css.select isError isLocked


title : Attribute msg
title =
    css
        [ flexGrow <| int 1 ]


optionList : Attribute msg
optionList =
    css
        [ position absolute
        , top <| px 33
        , left <| px 0
        , right <| px 0
        , zIndex <| int 10
        , maxHeight <| px 200
        , overflowY scroll
        , border3 (px 1) solid (hex "dddddd")
        , padding <| px 0
        , backgroundColor <| hex "ffffff"
        ]


optionItem : Bool -> Bool -> Attribute msg
optionItem isDisabled isFocused =
    css
        [ padding2 (px 5) (px 10)
        , margin <| px 0
        , displayFlex
        , alignItems center
        , backgroundColor (hex "eceeef") ? isDisabled || isFocused
        , cursor pointer
        , outlineWidth <| px 0
        , hover
            [ backgroundColor (hex "f6f6f6") ? not isDisabled
            ]
        ]