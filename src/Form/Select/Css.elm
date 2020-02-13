module Form.Select.Css exposing (caret, container, contentEditableContainer, input, noFocus, optionItem, optionList, title)

import Css exposing (..)
import Form.Css as Css
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


container : Attribute msg
container =
    css
        [ position relative
        ]


caret : Attribute msg
caret =
    Css.caret


input : Bool -> Bool -> Attribute msg
input isError isLocked =
    css <| Css.select isError isLocked


contentEditableContainer : Attribute msg
contentEditableContainer =
    Css.contentEditableContainer


noFocus : Attribute msg
noFocus =
    Css.noFocus


title : Bool -> Attribute msg
title isFaded =
    css <| Css.title isFaded


optionList : Attribute msg
optionList =
    css Css.selectOptionList


optionItem : Bool -> Bool -> Attribute msg
optionItem isDisabled isFocused =
    css <| Css.selectOptionItem isDisabled isFocused
