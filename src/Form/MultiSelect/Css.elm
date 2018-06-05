module Form.MultiSelect.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Colors


container : Attribute msg
container =
    css
        [ position relative
        ]


optionTextContainer : Bool -> Bool -> Attribute msg
optionTextContainer isLocked isError =
    css
        [ displayFlex
        , backgroundColor (if isLocked then rgb 245 245 245 else rgb 255 255 255)
        , borderColor (if isError then Colors.error else hex "dddddd")
        , cursor (if isLocked then notAllowed else pointer)
        ]


optionText : Attribute msg
optionText =
    css
        [ whiteSpace noWrap
        , display block
        , overflow hidden
        , textOverflow ellipsis
        ]


optionList : Attribute msg
optionList =
    css
        [ position absolute
        , top (px 37)
        , left (px 0)
        , right (px 0)
        , zIndex (int 10)
        , maxHeight (px 200)
        , overflowY scroll
        , border3 (px 1) solid (hex "ddd")
        , borderRightWidth (px 2) -- need 2px on the right because the scrolling thingy eats 1px
        , backgroundColor (hex "FFFFFF")
        , padding (px 0)
        ]


optionItem : Bool -> Bool -> Attribute msg
optionItem isDisabled isFocused =
    css
        [ padding2 (px 5) (px 10)
        , margin (px 0)
        , listStyleType none
        , cursor (if isDisabled then notAllowed else pointer)
        , backgroundColor (if isDisabled then hex "eceeef" else if not isDisabled && isFocused then hex "dddddd" else hex "ffffff")
        , hover
            [ backgroundColor (if not isDisabled then hex "f6f6f6" else hex "ffffff")
            ]
        ]