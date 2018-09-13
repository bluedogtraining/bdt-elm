module Form.MultiSelect.Css exposing (checkBox, container, input, optionItem, optionList, title)

import Css exposing (..)
import Form.Css as Css
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


container : Attribute msg
container =
    css
        [ position relative
        ]


input : Bool -> Bool -> Attribute msg
input isError isLocked =
    css <| Css.select isError isLocked


title : Bool -> Attribute msg
title isFaded =
    css <| Css.title isFaded


optionList : Attribute msg
optionList =
    css Css.selectOptionList


optionItem : Bool -> Bool -> Attribute msg
optionItem isDisabled isFocused =
    css <| Css.selectOptionItem isDisabled isFocused


checkBox : Attribute msg
checkBox =
    css
        [ marginRight <| px 6
        , displayFlex
        ]
