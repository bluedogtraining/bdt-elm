module Form.IntInput.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute, styled)
import Html.Styled.Attributes exposing (css)

import Form.Input.Css as InputCss


input : Bool -> Bool -> Attribute msg
input isError isLocked =

    InputCss.input isError isLocked