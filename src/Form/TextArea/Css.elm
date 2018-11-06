module Form.TextArea.Css exposing (input)

import Css exposing (..)
import Form.Css as Css
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


input : Bool -> Bool -> Attribute msg
input isError isLocked =
    css <|
        Css.select isError isLocked
            ++ [ flexGrow <| int 1
               , padding <| rem 0.4
               , cursor text_
               ]
