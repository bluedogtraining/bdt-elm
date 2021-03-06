module Form.MultiSelect.Css exposing (caret, checkBox, container, contentEditableContainer, groupDivider, input, inputLabelSpan, noFocus, optGroupLabel, optionItem, optionList, title)

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


inputLabelSpan : Attribute msg
inputLabelSpan =
    Css.inputLabelSpan


caret : Attribute msg
caret =
    Css.caret


contentEditableContainer : Attribute msg
contentEditableContainer =
    Css.contentEditableContainer


noFocus : Attribute msg
noFocus =
    Css.noFocus


title : Bool -> Attribute msg
title isFaded =
    css <| Css.title isFaded


groupDivider : Attribute msg
groupDivider =
    css
        [ margin <| px 0
        , important <| border3 (px 1) solid (hex "eeeeee")
        ]


optionList : Attribute msg
optionList =
    css Css.selectOptionList


optGroupLabel : Attribute msg
optGroupLabel =
    css
        [ marginTop <| px 6
        , marginLeft <| px 6
        , fontSize <| px 10
        , color <| rgb 111 111 111
        , textTransform uppercase
        ]


optionItem : Bool -> Bool -> Attribute msg
optionItem isDisabled isFocused =
    css <| Css.selectOptionItem isDisabled isFocused


checkBox : Attribute msg
checkBox =
    css
        [ marginRight <| px 6
        , displayFlex
        ]
