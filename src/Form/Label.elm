module Form.Label exposing
    ( view
    , mandatory
    , render
    )

{-| Module to add Labels to your app


# Initialise

@docs view


# Configure

@docs mandatory


# Render

@docs render

-}

import Css exposing (..)
import Form.Label.Css as Css
import Html.Styled exposing (..)
import Html.Styled.Bdt exposing (..)


type Label
    = Label Config


type alias Config =
    { text : String
    , mandatory : Bool
    }


initialConfig : String -> Config
initialConfig text =
    { text = text
    , mandatory = False
    }



-- VIEW / SETTERS --


{-| Init a Label
-}
view : String -> Label
view =
    initialConfig >> Label


{-| Set whether or not a label is mandatory
-}
mandatory : Bool -> Label -> Label
mandatory bool (Label config) =
    Label { config | mandatory = bool }


{-| Render the label
-}
render : Label -> Html msg
render (Label config) =
    label
        [ Css.label ]
        [ text config.text
        , divIf config.mandatory
            [ Css.mandatory ]
            [ text "*" ]
        ]
