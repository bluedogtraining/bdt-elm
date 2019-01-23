module Index.Update exposing (update)

import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Form.TextArea as TextArea
import Index.Model as Index
import Index.Msg exposing (Msg(..))
import Toasters
import ToolTip


update : Msg -> Index.Model -> ( Index.Model, Cmd Msg )
update msg model =
    case msg of
        AddGreenToaster ->
            ( model, Cmd.none )

        --            ( { model | toasters = Toasters.addGreen "Green Toasters are great." model.toasters }, Cmd.none )
        AddRedToaster ->
            ( model, Cmd.none )

        --            ( { model | toasters = Toasters.addRed "Red Toasters are even better!" model.toasters }, Cmd.none )
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

        TextAreaWrapMsg textAreaWrapMsg ->
            ( { model | textAreaWrap = TextArea.update textAreaWrapMsg model.textAreaWrap }, Cmd.none )

        Toggle1 ->
            ( { model | toggle1 = not model.toggle1 }, Cmd.none )

        Toggle2 ->
            ( { model | toggle2 = not model.toggle2 }, Cmd.none )

        DisabledToggle ->
            ( { model | toggle3 = not model.toggle3 }, Cmd.none )

        ToolTip1Msg toolTipMsg ->
            ( { model | toolTip1 = ToolTip.update toolTipMsg model.toolTip1 }, Cmd.none )

        ToolTip2Msg toolTipMsg ->
            ( { model | toolTip2 = ToolTip.update toolTipMsg model.toolTip2 }, Cmd.none )

        ToolTip3Msg toolTipMsg ->
            ( { model | toolTip3 = ToolTip.update toolTipMsg model.toolTip3 }, Cmd.none )

        ToolTip4Msg toolTipMsg ->
            ( { model | toolTip4 = ToolTip.update toolTipMsg model.toolTip4 }, Cmd.none )

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

        ToggleSmModal ->
            ( { model | modalSmOpen = not model.modalSmOpen }, Cmd.none )

        ToggleLgModal ->
            ( { model | modalLgOpen = not model.modalLgOpen }, Cmd.none )

        ToggleResizeModal ->
            ( { model | modalResizeOpen = not model.modalResizeOpen }, Cmd.none )

        UpdateMaybeBLockSelect selectMsg ->
            let
                ( newSelect, cmd ) =
                    Select.update selectMsg model.maybeBlockSelect
            in
            ( { model | maybeBlockSelect = newSelect }, Cmd.map SelectMsg cmd )

        SetGridButtonGreen isGreen ->
            ( { model | isGridButtonGreen = isGreen }, Cmd.none )
