module Form.FloatInput.Css exposing (..)

import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Form.Css as Css


input : Bool -> Bool -> Attribute msg
input isError isLocked =

    css <| Css.input isError isLocked