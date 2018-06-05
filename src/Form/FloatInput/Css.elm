module Form.FloatInput.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Colors


inputField : Bool -> Bool -> Attribute msg
inputField isLocked isError =
    css
        [ backgroundColor (if isLocked then rgb 245 245 245 else rgb 255 255 255)
        , borderColor (if isError then Colors.error else hex "dddddd")
        ]