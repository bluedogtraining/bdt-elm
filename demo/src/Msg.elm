module Msg exposing (Msg(..))

--import Form.DropZone as DropZone

import Countries exposing (Country)
import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Form.TextArea as TextArea
import MusicGenre exposing (MusicGenre)
import Toasters
import ToolTip


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
    | ToolTip1Msg ToolTip.Msg
    | ToolTip2Msg ToolTip.Msg
    | ToolTip3Msg ToolTip.Msg
    | ToolTip4Msg ToolTip.Msg
    | UpdateName Input.Msg
    | UpdateStartDate DatePicker.Msg
    | UpdateEmail Input.Msg
    | UpdatePreferredGenre (Select.Msg MusicGenre)
    | UpdateCountryOfBirth (SearchSelect.Msg Country)
    | Toggle1
    | Toggle2
    | DisabledToggle
    | OpenSmModal
    | CloseSmModal
    | OpenLgModal
    | CloseLgModal
      --    | DropZone DropZone.Msg
    | UpdateMaybeBLockSelect (Select.Msg MusicGenre)
