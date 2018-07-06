module Button exposing
    ( Button
    , view, viewIf, render
    , text, icon, onClick, small
    , isLoading, isDisabled
    , green, red
    )

{-| Module to add Buttons to your app

# Type hint
@docs Button

# Initialise
@docs view, viewIf

# Configure
@docs text, icon, onClick, small, isLoading, isDisabled, green, red

# Render
@docs render

-}

import Html.Styled as Html exposing (..)
import Html.Styled.Events as Html exposing (..)
import Html.Styled.Attributes as Html exposing (..)

import Html.Styled.Bdt exposing (..)

import Color exposing (Color)

import Icon exposing (Icon)

import Button.Content as Content exposing (..)
import Button.Size exposing (..)
import Button.Css as Css


-- CONFIG --


{-| Type hint buttons

    type alias model =
        { headerTitle : String
        , headerButtons : List (Button Msg)
        }
-}
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


{-| Init a button
-}
view : Button msg
view =

    Button initialConfig


{-| Init a button if True
-}
viewIf : Bool -> Button msg
viewIf isShown =

    Button { initialConfig | isShown = isShown }


{-| Set the text
-}
text : String -> Button msg -> Button msg
text text (Button config) =

    Button { config | content = Text text }


{-| Set an icon
-}
icon : Icon -> Button msg -> Button msg
icon icon (Button config) =

    Button { config | content = Icon icon }


{-| Make the button small
-}
small : Button msg -> Button msg
small (Button config) =

    Button { config | size = Small }


{-| Fire a Msg when clicked
-}
onClick : msg -> Button msg -> Button msg
onClick msg (Button config) =

    Button { config | onClick = Just msg }


{-| Display as loading, removing the click Msg
-}
isLoading : Bool -> Button msg -> Button msg
isLoading isLoading (Button config) =

    Button { config | isLoading = isLoading }


{-| Display as disabled, removing the click Msg
-}
isDisabled : Bool -> Button msg -> Button msg
isDisabled isDisabled (Button config) =

    Button { config | isDisabled = isDisabled }


{-| Style it green
-}
green : Button msg -> Button msg
green (Button config) =

    Button { config | color = Color.rgb 81 163 81 }


{-| Style it red
-}
red : Button msg -> Button msg
red (Button config) =

    Button { config | color = Color.rgb 189 54 47 }


{-| Render the button
-}
render : Button msg -> Html msg
render (Button config) =

    button
        [ Css.button config.size config.content config.color config.isDisabled config.isLoading
        , maybeAttribute Html.onClick config.onClick
        ]
        [ Css.spinKeyFrames
        , content config.content config.size config.color config.isLoading
        ]


content : Content -> Size -> Color -> Bool -> Html msg
content content size color isLoading =

    case (content, isLoading) of
        (Text string, False) ->
            Html.text string

        (Text string, True) ->
            div
                [ Css.loadingTextContainer ]
                [ div
                    [ Css.loading ]
                    [ Icon.render Icon.Spinner (iconSize size) color ]
                , div
                    [ Css.loadingText ]
                    [ Html.text string ]
                ]

        (Icon icon, False) ->
            Icon.render icon (iconSize size) color

        (Icon icon, True) ->
            div
                [ Css.loading ]
                [ Icon.render Icon.Spinner (iconSize size) color ]


iconSize : Size -> Int
iconSize size =

    case size of
        Small -> 14
        Normal -> 18