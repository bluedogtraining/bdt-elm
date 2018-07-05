module Button exposing
    ( Button
    , view, viewIf, render
    , text, icon, onClick, small
    , isLoading, isDisabled
    , green
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Events as Html exposing (..)
import Html.Styled.Attributes as Html exposing (..)

import Html.Styled.Bdt exposing (..)

import Css

import Color exposing (Color)

import Icon exposing (Icon)
import Icon.Internal as Icon

import Button.Content as Content exposing (..)
import Button.Size exposing (..)
import Button.Css as Css


-- CONFIG --


type Button msg
    = Button (Config msg)


type alias Config msg =
    { isShown : Bool
    , size : Size
    , content : Content
    , color : Color
    , onClick : Maybe msg
    , isLoading : Bool
    , isDisabled : Bool
    }


initialConfig : Config msg
initialConfig =
    { isShown = True
    , size = Normal
    , content = Text ""
    , color = Color.rgb 102 102 102
    , onClick = Nothing
    , isLoading = False
    , isDisabled = False
    }


-- VIEW / SETTERS --


view : Button msg
view =

    Button initialConfig


viewIf : Bool -> Button msg
viewIf isShown =

    Button { initialConfig | isShown = isShown }


text : String -> Button msg -> Button msg
text text (Button config) =

    Button { config | content = Text text }


icon : Icon -> Button msg -> Button msg
icon icon (Button config) =

    Button { config | content = Icon icon }


small : Button msg -> Button msg
small (Button config) =

    Button { config | size = Small }


onClick : msg -> Button msg -> Button msg
onClick msg (Button config) =

    Button { config | onClick = Just msg }


isLoading : Bool -> Button msg -> Button msg
isLoading isLoading (Button config) =

    Button { config | isLoading = isLoading }


isDisabled : Bool -> Button msg -> Button msg
isDisabled isDisabled (Button config) =

    Button { config | isDisabled = isDisabled }


green : Button msg -> Button msg
green (Button config) =

    Button { config | color = Color.rgb 40 167 69 }


-- RENDER --


render : Button msg -> Html msg
render (Button config) =

    button
        [ Css.button config.size config.content config.color
        ]
        [ Content.view config.content config.size config.color
        ]