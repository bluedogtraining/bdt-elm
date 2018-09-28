module Main exposing (main)

import Browser
import Browser.Navigation as Navigation
import Html.Styled as Html exposing (Html)
import Model exposing (Model, initialModel)
import Msg exposing (Msg(..))
import Subscriptions exposing (subscriptions)
import Update exposing (update)
import View exposing (view)
import Url exposing (Url)


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
