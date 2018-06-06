import Html.Styled as Html exposing (..)

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker

import Msg exposing (Msg (..))
import Model exposing (Model, initialModel)
import Update exposing (update)
import View exposing (view)


main : Program Never Model Msg
main =
    program
        { init = initialModel ! []
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }