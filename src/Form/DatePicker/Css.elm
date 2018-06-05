module Form.DatePicker.Css exposing (..)

import Css exposing (..)
import Css.Foreign exposing (children, selector)
import Html.Styled exposing (Attribute, styled)
import Html.Styled.Attributes exposing (css)

import Colors

import Css.Bdt exposing ((?))


container : Attribute msg
container =
    css
        [ flexGrow (int 1)
        , position relative -- make the container relative, so that the absolutely positioned calendar moves with scrolling
        , children [
            selector "*"
                [ fontSize (em 1)
                , color (hex "666666")
                ]
            ]
        ]


selectContainer : Bool -> Bool -> Bool -> Attribute msg
selectContainer isLocked isInput isError =

    case isInput of
        True ->
            css
                [ displayFlex
                , borderColor (if isError then Colors.error else hex "dddddd") |> important
                , cursor (if isLocked then notAllowed else pointer)
                , backgroundColor (if isLocked then rgb 245 245 245 else rgb 255 255 255) |> important
                ]

        False ->
            css
                [ displayFlex
                , borderColor (if isError then Colors.error else hex "dddddd") |> important
                , cursor (if isLocked then notAllowed else pointer)
                , focus
                    [ outlineWidth (px 0)
                    , borderWidth (px 0)
                    ]
                , color Colors.error ? isError
                ]


selectContainerDate : Attribute msg
selectContainerDate =
    css
        [ flexGrow (int 1)
        ]


calendar : Attribute msg
calendar =
    css
        [ border3 (px 1) solid (hex "dddddd")
        , padding (px 15)
        , width (px 320)
        , marginTop (px 2)
        , position absolute
        , zIndex (int 100)
        , backgroundColor (hex "ffffff")
        ]


calendarNavigation : Attribute msg
calendarNavigation =
    css
        [ displayFlex
        ]


calendarNavigationDate : Attribute msg
calendarNavigationDate =
    css
        [ flexGrow (int 1)
        , textAlign center
        , fontSize (em 1)
        , color (hex "444444")
        ]


calendarNavigationMonthArrow : Bool -> Attribute msg
calendarNavigationMonthArrow isDisabled =
    css
        [ color (hex "dddddd") ? isDisabled
        , cursor pointer ? not isDisabled
        , margin2 (px 0) (px 10)
        ]


calendarNavigationYearArrowContainer : Bool -> Attribute msg
calendarNavigationYearArrowContainer isDisabled =
    css
        [ cursor pointer ? not isDisabled
        ]


calendarNavigationYearArrow : Bool -> Attribute msg
calendarNavigationYearArrow isDisabled =
    css
        [ margin2 (px 0) (px -3)
        , color (hex "dddddd") ? isDisabled
        ]


calendarWeekDays : Attribute msg
calendarWeekDays =
    css
        [ border3 (px 1) dashed (hex "dddddd")
        , borderLeftWidth (px 0)
        , borderRightWidth (px 0)
        , margin2 (px 10) (px 0)
        , padding2 (px 5) (px 0)
        , displayFlex
        ]


calendarWeekDay : Attribute msg
calendarWeekDay =
    css
        [ flex2 (int 1) (int 1)
        , textTransform uppercase
        , fontWeight (int 600)
        , fontSize (em 0.8)
        , color (hex "999999")
        , textAlign center
        ]


calendarDays : Attribute msg
calendarDays =
    css
        []


calendarDayRow : Attribute msg
calendarDayRow =
    css
        [ displayFlex
        ]


calendarDay : Bool -> Bool -> Bool -> Attribute msg
calendarDay isSelected isSelectedTimeDate isSelectable =
    css
        [ flex2 (int 1) (int 1)
        , margin (px 3)
        , displayFlex
        , justifyContent center
        , alignItems center
        , height (px 35)
        , borderRadius (px 3)
        -- not selectable
        , backgroundColor (hex "eeeeee") ? not isSelectable
        , color (hex "dddddd") ? not isSelectable
        -- selectable
        , backgroundColor (hex "dddddd") ? isSelectable
        , hover
            [ cursor pointer ? isSelectable
            , backgroundColor (hex "6BB9F0")
            , color (hex "ffffff")
            ]
        -- selected
        , backgroundColor (hex "6BB9F0") ? isSelectable && isSelected
        , color (hex "ffffff") ? isSelectable && isSelected
        -- selected time date
        , backgroundColor (hex "4B77BE") ? isSelectable && isSelectedTimeDate
        , color (hex "ffffff") ? isSelectable && isSelectedTimeDate
        ]


timePickerContainer : Attribute msg
timePickerContainer =
    css
        [ borderTop3 (px 1) solid (hex "dddddd")
        , margin4 (px 10) (px -15) (px -10) (px -15)
        , displayFlex
        , padding2 (px 0) (px 10)
        ]


timePickerSelectContainer : Attribute msg
timePickerSelectContainer =
    css
        [ displayFlex
        , alignItems center
        , padding2 (px 3) (px 5)
        ]


timePickerSelect : Attribute msg
timePickerSelect =
    css
        [ width (px 60)
        ]


timePickerColon : Attribute msg
timePickerColon =
    css
        [ displayFlex
        , alignItems center
        ]


applyButtonContainer : Attribute msg
applyButtonContainer =
    css
        [ flexGrow (int 1)
        , displayFlex
        , justifyContent center
        , alignItems center
        ]


applyButton : Bool -> Attribute msg
applyButton isActive =
    css
        [ padding2 (px 6) (px 15)
        , borderRadius (px 4)
        , cursor pointer ? isActive
        , cursor notAllowed ? not isActive
        , backgroundColor (hex "2ECC71") ? isActive
        , backgroundColor (hex "eeeeee") ? not isActive
        , color (hex "ffffff") ? isActive
        , color (hex "cccccc") ? not isActive
        ]


clearDateContainer : Attribute msg
clearDateContainer =
    css
        [ borderTop3 (px 1) solid (hex "dddddd")
        , margin4 (px 10) (px -15) (px -15) (px -15)
        ]


clearDateButton : Bool -> Attribute msg
clearDateButton isActive =
    css
        [ textAlign center
        , padding (px 10)
        , color (hex "333333") ? isActive
        , color (hex "cccccc") ? not isActive
        , backgroundColor (hex "f9f9f9") ? isActive
        , backgroundColor (hex "ffffff") ? not isActive
        , cursor pointer ? isActive
        , cursor default ? not isActive
        ]