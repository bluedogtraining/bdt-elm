module View exposing (view)

import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)

import Date
import Time

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

import Msg exposing (Msg (..))
import Model exposing (Model)

import Styles as Css
import Grid.Css as Css

import Grid.Size exposing (..)


view : Model -> Html Msg
view model =
    div
        [ Css.background ]
        [ div
            [ Css.container ]
            [ h1
                []
                [ text "Form Elements" ]
            , Grid.row
                [ Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.header "Example Inputs" []
                        |> Card.body
                            [ Card.blockSizes Twelve [ Md ~ Six ]
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
                            , Card.blockSizes Twelve [ Md ~ Six ]
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
                            ]
                        |> Card.footer []
                        |> Card.render
                    ]
                , Grid.colSizes Twelve [ Lg ~ Six ]
                    [ Card.view
                        |> Card.body
                            [ Card.block Twelve
                                [ text "Hi" ]
                            ]
                        |> Card.render
                    ]
                ]
            ]
        ]


--            , div
--                [ class "row" ]
--                [ div
--                    [ class "col-6" ]
--                    [ h2
--                        []
--                        [ text "Input" ]
--                    , Input.view model.input
--                        |> Input.render
--                        |> Html.map InputMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ Input.getValue model.input ]
--                    ]
--                , div
--                    [ class "col-6" ]
--                    [ h2
--                        []
--                        [ text "Int Input" ]
--                    , IntInput.view model.intInput
--                        |> IntInput.render
--                        |> Html.map IntInputMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ toString (IntInput.getValue model.intInput) ]
--                    , h2
--                        []
--                        [ text "Float Input" ]
--                    , FloatInput.view model.floatInput
--                        |> FloatInput.render
--                        |> Html.map FloatInputMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ toString (FloatInput.getValue model.floatInput) ]
--                    , h2
--                        []
--                        [ text "Select" ]
--                    , Select.view model.select
--                        |> Select.render
--                        |> Html.map SelectMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ toString (Select.getSelectedOption model.select) ]
--                    , h2
--                        []
--                        [ text "Multi Select" ]
--                    , MultiSelect.view model.multiSelect
--                        |> MultiSelect.render
--                        |> Html.map MultiSelectMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ toString (MultiSelect.getSelectedOptions model.multiSelect) ]
--                    , h2
--                        []
--                        [ text "Search Select" ]
--                    , SearchSelect.view model.searchSelect
--                        |> SearchSelect.render
--                        |> Html.map SearchSelectMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ toString (SearchSelect.getSelectedOption model.searchSelect) ]
--                    , h2
--                        []
--                        [ text "Date Picker" ]
--                    , DatePicker.view model.datePicker
--                        |> DatePicker.setIsClearable True
--                        |> DatePicker.setIncludeTime True
--                        |> DatePicker.setMinDate (Just <| Date.fromTime <| Time.second * 1506760131)
--                        |> DatePicker.setMaxDate (Just <| Date.fromTime <| Time.second * 1549770131)
--                        |> DatePicker.render
--                        |> Html.map DatePickerMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ toString (DatePicker.getSelectedDate model.datePicker) ]
--                    , h2
--                        []
--                        [ text "TextArea" ]
--                    , TextArea.view model.textArea
--                        |> TextArea.render
--                        |> Html.map TextAreaMsg
--                    , div
--                        []
--                        [ text <| "Value: " ++ TextArea.getValue model.textArea ]
--                    ]
--                ]
--            ]
--        ]