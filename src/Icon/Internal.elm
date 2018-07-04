module Icon.Internal exposing (render)

import Css exposing (displayFlex, justifyContent, center, alignItems, minHeight, pct)
import Html.Styled exposing (Html, div, fromUnstyled)
import Html.Styled.Attributes exposing (css)

import Svg exposing (Svg, svg)
import Svg.Attributes

import Color exposing (Color)

import Material.Icons.Navigation as MaterialIcon
import Material.Icons.Content as MaterialIcon
import Material.Icons.Toggle as MaterialIcon
import Material.Icons.Action as MaterialIcon

import Icon exposing (Icon (..))


render : Icon -> Int -> Color -> Html msg
render icon size color =

    case icon of
        ExpandMore ->
            renderIcon size color MaterialIcon.expand_more

        Clear ->
            renderIcon size color MaterialIcon.clear

        CheckBoxChecked ->
            renderIcon size color MaterialIcon.check_box

        CheckBoxUnchecked ->
            renderIcon size color MaterialIcon.check_box_outline_blank

        Calendar ->
            renderIcon size color MaterialIcon.perm_contact_calendar

        ChevronLeft ->
            renderIcon size color MaterialIcon.chevron_left

        ChevronRight ->
            renderIcon size color MaterialIcon.chevron_right


renderIcon : Int -> Color -> (Color -> Int -> Svg msg) -> Html msg
renderIcon size color materialIcon =

    div
        [ css [ displayFlex, justifyContent center, alignItems center, minHeight <| pct 100 ] ]
        [ svg
            [ Svg.Attributes.width <| toString size, Svg.Attributes.height <| toString size]
            [ materialIcon color size ]
            |> fromUnstyled
        ]