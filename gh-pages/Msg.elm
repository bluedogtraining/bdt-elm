module Msg exposing (Msg (..))

import Toasters

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DropZone as DropZone
import Form.DatePicker as DatePicker
import Form.TextArea as TextArea

import MusicGenre exposing (MusicGenre)
import Countries exposing (Country)


type Msg
    = ToastersMsg Toasters.Msg
    | AddGreenToaster
    | AddRedToaster
    | InputMsg Input.Msg
    | IntInputMsg IntInput.Msg
    | FloatInputMsg FloatInput.Msg
    | SelectMsg (Select.Msg MusicGenre)
    | MultiSelectMsg (MultiSelect.Msg MusicGenre)
    | SearchSelectMsg (SearchSelect.Msg Country)
    | DatePickerMsg DatePicker.Msg
    | DatePicker2Msg DatePicker.Msg
    | DatePicker3Msg DatePicker.Msg
    | TextAreaMsg TextArea.Msg
    | UpdateName Input.Msg
    | UpdateStartDate DatePicker.Msg
    | UpdateEmail Input.Msg
    | UpdatePreferredGenre (Select.Msg MusicGenre)
    | UpdateCountryOfBirth (SearchSelect.Msg Country)
    | Toggle1
    | Toggle2
    | DropZone DropZone.Msg