module Update exposing (update)

import Toasters

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
        ToastersMsg toasterMsg ->
            { model | toasters = Toasters.update toasterMsg model.toasters } ! []

        AddGreenToaster ->
            { model | toasters = Toasters.addGreen "Green Toasters are great." model.toasters } ! []

        AddRedToaster ->
            { model | toasters = Toasters.addRed "Red Toasters are even better!" model.toasters } ! []

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

        DatePicker2Msg datePickerMsg ->
            let
                (newDatePicker, cmd) =
                    DatePicker.update datePickerMsg model.datePicker2

            in
                { model | datePicker2 = newDatePicker } ! [ Cmd.map DatePicker2Msg cmd ]

        DatePicker3Msg datePickerMsg ->
            let
                (newDatePicker, cmd) =
                    DatePicker.update datePickerMsg model.datePicker3

            in
                { model | datePicker3 = newDatePicker } ! [ Cmd.map DatePicker3Msg cmd ]

        TextAreaMsg textAreaMsg ->
            { model | textArea = TextArea.update textAreaMsg model.textArea } ! []


        UpdateName inputMsg ->
            { model | name = Input.update inputMsg model.name } ! []

        UpdateStartDate datePickerMsg ->
            let
                (newDatePicker, cmd) =
                    DatePicker.update datePickerMsg model.startDate

            in
                { model | startDate = newDatePicker } ! [ Cmd.map UpdateStartDate cmd ]

        UpdateEmail inputMsg ->
            { model | email = Input.update inputMsg model.email } ! []

        UpdatePreferredGenre selectMsg ->
            let
                (newSelect, cmd) =
                    Select.update selectMsg model.preferredGenre

            in
                { model | preferredGenre = newSelect } ! [ Cmd.map SelectMsg cmd ]

        UpdateCountryOfBirth searchSelectMsg ->
            let
                (newSearchSelect, cmd) =
                    SearchSelect.update searchSelectMsg model.countryOfBirth

            in
                { model | countryOfBirth = newSearchSelect } ! [ Cmd.map SearchSelectMsg cmd ]
