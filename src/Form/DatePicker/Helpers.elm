module Form.DatePicker.Helpers exposing (..)

import Time.Date as Date exposing (Date)
import Time.DateTime as DateTime exposing (DateTime)
import Date.Bdt as Date

import List.Extra as List

import Form.Select as Select


dateTimeToString : DateTime -> String
dateTimeToString dateTime =

    let
        hour =
            dateTime
                |> DateTime.hour
                |> String.fromInt
                |> String.pad 2 '0'

        minute =
            dateTime
                |> DateTime.minute
                |> String.fromInt
                |> String.pad 2 '0'

        second =
            dateTime
                |> DateTime.second
                |> String.fromInt
                |> String.pad 2 '0'

    in
        dateToString (DateTime.date dateTime) ++ " " ++ hour ++ ":" ++ minute ++ ":" ++ second


dateToString : Date -> String
dateToString date =
    let
        year =
            date
                |> Date.year
                |> String.fromInt

        month =
            date
                |> Date.month
                |> String.fromInt
                |> String.pad 2 '0'

        day =
            date
                |> Date.day
                |> String.fromInt
                |> String.pad 2 '0'

    in
        year ++ "/" ++ month ++ "/" ++ day



maybeClamp : Maybe Date -> Maybe Date -> Date -> Date
maybeClamp maybeMinDate maybeMaxDate date =

    case (maybeMinDate, maybeMaxDate) of

        (Just minDate, Just maxDate) ->
            clamp minDate maxDate date

        (Just minDate, _) ->
            clamp minDate date date

        (_, Just maxDate) ->
            clamp date maxDate date

        _ ->
            date


clamp : Date -> Date -> Date -> Date
clamp minDate maxDate date =

    if Date.compare date minDate == LT then
        minDate
    else if Date.compare date maxDate == GT then
        maxDate
    else
        date


previousYear : Date -> Date
previousYear date =
    Date.addMonths -12 date


previousMonth : Date -> Date
previousMonth date =
    Date.addMonths -1 date


nextMonth : Date -> Date
nextMonth date =
    Date.addMonths 1 date


nextYear : Date -> Date
nextYear date =
    Date.addMonths 12 date


dateAtDayNumber : Int -> Date -> Date
dateAtDayNumber dayNumber date =
    Date.addDays (dayNumber - 1) date


visibleDays : Date -> List (List (Bool, Int))
visibleDays navigationDate =

    let
        firstOfMonth =
            Date.setDay 1 navigationDate

        startNumber =
            Date.day firstOfMonth

        daysInMonth =
            Date.daysInMonth (Date.year navigationDate) (Date.month navigationDate)

        daysInPreviousMonth =
            previousMonth navigationDate
                |> \date -> Date.daysInMonth (Date.year date) (Date.month date)

        {-
            the 3 lists we're interested in:
                - the tail of the previous month (the disabled list at the front)
                - the current month (the enabled dates for this month)
                - the head of the next month (the disabled list as the end)
        -}

        currentMonth =
            List.range 1 daysInMonth
                |> List.map (Tuple.pair True)

        tailOfPreviousMonth =
            List.range 1 daysInPreviousMonth
                |> List.drop (daysInPreviousMonth - startNumber)
                |> List.map (Tuple.pair False)

        headOfNextMonth =
            List.range 1 (6 * 7 - startNumber - daysInMonth)
                |> List.map (Tuple.pair False)

    in
        -- bundle them up and split them in groups for each week
        tailOfPreviousMonth ++ currentMonth ++ headOfNextMonth
            |> List.groupsOf 7


isSame : Date -> Date -> Bool
isSame date1 date2 =
    Date.compare date1 date2 == EQ