module Form.TextArea.Css exposing (input)

import Css exposing (..)
import Form.Css as Css
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


input : Bool -> Bool -> Bool -> Attribute msg
input isError isLocked shouldWrap =
    css <|
        [ boxSizing borderBox
        , border3 (px 1)
            solid
            (hex <|
                if isError && not isLocked then
                    "d9534f"

                else
                    "cccccc"
            )
        , width <| pct 100
        , maxWidth <| pct 100
        , height <| Css.rem 2
        , padding2 (Css.rem 0) (Css.rem 0.4)
        , margin2 (Css.rem 0.5) (Css.rem 0)
        , color <| hex "555555"
        , backgroundColor <|
            hex <|
                if isLocked then
                    "dddddd"

                else
                    "ffffff"
        , fontSize <| Css.rem 0.8
        , textOverflow ellipsis
        , overflowX hidden
        , focus
            [ outlineWidth (Css.rem 0)
            ]
        , displayFlex
        , cursor pointer
        , alignItems center
        , flexGrow <| int 1
        , padding <| rem 0.4
        , cursor text_
        ]




