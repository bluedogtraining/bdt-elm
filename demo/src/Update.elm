module Update exposing (update)

--import Form.DropZone as DropZone

import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Form.TextArea as TextArea
import Model exposing (Model)
import Msg exposing (Msg(..))
import Toasters


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToastersMsg toasterMsg ->
            ( { model | toasters = Toasters.update toasterMsg model.toasters }, Cmd.none )

        AddGreenToaster ->
            ( { model | toasters = Toasters.addGreen "Green Toasters are great." model.toasters }, Cmd.none )

        AddRedToaster ->
            ( { model | toasters = Toasters.addRed "Red Toasters are even better!" model.toasters }, Cmd.none )

        InputMsg inputMsg ->
            ( { model | input = Input.update inputMsg model.input }, Cmd.none )

        IntInputMsg intInputMsg ->
            ( { model | intInput = IntInput.update intInputMsg model.intInput }, Cmd.none )

        FloatInputMsg floatInputMsg ->
            ( { model | floatInput = FloatInput.update floatInputMsg model.floatInput }, Cmd.none )

        SelectMsg selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg model.select
            in
            ( { model | select = newSelect }, Cmd.map SelectMsg cmd )

        MultiSelectMsg multiSelectMsg ->
            let
                ( newMultiSelect, cmd ) =
                    MultiSelect.update multiSelectMsg model.multiSelect
            in
            ( { model | multiSelect = newMultiSelect }, Cmd.map MultiSelectMsg cmd )

        SearchSelectMsg searchSelectMsg ->
            let
                ( newSearchSelect, cmd ) =
                    SearchSelect.update searchSelectMsg model.searchSelect
            in
            ( { model | searchSelect = newSearchSelect }, Cmd.map SearchSelectMsg cmd )

        DatePickerMsg datePickerMsg ->
            let
                ( newDatePicker, cmd ) =
                    DatePicker.update datePickerMsg model.datePicker
            in
            ( { model | datePicker = newDatePicker }, Cmd.map DatePickerMsg cmd )

        DatePicker2Msg datePickerMsg ->
            let
                ( newDatePicker, cmd ) =
                    DatePicker.update datePickerMsg model.datePicker2
            in
            ( { model | datePicker2 = newDatePicker }, Cmd.map DatePicker2Msg cmd )

        DatePicker3Msg datePickerMsg ->
            let
                ( newDatePicker, cmd ) =
                    DatePicker.update datePickerMsg model.datePicker3
            in
            ( { model | datePicker3 = newDatePicker }, Cmd.map DatePicker3Msg cmd )

        TextAreaMsg textAreaMsg ->
            ( { model | textArea = TextArea.update textAreaMsg model.textArea }, Cmd.none )

        Toggle1 ->
            ( { model | toggle1 = not model.toggle1 }, Cmd.none )

        Toggle2 ->
            ( { model | toggle2 = not model.toggle2 }, Cmd.none )

        DisabledToggle ->
            ( { model | toggle3 = not model.toggle3 }, Cmd.none )

        --        DropZone dropZoneMsg ->
        --            ({ model | dropZone = DropZone.update dropZoneMsg model.dropZone }, Cmd.none)
        UpdateName inputMsg ->
            ( { model | name = Input.update inputMsg model.name }, Cmd.none )

        UpdateStartDate datePickerMsg ->
            let
                ( newDatePicker, cmd ) =
                    DatePicker.update datePickerMsg model.startDate
            in
            ( { model | startDate = newDatePicker }, Cmd.map UpdateStartDate cmd )

        UpdateEmail inputMsg ->
            ( { model | email = Input.update inputMsg model.email }, Cmd.none )

        UpdatePreferredGenre selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg model.preferredGenre
            in
            ( { model | preferredGenre = newSelect }, Cmd.map SelectMsg cmd )

        UpdateCountryOfBirth searchSelectMsg ->
            let
                ( newSearchSelect, cmd ) =
                    SearchSelect.update searchSelectMsg model.countryOfBirth
            in
            ( { model | countryOfBirth = newSearchSelect }, Cmd.map UpdateCountryOfBirth cmd )

        OpenSmModal ->
            ( { model | modalSmOpen = True }, Cmd.none )

        CloseSmModal ->
            ( { model | modalSmOpen = False }, Cmd.none )

        OpenLgModal ->
            ( { model | modalLgOpen = True }, Cmd.none )

        CloseLgModal ->
            ( { model | modalLgOpen = False }, Cmd.none )

        UpdateMaybeBLockSelect selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg model.maybeBlockSelect
            in
            ( { model | maybeBlockSelect = newSelect }, Cmd.map SelectMsg cmd )
