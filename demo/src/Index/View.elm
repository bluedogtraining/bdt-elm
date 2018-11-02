module Index.View exposing (view)

--import Form.DropZone as DropZone

import Button
import Card
import FeatherIcons
import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.Label as Label
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Form.TextArea as TextArea
import Grid
import Grid.Size exposing (..)
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Bdt as Html
import Html.Styled.Events exposing (..)
import Index.Model as Index
import Index.Msg as Index exposing (Msg(..))
import Modal
import Records.MusicGenre as MusicGenre exposing (MusicGenre)
import Time
import Time.Date as Date
import Toasters
import Toggle
import ToolTip


view : Index.Model -> Html Index.Msg
view model =
    div
        []
        [ Grid.container
            []
            [ h1
                []
                [ text "Form Elements" ]
            , Grid.row
                [ Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
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
                                , Html.maybeView (IntInput.getValue model.intInput)
                                    (\int -> text <| "Value: " ++ String.fromInt int)
                                ]
                            , Card.block Twelve
                                [ Label.view "Float Input, accepting only floats!"
                                    |> Label.render
                                , FloatInput.view model.floatInput
                                    |> FloatInput.render
                                    |> Html.map FloatInputMsg
                                , Html.maybeView (FloatInput.getValue model.floatInput)
                                    (\float -> text <| "Value: " ++ String.fromFloat float)
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    ]
                , Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
                    [ Card.view
                        |> Card.header "Example Selects" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Label.view "Simple Select"
                                    |> Label.render
                                , model.select
                                    |> Select.view MusicGenre.toLabel
                                    |> Select.setIsClearable True
                                    |> Select.setIsOptionDisabled ((==) MusicGenre.Pop)
                                    |> Select.render
                                    |> Html.map SelectMsg
                                ]
                            , Card.block Twelve
                                [ Label.view "Multi Select"
                                    |> Label.render
                                , model.multiSelect
                                    |> MultiSelect.view MusicGenre.toLabel
                                    |> MultiSelect.setIsOptionDisabled ((==) MusicGenre.Pop)
                                    |> MultiSelect.render
                                    |> Html.map MultiSelectMsg
                                ]
                            , Card.block Twelve
                                [ Label.view "Search Select"
                                    |> Label.render
                                , model.searchSelect
                                    |> SearchSelect.view .name
                                    |> SearchSelect.render
                                    |> Html.map SearchSelectMsg
                                , Html.maybeView
                                    (SearchSelect.getSelectedOption model.searchSelect)
                                    (\country -> text <| "Value: " ++ country.name)
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    ]
                , Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
                    [ Card.view
                        |> Card.header "Date Pickers!" []
                        |> Card.body
                            [ Card.block Twelve
                                [ Label.view "Simple Date Picker"
                                    |> Label.render
                                , DatePicker.view model.datePicker
                                    |> DatePicker.render
                                    |> Html.map DatePickerMsg
                                ]
                            , Card.block Twelve
                                [ Label.view "Date Picker with min and max dates"
                                    |> Label.render
                                , DatePicker.view model.datePicker2
                                    |> DatePicker.setIsClearable True
                                    |> DatePicker.setMinPosix (Just <| Time.millisToPosix <| 1511822890 * 1000)
                                    |> DatePicker.setMaxPosix (Just <| Time.millisToPosix <| 1588822890 * 1000)
                                    |> DatePicker.render
                                    |> Html.map DatePicker2Msg
                                ]
                            , Card.block Twelve
                                [ Label.view "Date Time Picker!"
                                    |> Label.render
                                , DatePicker.view model.datePicker3
                                    |> DatePicker.setIsClearable True
                                    |> DatePicker.setIncludeTime True
                                    |> DatePicker.render
                                    |> Html.map DatePicker3Msg
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render
                    , Card.view
                        |> Card.header "Text Area!" []
                        |> Card.body
                            [ Card.block Six
                                [ div
                                    [ style "display" "flex", style "flex-direction" "column", style "height" "100%" ]
                                    [ TextArea.view model.textArea
                                        |> TextArea.render
                                        |> Html.map TextAreaMsg
                                    ]
                                ]
                            , Card.block Six
                                [ text "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                ]
                            ]
                        |> Card.render
                    ]
                , Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
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
                                    |> Button.onClick ToggleSmModal
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Open Lg Modal"
                                    |> Button.onClick ToggleLgModal
                                    |> Button.render
                                , Button.view
                                    |> Button.text "Open Resize Modal"
                                    |> Button.onClick ToggleResizeModal
                                    |> Button.render
                                , Modal.viewIf model.modalSmOpen ToggleSmModal
                                    |> Modal.setSize Sm
                                    |> Modal.header "Hi I'm Sm Modal" []
                                    |> Modal.body
                                        [ Modal.block Twelve
                                            [ text "Modal Content" ]
                                        ]
                                    |> Modal.footer []
                                    |> Modal.render
                                , Modal.viewIf model.modalLgOpen ToggleLgModal
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
                                            |> Button.onClick ToggleLgModal
                                            |> Button.red
                                        , Button.view
                                            |> Button.text "Save"
                                            |> Button.green
                                        ]
                                    |> Modal.render
                                , Modal.viewIf model.modalResizeOpen ToggleResizeModal
                                    |> Modal.setSize Xl
                                    |> Modal.body
                                        [ Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Learning" ]
                                            , a
                                                [ href "/admin/courses", style "display" "block" ]
                                                [ text "Courses" ]
                                            , a
                                                [ href "/admin/units", style "display" "block" ]
                                                [ text "Units" ]
                                            , a
                                                [ href "/admin/tasks", style "display" "block" ]
                                                [ text "Tasks" ]
                                            , a
                                                [ href "/admin/course-schemes", style "display" "block" ]
                                                [ text "Course Schemes" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Users" ]
                                            , a
                                                [ href "/admin/courses", style "display" "block" ]
                                                [ text "Trainer Roles" ]
                                            , a
                                                [ href "/admin/units", style "display" "block" ]
                                                [ text "Classes" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Skills Profiler" ]
                                            , a
                                                [ href "/admin/courses", style "display" "block" ]
                                                [ text "Activity Definitions" ]
                                            , a
                                                [ href "/admin/units", style "display" "block" ]
                                                [ text "Descriptions" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Apprenticeship Providers" ]
                                            , a
                                                [ href "/admin/courses", style "display" "block" ]
                                                [ text "Apprenticeship Providers" ]
                                            , a
                                                [ href "/admin/units", style "display" "block" ]
                                                [ text "Field Officers" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Finance" ]
                                            , a
                                                [ href "/admin/courses", style "display" "block" ]
                                                [ text "Invoices" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Avetmiss" ]
                                            , a
                                                [ href "/admin/courses", style "display" "block" ]
                                                [ text "Funding Schemes" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Schools & Vetis" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Schools" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Vetis Management" ]
                                            ]
                                        , Modal.blockSizes Twelve
                                            [ ( Xs, Six ), ( Sm, Four ), ( Xl, Two ) ]
                                            [ h1
                                                []
                                                [ text "Other" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Reports" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Assessment Questions" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Course Descriptors" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Feedback" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Referral Sources" ]
                                            , a
                                                [ href "/admin/schools", style "display" "block" ]
                                                [ text "Student Course Archival Status" ]
                                            ]
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
                                            |> Toggle.render
                                        , Toggle.view model.toggle2 Toggle2
                                            |> Toggle.label "Toggle Me"
                                            |> Toggle.render
                                        , Toggle.view model.toggle3 DisabledToggle
                                            |> Toggle.isDisabled True
                                            |> Toggle.label "Disabled"
                                            |> Toggle.render
                                        ]
                                    ]
                                ]
                            ]
                        |> Card.footer []
                        |> Card.render

                    --                    , Card.view
                    --                        |> Card.header "File Uploads" []
                    --                        |> Card.body
                    --                            [ Card.block Twelve
                    --                                [ Grid.row
                    --                                    [ Grid.col Twelve
                    --                                        [ DropZone.view model.dropZone
                    --                                            |> DropZone.setLabel "Drop files here or click to select files"
                    --                                            |> DropZone.render
                    --                                            |> Html.map DropZone
                    --                                        ]
                    --                                    ]
                    --                                ]
                    --                            ]
                    --                        |> Card.footer []
                    --                        |> Card.render
                    ]
                , Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
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
                                    |> Button.icon FeatherIcons.calendar
                                    |> Button.render
                                , Button.view
                                    |> Button.icon FeatherIcons.calendar
                                    |> Button.isDisabled True
                                    |> Button.render
                                , Button.view
                                    |> Button.icon FeatherIcons.calendar
                                    |> Button.small
                                    |> Button.render
                                , Button.view
                                    |> Button.icon FeatherIcons.calendar
                                    |> Button.green
                                    |> Button.render
                                , Button.view
                                    |> Button.icon FeatherIcons.calendar
                                    |> Button.red
                                    |> Button.render
                                , Button.view
                                    |> Button.icon FeatherIcons.calendar
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
                , Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
                    [ Card.view
                        |> Card.header "Example ToolTips" []
                        |> Card.body
                            [ Card.block Three
                                [ ToolTip.view model.toolTip1
                                    |> ToolTip.render
                                    |> Html.map ToolTip1Msg
                                ]
                            , Card.block Three
                                [ ToolTip.view model.toolTip2
                                    |> ToolTip.bottom
                                    |> ToolTip.green
                                    |> ToolTip.render
                                    |> Html.map ToolTip2Msg
                                ]
                            , Card.block Three
                                [ ToolTip.view model.toolTip3
                                    |> ToolTip.left
                                    |> ToolTip.blue
                                    |> ToolTip.render
                                    |> Html.map ToolTip3Msg
                                ]
                            , Card.block Three
                                [ ToolTip.view model.toolTip4
                                    |> ToolTip.top
                                    |> ToolTip.red
                                    |> ToolTip.render
                                    |> Html.map ToolTip4Msg
                                ]
                            ]
                        |> Card.render
                    ]
                , Grid.colSizes Twelve
                    [ ( Lg, Six ) ]
                    [ Card.view
                        |> Card.header "User Details" [ Button.view |> Button.icon FeatherIcons.edit ]
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
                                , model.countryOfBirth
                                    |> SearchSelect.view .name
                                    |> SearchSelect.render
                                    |> Html.map UpdateCountryOfBirth
                                ]
                            , Card.block Six
                                [ Label.view "Preferred Music Genre"
                                    |> Label.render
                                , model.preferredGenre
                                    |> Select.view MusicGenre.toLabel
                                    |> Select.render
                                    |> Html.map UpdatePreferredGenre
                                ]
                            ]
                        |> Card.footer
                            [ Button.view |> Button.red |> Button.text "cancel"
                            , Button.view |> Button.green |> Button.text "save"
                            ]
                        |> Card.render
                    , Card.view
                        |> Card.header "Conditional Blocks" []
                        |> Card.body
                            [ Card.block Six
                                [ Label.view "Preferred Music Genre"
                                    |> Label.render
                                , model.maybeBlockSelect
                                    |> Select.view MusicGenre.toLabel
                                    |> Select.setIsClearable True
                                    |> Select.render
                                    |> Html.map UpdateMaybeBLockSelect
                                ]
                            , Card.maybeBlock Six (Select.getSelectedOption model.maybeBlockSelect) maybeBlockView
                            ]
                        |> Card.render
                    ]
                ]
            ]
        ]


maybeBlockView : MusicGenre -> List (Html Index.Msg)
maybeBlockView musicGenre =
    [ p
        []
        [ text <| "This Block only appears if the Select is Just. It is hidden of the select is Nothing (clear select to make it disapear)." ]
    , p
        []
        [ text <| "Selected: " ++ MusicGenre.toLabel musicGenre ]
    ]
