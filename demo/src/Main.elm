module Main exposing (main)

import BaseReturn as Return
import Return exposing (Return)
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
        , update = (\msg model -> update msg (Return.init model) |> returnToProgram)
        , subscriptions = subscriptions
        , onUrlRequest = Navigate
        , onUrlChange = UrlChange
        }


init : Url -> Navigation.Key -> ( Model, Cmd Msg )
init url navigationKey =
    update (UrlChange url) (initialModel navigationKey)
        |> returnToProgram


returnToProgram : Return Msg Model -> ( Model, Cmd Msg )
returnToProgram return =
    let
        (model, data) =
            Return.toData return

        db =
            model.db
    in
    ( { model
        | toasters = Toasters.merge data.toasters model.toasters
        , db =
            { db | entities = List.foldl Entities.union db.entities data.entities }
      }
    , Cmd.batch data.cmd
    )
