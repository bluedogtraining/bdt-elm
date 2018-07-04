module Form.DatePicker.Css exposing (..)

import Css exposing (..)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)

import Form.Css as Css


container : Attribute msg
container =

    css
        [ position relative
        ]


input : Bool -> Bool -> Attribute msg
input isError isLocked =

    css <| Css.select isError isLocked


title : Attribute msg
title =

    css
        [ flexGrow <| int 1 ]


calendar : Attribute msg
calendar =

    css
        [ border3 (px 1) solid (hex "dddddd")
        , padding <| px 15
        , width <| px 320
        , top <| px 33
        , position absolute
        , zIndex <| int 100
        , backgroundColor <| hex "ffffff"
        ]


navigation : Attribute msg
navigation =

    css
        [ displayFlex
        ]


date : Attribute msg
date =

    css
        [ flexGrow <| int 1
        , displayFlex
        , justifyContent center
        , alignItems center
        ]


arrowStyles : Bool -> List Style
arrowStyles isDisabled =

    [ cursor <| if isDisabled then notAllowed else pointer
    , hover
        [ color <| hex "6bb9f0"
        ]
    ]


yearArrows : Bool -> Attribute msg
yearArrows isDisabled =

    css <|
        arrowStyles isDisabled
        ++
        [ displayFlex
        , nthChild "2"
            [ marginRight <| px -14
            ]
        ]


monthArrows : Bool -> Attribute msg
monthArrows isDisabled =

    css <| arrowStyles isDisabled


weekDayList : Attribute msg
weekDayList =

    css
        [ border3 (px 1) dashed (hex "dddddd")
        , borderWidth2 (px 1) (px 0)
        , margin2 (px 10) (px 0)
        , padding2 (px 5) (px 0)
        , displayFlex
        ]


weekDayItem : Attribute msg
weekDayItem =

    css
        [ flexGrow <| int 1
        , textTransform uppercase
        , fontWeight <| int 600
        , fontSize <| pt 8
        , color <| hex "999999"
        , textAlign center
        ]


calendarDayRow : Attribute msg
calendarDayRow =

    css
        [ displayFlex
        ]


calendarDayItem : Bool -> Bool -> Bool -> Attribute msg
calendarDayItem isSelected isSelectedTimeDate isSelectable =

    css
        [ displayFlex
        , flexGrow <| int 1
        , justifyContent center
        , alignItems center
        , padding <| px 8
        , margin <| px 3
        , borderRadius <| px 2
        , backgroundColor <| if isSelectable then hex "f3f3f3" else hex "fbfbfb"
        , color <| if isSelectable then hex "666666" else hex "ffffff"
        , cursor <| if isSelectable then pointer else notAllowed
        ]


--    .calendar-day-item {
--        display: flex;
--        flex: 1;
--        justify-content: center;
--        align-items: center;
--        padding: 8px;
--        margin: 3px;
--        border-radius: 2px;
--        background-color: #fbfbfb;
--        color: #dddddd;
--        cursor: not-allowed;
--
--        &.selectable {
--            background-color: #f3f3f3;
--            color: #666666;
--            cursor: pointer;
--
--            &:hover {
--                background-color: #6bb9f0;
--                color: #ffffff;
--            }
--
--            &.selected {
--                background-color: #6bb9f0;
--                color: #ffffff;
--            }
--
--            &.selected-time-date {
--                background-color: #4b77be;
--                color: #ffffff;
--            }
--        }
--    }
--
--.timepicker-container {
--    border: 1px solid #dddddd;
--    border-width: 1px 0;
--    margin: 10px -15px 10px -15px; // remove parent padding, so that we can stretch all the way to the borders
--    display: flex;
--    padding: 0px 10px;
--
--    .select-container {
--        display: flex;
--        align-items: center;
--        margin: 3px 5px;
--
--        .select {
--            width: 62px;
--        }
--    }
--
--    .colon {
--        display: flex;
--        align-items: center;
--    }
--
--    .apply-button-container {
--        flex-grow: 1;
--        display: flex;
--        justify-content: center;
--        align-items: center;
--
--        .apply-button {
--            padding: 8px 15px;
--            border-radius: 2px;
--            cursor: not-allowed;
--            color: #cccccc;
--            background-color: #ffffff;
--
--            &.active {
--                cursor: pointer;
--                color: #ffffff;
--                background-color: #2ecc71;
--            }
--        }
--    }
--}
--
--.clear-button {
--    flex-grow: 1;
--    text-align: center;
--    margin: -10px -15px -15px -15px; // remove parent padding, so that we can stretch all the way to the borders
--    padding: 15px 15px;
--    cursor: pointer;
--    color: #666666;
--}