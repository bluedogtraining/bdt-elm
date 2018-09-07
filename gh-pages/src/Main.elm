module Main exposing (main)

import Browser
import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Html.Styled as Html exposing (Html)
import Model exposing (Model, initialModel)
import Msg exposing (Msg(..))
import Subscriptions exposing (subscriptions)
import Update exposing (update)
import View exposing (view)


main : Program () Model Msg
main =
    Browser.document
        { init = always ( initialModel, Cmd.none )
        , update = update
        , view =
            \model ->
                { title = "Bdt-Elm Demo"
                , body = [ view model |> Html.toUnstyled ]
                }
        , subscriptions = subscriptions
        }
