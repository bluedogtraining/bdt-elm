module View exposing (view)

import Html.Styled as Html exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import Date
import Time

import Toasters

import Form.Label as Label
import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker
import Form.DropZone as DropZone
import Form.TextArea as TextArea

import Tuple.Bdt exposing ((~))

import Grid
import Grid.Size exposing (..)
import Card
import Modal
import Icon
import Button
import Toggle

import Msg exposing (Msg (..))
import Model exposing (Model)


view : Model -> Html Msg
view model =
    div
        []
        [ Toasters.view model.toasters
            |> Html.map ToastersMsg
        , Grid.container
            []
            [ h1
                []
                [ text "Form Elements" ]
            , Grid.row
                [ Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Example Inputs" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Label.view "Simple text Input"
                                    |> Label.render
                                , Input.view model.input
                                    |> Input.render
                                    |> Html.map InputMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ Input.getValue model.input ]
                                ]
                            , Card.block Twelve
                                [ Label.view "Int Input, accepting only ints!"
                                    |> Label.render
                                , IntInput.view model.intInput
                                    |> IntInput.render
                                    |> Html.map IntInputMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (IntInput.getValue model.intInput) ]
                                ]
                            , Card.block Twelve
                                [ Label.view "Float Input, accepting only floats!"
                                    |> Label.render
                                , FloatInput.view model.floatInput
                                    |> FloatInput.render
                                    |> Html.map FloatInputMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (FloatInput.getValue model.floatInput) ]
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Example Selects" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Label.view "Simple Select"
                                    |> Label.render
                                , Select.view model.select
                                    |> Select.setIsClearable True
                                    |> Select.render
                                    |> Html.map SelectMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (Select.getSelectedOption model.select) ]
                                ]
                            , Card.block Twelve
                                [ Label.view "Multi Select"
                                    |> Label.render
                                , MultiSelect.view model.multiSelect
                                    |> MultiSelect.render
                                    |> Html.map MultiSelectMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (MultiSelect.getSelectedOptions model.multiSelect) ]
                                ]
                            , Card.block Twelve
                                [ Label.view "Search Select"
                                    |> Label.render
                                , SearchSelect.view model.searchSelect
                                    |> SearchSelect.setToLabel (\option -> option.name ++ " (" ++ String.join ", " option.altSpellings ++ ")")
                                    |> SearchSelect.render
                                    |> Html.map SearchSelectMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (SearchSelect.getSelectedOption model.searchSelect) ]
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Date Pickers!" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Label.view "Simple Date Picker"
                                    |> Label.render
                                , DatePicker.view model.datePicker
                                    |> DatePicker.render
                                    |> Html.map DatePickerMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (DatePicker.getSelectedDate model.datePicker) ]
                                ]
                            , Card.block Twelve
                                [ Label.view "Date Picker with min and max dates"
                                    |> Label.render
                                , DatePicker.view model.datePicker2
                                    |> DatePicker.setIsClearable True
                                    |> DatePicker.setMinDate (Just <| Date.fromTime <| Time.second * 1506760131)
                                    |> DatePicker.setMaxDate (Just <| Date.fromTime <| Time.second * 1549770131)
                                    |> DatePicker.render
                                    |> Html.map DatePicker2Msg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (DatePicker.getSelectedDate model.datePicker2) ]
                                ]
                            , Card.block Twelve
                                [ Label.view "Date Time Picker!"
                                    |> Label.render
                                , DatePicker.view model.datePicker3
                                    |> DatePicker.setIsClearable True
                                    |> DatePicker.setIncludeTime True
                                    |> DatePicker.render
                                    |> Html.map DatePicker3Msg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (DatePicker.getSelectedDate model.datePicker3) ]
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    , Card.view
                        |> Card.header "Text Area!" []
                        |> Card.body
                            [ Card.block Twelve
                                [ TextArea.view model.textArea
                                    |> TextArea.render
                                    |> Html.map TextAreaMsg
                                ]
                            ]
                        |> Card.render
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Toasters" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Button.view
                                    |> Button.text "Add Green Toaster"
                                    |> Button.green
                                    |> Button.onClick AddGreenToaster
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Add Red Toaster"
                                    |> Button.red
                                    |> Button.onClick AddRedToaster
                                    |> Button.render
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    , Card.view
                        |> Card.header "Modal" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Button.view
                                    |> Button.text "Open Sm Modal"
                                    |> Button.onClick OpenSmModal
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Open Lg Modal"
                                    |> Button.onClick OpenLgModal
                                    |> Button.render
                                , Modal.viewIf model.modalSmOpen CloseSmModal
                                    |> Modal.setSize Sm
                                    |> Modal.header "Hi I'm Sm Modal" []
                                    |> Modal.body
                                        [ Modal.block Twelve
                                            [ text "Modal Content" ]
                                        ]
                                    |> Modal.footer []
                                    |> Modal.render
                                , Modal.viewIf model.modalLgOpen CloseLgModal
                                    |> Modal.setSize Lg
                                    |> Modal.header "Hi I'm Lg Modal" []
                                        |> Modal.body
                                            [ Modal.block Twelve
                                                [ p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                , p [] [ text "Modal Content" ]
                                                ]
                                            ]
                                        |> Modal.footer
                                            [ Button.view
                                                |> Button.text "Cancel"
                                                |> Button.onClick CloseLgModal
                                                |> Button.red
                                            , Button.view
                                                |> Button.text "Save"
                                                |> Button.green
                                            ]
                                        |> Modal.render
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    , Card.view
                        |> Card.header "Toggle" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Grid.row
                                    [ Grid.col Six
                                        [ Toggle.view model.toggle1 Toggle1
                                        , Toggle.viewWithLabel "Toggle Me" model.toggle2 Toggle2
                                        ]
                                    , Grid.col Six
                                        [ Button.view
                                            |> Button.text "I'm a button"
                                            |> Button.render
                                            |> Html.map DropZone
                                        ]
                                    ]
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    , Card.view
                        |> Card.header "File Uploads" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Grid.row
                                    [ Grid.col Twelve
                                        [ DropZone.view model.dropZone
                                            |> DropZone.setLabel "Drop files here or click to select files"
                                            |> DropZone.render
                                            |> Html.map DropZone
                                        ]
                                    ]
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Example Buttons" [ Button.view |> Button.text "Header Button", Button.view |> Button.text "Another Button" ]
                        |> Card.body
                            [ Card.block Twelve
                                [ Button.view
                                    |> Button.text "Normal"
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Disabled :("
                                    |> Button.isDisabled True
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Small!"
                                    |> Button.small
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Green!"
                                    |> Button.green
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Red!"
                                    |> Button.red
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Loading!"
                                    |> Button.isLoading True
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Small, green, loading!"
                                    |> Button.small
                                    |> Button.green
                                    |> Button.isLoading True
                                    |> Button.render
                                , Button.view
                                    |> Button.icon Icon.Calendar
                                    |> Button.render
                                , Button.view
                                    |> Button.icon Icon.Calendar
                                    |> Button.isDisabled True
                                    |> Button.render
                                , Button.view
                                    |> Button.icon Icon.Calendar
                                    |> Button.small
                                    |> Button.render
                                , Button.view
                                    |> Button.icon Icon.Calendar
                                    |> Button.green
                                    |> Button.render
                                , Button.view
                                    |> Button.icon Icon.Calendar
                                    |> Button.red
                                    |> Button.render
                                , Button.view
                                    |> Button.icon Icon.Calendar
                                    |> Button.isLoading True
                                    |> Button.render
                                , Button.view
                                    |> Button.href "http://google.com"
                                    |> Button.text "Google It"
                                    |> Button.render
                                ]
                            ]
                        |> Card.footer [ Button.view |> Button.text "Footer Button" ]
                        |> Card.render
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "User Details" [ Button.view |> Button.icon Icon.Edit ]
                        |> Card.body
                            [ Card.block Six
                                [ Label.view "Name"
                                    |> Label.mandatory True
                                    |> Label.render
                                , Input.view model.name
                                    |> Input.render
                                    |> Html.map UpdateName
                                ]
                            , Card.block Six
                                [ Label.view "Start Date"
                                    |> Label.mandatory True
                                    |> Label.render
                                , DatePicker.view model.startDate
                                    |> DatePicker.render
                                    |> Html.map UpdateStartDate
                                ]
                            , Card.block Six
                                [ Label.view "Email"
                                    |> Label.mandatory True
                                    |> Label.render
                                , Input.view model.email
                                    |> Input.render
                                    |> Html.map UpdateEmail
                                ]
                            , Card.block Six
                                [ Label.view "Country of Birth"
                                    |> Label.mandatory True
                                    |> Label.render
                                , SearchSelect.view model.countryOfBirth
                                    |> SearchSelect.setToLabel .name
                                    |> SearchSelect.render
                                    |> Html.map UpdateCountryOfBirth
                                ]
                            , Card.block Six
                                [ Label.view "Preferred Music Genre"
                                    |> Label.render
                                , Select.view model.preferredGenre
                                    |> Select.render
                                    |> Html.map UpdatePreferredGenre
                                ]
                            ]
                        |> Card.footer
                            [ Button.view |> Button.red |> Button.text "cancel"
                            , Button.view |> Button.green |> Button.text "save"
                            ]
                        |> Card.render
                    ]
                ]
            ]
        ]