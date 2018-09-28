module Button exposing
    ( Button
    , view, viewIf
    , text, icon, onClick, href, small, isLoading, isDisabled, green, red
    , render
    )

{-| Module to add Buttons to your app


# Type hint

@docs Button


# Initialise

@docs view, viewIf


# Configure

@docs text, icon, onClick, href, small, isLoading, isDisabled, green, red


# Render

@docs render

-}

import Content as Content exposing (..)
import Button.Css as Css
import Button.Size exposing (..)
import Css exposing (Color, rgb)
import FeatherIcons exposing (Icon)
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events as Html exposing (..)



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
    , url : String
    , isLoading : Bool
    , isDisabled : Bool
    }


initialConfig : Config msg
initialConfig =
    { isShown = True
    , size = Normal
    , content = Text ""
    , color = rgb 102 102 102
    , onClick = Nothing
    , url = ""
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
text text_ (Button config) =
    Button { config | content = Text text_ }


{-| Set an icon
-}
icon : Icon -> Button msg -> Button msg
icon icon_ (Button config) =
    Button { config | content = Icon icon_ }


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


{-| Open a href url when clicked
-}
href : String -> Button msg -> Button msg
href url (Button config) =
    Button { config | url = url }


{-| Display as loading, removing the click Msg
-}
isLoading : Bool -> Button msg -> Button msg
isLoading isLoading_ (Button config) =
    Button { config | isLoading = isLoading_ }


{-| Display as disabled, removing the click Msg
-}
isDisabled : Bool -> Button msg -> Button msg
isDisabled isDisabled_ (Button config) =
    Button { config | isDisabled = isDisabled_ }


{-| Style it green
-}
green : Button msg -> Button msg
green (Button config) =
    Button { config | color = rgb 81 163 81 }


{-| Style it red
-}
red : Button msg -> Button msg
red (Button config) =
    Button { config | color = rgb 189 54 47 }


{-| Render the button
-}
render : Button msg -> Html msg
render (Button config) =

    case String.isEmpty config.url of

        True ->
            button
                [ Css.button config.size config.content config.color config.isDisabled config.isLoading
                , Html.maybeAttribute Html.onClick config.onClick |> Html.attributeIf (not config.isDisabled)
                ]
                [ Css.spinKeyFrames
                , content config.content config.size config.color config.isLoading
                ]

        False ->
            a
                [ Css.button config.size config.content config.color config.isDisabled config.isLoading
                , Html.maybeAttribute Html.onClick config.onClick |> Html.attributeIf (not config.isDisabled)
                , Attributes.href config.url |> Html.attributeIf (not <| String.isEmpty config.url)
                , target "_blank" |> Html.attributeIf (not <| String.isEmpty config.url)
                ]
                [ Css.spinKeyFrames
                , content config.content config.size config.color config.isLoading
                ]


content : Content -> Size -> Color -> Bool -> Html msg
content content_ size color isLoading_ =
    case ( content_, isLoading_ ) of
        ( Text string, False ) ->
            Html.text string

        ( Text string, True ) ->
            div
                [ Css.loadingTextContainer ]
                [ div
                    [ Css.loading (iconSize size)]
                    [ FeatherIcons.refreshCw |> FeatherIcons.withSize (iconSize size) |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]
                , div
                    [ Css.loadingText ]
                    [ Html.text string ]
                ]

        ( Icon icon_, False ) ->
            icon_ |> FeatherIcons.withSize (iconSize size) |> FeatherIcons.toHtml [] |> Html.fromUnstyled

        ( Icon _, True ) ->
            div
                [ Css.loading (iconSize size) ]
                [ FeatherIcons.refreshCw |> FeatherIcons.withSize (iconSize size) |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]


iconSize : Size -> Float
iconSize size =
    case size of
        Small ->
            14

        Normal ->
            18
