module Button exposing
    ( Button
    , view, viewIf, render
    , primary, success, danger
    , text, icon, onClick, small
    , isLoading, isDisabled
    , class
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Events as Html exposing (..)
import Html.Styled.Attributes as Html exposing (..)

import Html.Styled.Bdt exposing (..)


-- CONFIG --


type Button msg
    = Button (Config msg)


type Context
    = Default
    | Primary
    | Success
    | Danger


type Size
    = Small
    | Normal


type Elevation
    = Flat
    | Raised


type alias Config msg =
    { isShown : Bool
    , context : Context
    , size : Size
    , elevation : Elevation
    , text : Maybe String
    , icon : Maybe String
    , onClick : Maybe msg
    , isLoading : Bool
    , isDisabled : Bool
    , class : String
    }


initialConfig : Config msg
initialConfig =
    { isShown = True
    , context = Primary
    , size = Normal
    , elevation = Flat
    , text  = Nothing
    , icon = Nothing
    , onClick = Nothing
    , isLoading = False
    , isDisabled = False
    , class = ""
    }


-- VIEW / SETTERS --


view : Button msg
view =

    Button initialConfig


viewIf : Bool -> Button msg
viewIf isShown =

    Button { initialConfig | isShown = isShown }


primary : Button msg -> Button msg
primary (Button config) =

    Button { config | context = Primary }


success : Button msg -> Button msg
success (Button config) =

    Button { config | context = Success }


danger : Button msg -> Button msg
danger (Button config) =

    Button { config | context = Danger }


text : String -> Button msg -> Button msg
text text (Button config) =

    Button { config | text = Just text }


icon : String -> Button msg -> Button msg
icon icon (Button config) =

    Button { config | icon = Just icon }


small : Button msg -> Button msg
small (Button config) =

    Button { config | size = Small }


raised : Button msg -> Button msg
raised (Button config) =

    Button { config | elevation = Raised }


onClick : msg -> Button msg -> Button msg
onClick msg (Button config) =

    Button { config | onClick = Just msg }


isLoading : Bool -> Button msg -> Button msg
isLoading isLoading (Button config) =

    Button { config | isLoading = isLoading }


isDisabled : Bool -> Button msg -> Button msg
isDisabled isDisabled (Button config) =

    Button { config | isDisabled = isDisabled }


class : String -> Button msg -> Button msg
class classString (Button config) =

    Button { config | class = classString }


-- RENDER --


render : Button msg -> Html msg
render (Button config) =

    button
        [ disabled <| config.isDisabled || config.isLoading
--        , maybeAttribute onClick config.onClick ? not config.isDisabled && not config.isLoading
        , Html.class config.class
        ]
        [ maybeView Html.text config.text
--        , icon config.icon config.
        ]


-- maybe default text
-- maybe loading text
-- maybe default icon
-- maybe loading icon


--icon : Maybe String -> Maybe String -> Bool -> Html msg
--icon maybeIcon maybeText isLoading =
--
--    case (maybeIcon, isLoading) of
--
--        (Nothing, False) ->
--            text ""
--
--        (Just icon, False) ->
--            buttonIcon (Maybe.isJust maybeText)
--                [ Html.Attributes.class
--                ]
--                [ text "autorenew" ]
--
--        (_, True) ->
--            span
--                []
--                [ text "autorenew" ]