module Icon exposing (Icon (..), render)

{-| Module for Icons, using SVG (not relying on external css or fonts)

# Definition
@docs Icon

# Render icons
@docs Icon, render

-}

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
import Material.Icons.Image as MaterialIcon
import Material.Icons.File as MaterialIcon
import Material.Icons.Av as MaterialIcon
import Material.Icons.Alert as MaterialIcon


{-| Available Icons
-}
type Icon
    = ExpandMore
    | Clear
    | CheckBoxChecked
    | CheckBoxUnchecked
    | Calendar
    | ChevronLeft
    | ChevronRight
    | Spinner
    | Edit
    | Download
    | Delete
    | FastForward
    | FastRewind
    | SkipPrevious
    | SkipNext
    | Lock
    | LockOpen
    | Add
    | Warning


{-| Render an icon

    Icon.render Icon.Calendar Int Color.black
-}
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

        Spinner ->
            renderIcon size color MaterialIcon.autorenew

        Edit ->
            renderIcon size color MaterialIcon.edit

        Download ->
            renderIcon size color MaterialIcon.cloud_download

        Delete ->
            renderIcon size color MaterialIcon.delete

        FastForward ->
            renderIcon size color MaterialIcon.fast_forward

        FastRewind ->
            renderIcon size color MaterialIcon.fast_rewind

        SkipNext ->
            renderIcon size color MaterialIcon.skip_next

        SkipPrevious ->
            renderIcon size color MaterialIcon.skip_previous

        Lock ->
            renderIcon size color MaterialIcon.lock

        LockOpen ->
            renderIcon size color MaterialIcon.lock_open

        Add ->
            renderIcon size color MaterialIcon.add

        Warning ->
            renderIcon size color MaterialIcon.warning


renderIcon : Int -> Color -> (Color -> Int -> Svg msg) -> Html msg
renderIcon size color materialIcon =

    div
        [ css [ displayFlex, justifyContent center, alignItems center, minHeight <| pct 100 ] ]
        [ svg
            [ Svg.Attributes.width <| toString size, Svg.Attributes.height <| toString size]
            [ materialIcon color size ]
            |> fromUnstyled
        ]