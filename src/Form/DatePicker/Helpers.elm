module Form.DatePicker.Helpers exposing (..)

import Date exposing (Date, Month (..))

import Date.Extra.Core as Date
import Date.Extra.Create as Date
import Date.Extra.Duration as Date
import Date.Extra.Compare as Date

import List.Extra as List

import Form.Select as Select


toLabel : Date -> String
toLabel =
    dateToString


toTimeLabel : Date -> String
toTimeLabel date =
    dateToString date ++ " " ++ timeToString date


timeToString : Date -> String
timeToString date =

    [ Date.hour date, Date.minute date, Date.second date ]
        |> List.map (toString >> String.padLeft 2 '0')
        |> List.intersperse ":"
        |> String.concat


dateToString : Date -> String
dateToString date =

    let
        day =
            date
                |> Date.day
                |> toString
                |> String.pad 2 '0'

        month =
            date
                |> Date.month
                |> monthToStringNumber

        year =
            date
                |> Date.year
                |> toString

    in
        day ++ "/" ++ month ++ "/" ++ year


monthToString : Month -> String
monthToString month =

    case month of
        Jan -> "January"
        Feb -> "February"
        Mar -> "March"
        Apr -> "April"
        May -> "May"
        Jun -> "June"
        Jul -> "July"
        Aug -> "August"
        Sep -> "September"
        Oct -> "October"
        Nov -> "November"
        Dec -> "December"


monthToStringNumber : Month -> String
monthToStringNumber month =

    case month of
        Jan -> "01"
        Feb -> "02"
        Mar -> "03"
        Apr -> "04"
        May -> "05"
        Jun -> "06"
        Jul -> "07"
        Aug -> "08"
        Sep -> "09"
        Oct -> "10"
        Nov -> "11"
        Dec -> "12"


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

    if Date.is Date.Before date minDate then
        minDate
    else if Date.is Date.After date maxDate then
        maxDate
    else
        date


previousYear : Date -> Date
previousYear date =

    Date.add Date.Month -12 date


previousMonth : Date -> Date
previousMonth date =

    Date.add Date.Month -1 date


nextMonth : Date -> Date
nextMonth date =

    Date.add Date.Month 1 date


nextYear : Date -> Date
nextYear date =

    Date.add Date.Month 12 date


dateAtDayNumber : Int -> Date -> Date
dateAtDayNumber dayNumber date =

    Date.add Date.Day (dayNumber - 1) date


dateFromTime : { time | hours : Select.Model String, minutes : Select.Model String, seconds : Select.Model String, selectedDate : Maybe Date } -> Maybe Date
dateFromTime time =

    case time.selectedDate of

        Nothing ->
            Nothing

        Just selectedDate ->
            let
                year =
                    Date.year selectedDate

                month =
                    Date.month selectedDate

                day =
                    Date.day selectedDate

                hour =
                    time.hours
                        |> Select.getSelectedOption
                        |> Maybe.map (String.toInt >> Result.toMaybe)
                        |> Maybe.andThen identity
                        |> Maybe.withDefault 0

                minute =
                    time.minutes
                        |> Select.getSelectedOption
                        |> Maybe.map (String.toInt >> Result.toMaybe)
                        |> Maybe.andThen identity
                        |> Maybe.withDefault 0

                second =
                    time.seconds
                        |> Select.getSelectedOption
                        |> Maybe.map (String.toInt >> Result.toMaybe)
                        |> Maybe.andThen identity
                        |> Maybe.withDefault 0

            in
                Just (Date.dateFromFields year month day hour minute second 0)


visibleDays : Date -> List (List (Bool, Int))
visibleDays navigationDate =

    let
        firstOfMonth =
            Date.toFirstOfMonth navigationDate

        startNumber =
            Date.dayOfWeek firstOfMonth |> Date.isoDayOfWeek

        daysInMonth =
            Date.daysInMonthDate navigationDate

        daysInPreviousMonth =
            previousMonth navigationDate |> Date.daysInMonthDate

        {-
            the 3 lists we're interested in:
                - the tail of the previous month (the disabled list at the front)
                - the current month (the enabled dates for this month)
                - the head of the next month (the disabled list as the end)
        -}

        currentMonth =
            List.range 1 daysInMonth
                |> List.map ((,) True)

        tailOfPreviousMonth =
            List.range 1 daysInPreviousMonth
                |> List.drop (daysInPreviousMonth - startNumber)
                |> List.map ((,) False)

        headOfNextMonth =
            List.range 1 (6 * 7 - startNumber - daysInMonth)
                |> List.map ((,) False)

    in
        -- bundle them up and split them in groups for each week
        tailOfPreviousMonth ++ currentMonth ++ headOfNextMonth
            |> List.groupsOf 7


intsToStrings : List Int -> List String
intsToStrings ints =
    List.map (toString >> String.padLeft 2 '0') ints


isSelectOpen : { time | hours : Select.Model String, minutes : Select.Model String, seconds : Select.Model String } -> Bool
isSelectOpen { hours, minutes, seconds } =

    [ hours, minutes, seconds ]
        |> List.map Select.getIsOpen
        |> List.any ((==) True)


selectToLabel : String -> String
selectToLabel selected =
    selected


isTimeFocused : { time | focusedSelect : Maybe a } -> Bool
isTimeFocused time =
    time.focusedSelect /= Nothing