module Form.Input.Css exposing (input)

import Form.Css as Css
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


input : Bool -> Bool -> Attribute msg
input isError isLocked =
    css <| Css.input isError isLocked
