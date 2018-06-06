module Msg exposing (Msg (..))

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker

import MusicGenre exposing (MusicGenre)
import StarWars exposing (Character)


type Msg
    = InputMsg Input.Msg
    | IntInputMsg IntInput.Msg
    | FloatInputMsg FloatInput.Msg
    | SelectMsg (Select.Msg MusicGenre)
    | MultiSelectMsg (MultiSelect.Msg MusicGenre)
    | SearchSelectMsg (SearchSelect.Msg Character)
    | DatePickerMsg DatePicker.Msg