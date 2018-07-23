module Toggle exposing
    ( view
    , isError, isDisabled, label
    , render
    )

{-| Module to add Toggles to your app

# Views
@docs view

# Configure
@docs isError, isDisabled, label

# Render
@docs render

-}

import Html.Styled exposing (..)
import Html.Styled.Events exposing (onClick)

import Html.Styled.Bdt exposing ((?))

import Toggle.Css as Css


type Toggle msg
    = Toggle (Config msg)


type alias Config msg =
    { isError : Bool
    , isDisabled : Bool
    , label : String
    , isToggled : Bool
    , toggleMsg : msg
    }


initialConfig : Bool -> msg -> Config msg
initialConfig toggled toggleMsg =
    { isError = False
    , isDisabled = False
    , label = ""
    , isToggled = toggled
    , toggleMsg = toggleMsg
    }


-- VIEW / SETTERS --


{-| Init a toggle
-}
view : Bool -> msg -> Toggle msg
view toggled msg =

    Toggle (initialConfig toggled msg)


{-| Display as loading, removing the click Msg
-}
isError : Bool -> Toggle msg -> Toggle msg
isError isError (Toggle config) =

    Toggle { config | isError = isError }


{-| Display as disabled, removing the click Msg
-}
isDisabled : Bool -> Toggle msg -> Toggle msg
isDisabled isDisabled (Toggle config) =

    Toggle { config | isDisabled = isDisabled }


{-| Set the text
-}
label : String -> Toggle msg -> Toggle msg
label label (Toggle config) =

    Toggle { config | label = label }


{-| Render the toggle
-}
render : Toggle msg -> Html msg
render (Toggle config) =

    div
        [ Css.labelContainer ]
        [ div
            [ Css.toggle config.isToggled config.isDisabled config.isError
            , onClick config.toggleMsg ? not config.isDisabled
            ]
            []
        , span
            [ Css.label ]
            [ text config.label ]
        ]