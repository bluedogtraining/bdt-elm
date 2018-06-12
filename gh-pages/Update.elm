module Update exposing (update)

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker
import Form.TextArea as TextArea

import Msg exposing (Msg (..))
import Model exposing (Model)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =

    case msg of
        InputMsg inputMsg ->
            { model | input = Input.update inputMsg model.input } ! []

        IntInputMsg intInputMsg ->
            { model | intInput = IntInput.update intInputMsg model.intInput } ! []

        FloatInputMsg floatInputMsg ->
            { model | floatInput = FloatInput.update floatInputMsg model.floatInput } ! []

        SelectMsg selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg model.select

            in
                { model | select = newSelect } ! [ Cmd.map SelectMsg cmd ]

        MultiSelectMsg multiSelectMsg ->
            let
                (newMultiSelect, cmd) =
                    MultiSelect.update multiSelectMsg model.multiSelect

            in
                { model | multiSelect = newMultiSelect } ! [ Cmd.map MultiSelectMsg cmd ]

        SearchSelectMsg searchSelectMsg ->
            let
                (newSearchSelect, cmd) =
                    SearchSelect.update searchSelectMsg model.searchSelect

            in
                { model | searchSelect = newSearchSelect } ! [ Cmd.map SearchSelectMsg cmd ]

        DatePickerMsg datePickerMsg ->
            let
                (newDatePicker, cmd) =
                    DatePicker.update datePickerMsg model.datePicker

            in
                { model | datePicker = newDatePicker } ! [ Cmd.map DatePickerMsg cmd ]

        TextAreaMsg textAreaMsg ->
            { model | textArea = TextArea.update textAreaMsg model.textArea } ! []