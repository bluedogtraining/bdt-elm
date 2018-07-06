module View exposing (view)

import Html.Styled as Html exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import Date
import Time

import Toasters

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker
import Form.TextArea as TextArea

import Tuple.Bdt exposing ((~))

import Grid
import Card

import Button

import Msg exposing (Msg (..))
import Model exposing (Model)

import Styles as Css
import Grid.Css as Css

import Grid.Size exposing (..)

import Icon


view : Model -> Html Msg
view model =
    div
        [ Css.background ]
        [ Toasters.view model.toasters
            |> Html.map ToastersMsg
        , div
            [ Css.container ]
            [ h1
                []
                [ text "Form Elements" ]
            , Grid.row
                [ Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Example Inputs" []
                        |> Card.body
                            [ Card.block Twelve
                                [ label
                                    []
                                    [ text "Simple text Input" ]
                                , Input.view model.input
                                    |> Input.render
                                    |> Html.map InputMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ Input.getValue model.input ]
                                ]
                            , Card.block Twelve
                                [ label
                                    []
                                    [ text "Int Input, accepting only ints!" ]
                                , IntInput.view model.intInput
                                    |> IntInput.render
                                    |> Html.map IntInputMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (IntInput.getValue model.intInput) ]
                                ]
                            , Card.block Twelve
                                [ label
                                    []
                                    [ text "Float Input, accepting only floats!" ]
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
                                [ label
                                    []
                                    [ text "Simple Select" ]
                                , Select.view model.select
                                    |> Select.setIsClearable True
                                    |> Select.render
                                    |> Html.map SelectMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (Select.getSelectedOption model.select) ]
                                ]
                            , Card.block Twelve
                                [ label
                                    []
                                    [ text "Multi Select" ]
                                , MultiSelect.view model.multiSelect
                                    |> MultiSelect.render
                                    |> Html.map MultiSelectMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (MultiSelect.getSelectedOptions model.multiSelect) ]
                                ]
                            , Card.block Twelve
                                [ label
                                    []
                                    [ text "Search Select" ]
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
                                [ label
                                    []
                                    [ text "Simple Date Picker" ]
                                , DatePicker.view model.datePicker
                                    |> DatePicker.render
                                    |> Html.map DatePickerMsg
                                , div
                                    []
                                    [ text <| "Value: " ++ toString (DatePicker.getSelectedDate model.datePicker) ]
                                ]
                            , Card.block Twelve
                                [ label
                                    []
                                    [ text "Date Picker with min and max dates" ]
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
                                [ label
                                    []
                                    [ text "Date Time Picker!" ]
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
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Example Buttons" []
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
                                ]
                            ]
                        |> Card.render
                    ]
                ]
            ]
        ]