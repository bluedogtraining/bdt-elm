module Msg exposing (Msg (..))

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker
import Form.TextArea as TextArea

import MusicGenre exposing (MusicGenre)
import Countries exposing (Country)


type Msg
    = InputMsg Input.Msg
    | IntInputMsg IntInput.Msg
    | FloatInputMsg FloatInput.Msg
    | SelectMsg (Select.Msg MusicGenre)
    | MultiSelectMsg (MultiSelect.Msg MusicGenre)
    | SearchSelectMsg (SearchSelect.Msg Country)
    | DatePickerMsg DatePicker.Msg
    | TextAreaMsg TextArea.Msg