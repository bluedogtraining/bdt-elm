module Form.Input.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


input : Bool -> Bool -> Attribute msg
input isError isLocked =
    css
        [ boxSizing borderBox
        , border3 (px 1) solid (hex <| if isError && not isLocked then "d9534f" else "cccccc")
        , width <| pct 100
        , padding2 (px 6) (px 8)
        , color <| hex "555555"
        , backgroundColor <| hex <| if isLocked then "dddddd" else "ffffff"
        , marginTop <| px 4
        , marginBottom <| px 4
        , focus
            [ borderColor <| hex "67b8ed"
            , outlineWidth (px 0)
            ]
        ]