module Main exposing (main)

import Browser
import Browser.Navigation as Navigation
import Entities exposing (Entities)
import Html.Styled as Html exposing (Html)
import Model exposing (Model, initialModel)
import Msg exposing (Msg(..))
import Subscriptions exposing (subscriptions)
import Toasters
import Update exposing (update)
import Url exposing (Url)
import View exposing (view)


main : Program () Model Msg
main =
    Browser.application
        { init = always init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = Navigate
        , onUrlChange = UrlChange
        }


init : Url -> Navigation.Key -> ( Model, Cmd Msg )
init url navigationKey =
    update (UrlChange url) (initialModel navigationKey)
