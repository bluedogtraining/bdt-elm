module Button.Content exposing (Content(..), view)

import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)

import Color exposing (Color)

import Icon exposing (Icon)
import Icon.Internal as Icon

import Button.Size as Size exposing (Size)


type Content
    = Icon Icon
    | Text String


view : Content -> Size -> Color -> Html msg
view content size color =

    case content of

        Text string ->
            Html.text string

        Icon icon ->
            Icon.render icon (Size.icon size) color