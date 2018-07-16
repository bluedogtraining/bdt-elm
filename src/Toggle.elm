module Toggle exposing (view, viewWithLabel)

{-| Module to add Toggles to your app

# Views
@docs view, viewWithLabel

-}

import Html.Styled exposing (..)
import Html.Styled.Events exposing (onClick)

import Toggle.Css as Css


{-| Simple toggle view. Give it a Bool (on/off) and a Msg to fire onClick.
-}
view : Bool -> msg -> Html msg
view state msg =

    div
        [ Css.toggle state
        , onClick msg
        ]
        []


{-| Toggle view with a Label. Give it a Label, Bool (on/off) and a Msg to fire onClick.
-}
viewWithLabel : String -> Bool -> msg -> Html msg
viewWithLabel string toggle msg =

    div
        [ Css.labelContainer ]
        [ view toggle msg
        , span
            [ Css.label ]
            [ text string ]
        ]