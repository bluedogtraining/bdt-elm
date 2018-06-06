module Styles exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Msg exposing (Msg)


content : Attribute Msg
content =
    css
        [ padding2 (px 40) (px 200) ]