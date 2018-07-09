module Form.SearchSelect.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Form.Css as Css


container : Attribute msg
container =

    css
        [ position relative
        ]


input : Bool -> Bool -> Attribute msg
input isError isLocked =

    css <| Css.input isError isLocked


title : Attribute msg
title =

    css
        [ flexGrow <| int 1 ]


optionList : Attribute msg
optionList =

    css <|
        Css.selectOptionList
        ++
        [ top <| px 35
        ]


optionItem : Bool -> Attribute msg
optionItem isFocused =

    css <| Css.selectOptionItem False isFocused


infoMessage : Attribute msg
infoMessage =

    css
        [ border3 (px 1) solid (hex "dddddd")
        , padding2 (px 8) (px 12)
        , displayFlex
        , alignItems center
        , justifyContent center
        , position absolute
        , top <| px 35
        , left <| px 0
        , right <| px 0
        , zIndex <| int 10
        , backgroundColor <| hex "ffffff"
        ]