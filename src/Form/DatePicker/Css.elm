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


title : Bool -> Attribute msg
title isFaded =

    css <| Css.title isFaded


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
        ]


offsetYearArrow : Attribute msg
offsetYearArrow =

    css
        [ marginRight <| px -12
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

    css <|
        [ displayFlex
        , flexBasis <| px 0
        , flexGrow <| int 1
        , justifyContent center
        , alignItems center
        , padding <| px 8
        , margin <| px 3
        , borderRadius <| px 2
        , cursor <| if isSelectable then pointer else notAllowed
        ]
        ++
        calendarDayItemColors isSelected isSelectedTimeDate isSelectable


calendarDayItemColors : Bool -> Bool -> Bool -> List Style
calendarDayItemColors isSelected isSelectedTimeDate isSelectable =

    case (isSelected, isSelectedTimeDate, isSelectable) of

        (_, _, False) ->
            [ backgroundColor <| hex "fbfbfb"
            , color <| hex "dddddd"
            ]

        (True, _, _) ->
            [ backgroundColor <| hex "6bb9f0"
            , color <| hex "ffffff"
            ]

        (_, True, _) ->
            [ backgroundColor <| hex "4b77be"
            , color <| hex "ffffff"
                , hover
                    [ backgroundColor <| hex "6bb9f0"
                    , color <| hex "ffffff"
                    ]
            ]

        _ ->
            [ backgroundColor <| hex "f3f3f3"
            , color <| hex "666666"
                , hover
                    [ backgroundColor <| hex "6bb9f0"
                    , color <| hex "ffffff"
                    ]
            ]


clearButton : Bool -> Attribute msg
clearButton isActive =

    css
        [ border3 (px 0) solid (hex "dddddd")
        , borderTopWidth <| px 1
        , margin4 (px 10) (px -15) (px -10) (px -15)
        , displayFlex
        , padding4 (px 10) (px 10) (px 5) (px 10)
        , flexGrow <| int 1
        , justifyContent center
        , cursor <| if isActive then pointer else notAllowed
        , color <| if isActive then hex "444444" else hex "dddddd"
        ]


timePickerContainer : Attribute msg
timePickerContainer =

    css
        [ border3 (px 0) solid (hex "dddddd")
        , borderTopWidth <| px 1
        , margin4 (px 10) (px -15) (px -10) (px -15)
        , displayFlex
        , padding2 (px 0) (px 10)
        ]


selectContainer : Attribute msg
selectContainer =

    css
        [ displayFlex
        , alignItems center
        , margin2 (px 3) (px 5)
        ]


select : Attribute msg
select =

    css
        [ width <| px 62
        ]


colon : Attribute msg
colon =

    css
        [ displayFlex
        , alignItems center
        ]


applyButtonContainer : Attribute msg
applyButtonContainer =

    css
        [ flexGrow <| int 1
        , displayFlex
        , justifyContent center
        , alignItems center
        ]


applyButton : Bool -> Attribute msg
applyButton isActive =

    css
        [ padding2 (px 8) (px 15)
        , borderRadius <| px 2
        , cursor <| if isActive then pointer else notAllowed
        , color <| if isActive then hex "ffffff" else hex "cccccc"
        , backgroundColor <| if isActive then hex "2ecc71" else hex "ffffff"
        ]