module Form.SearchSelect.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Colors


container : Attribute msg
container =
    css
        [ position relative
        ]


input : Bool -> Bool -> Attribute msg
input isError isLocked =
    css
        [ borderColor (if isError then Colors.error else hex "dddddd") |> important
        , backgroundColor (if isLocked then rgba 245 245 245 1 else rgba 255 255 255 1) |> important
        ]


infoMessageContainer : Attribute msg
infoMessageContainer =
    css
        [ padding2 (px 5) (px 10)
        , border3 (px 1) solid (hex "dddddd")
        , backgroundColor (hex "FFFFFF")
        , fontStyle italic
        , textAlign center
        , position absolute
        , top (px 37)
        , left (px 0)
        , right (px 0)
        , zIndex (int 1)
        ]


searchResultList : Attribute msg
searchResultList =
    css
        [ position absolute
        , top (px 37)
        , left (px 0)
        , right (px 0)
        , zIndex (int 1)
        , maxHeight (px 200)
        , overflowY scroll
        , border3 (px 1) solid (hex "ddd")
        , borderRightWidth (px 2) -- need 2px on the right because the scrolling thingy eats 1px
        , backgroundColor (hex "FFFFFF")
        , padding (px 0)
        ]


searchResultItem : Bool -> Attribute msg
searchResultItem hovered =
    css
        [ cursor pointer
        , padding2 (px 5) (px 10)
        , margin (px 0)
        , listStyleType none
        , if hovered then backgroundColor (hex "ddd") else backgroundColor (hex "fff")
        , hover
            [ backgroundColor (hex "f6f6f6")
            ]
        ]