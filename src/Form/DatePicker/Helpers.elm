module Form.DatePicker.Helpers exposing (..)

import Time exposing (Posix, Month (..))

import List.Extra as List

import Form.Select as Select


toLabel : Posix -> String
toLabel =
    dateToString


toTimeLabel : Posix -> String
toTimeLabel date =
    dateToString date ++ " " ++ timeToString date


timeToString : Posix -> String
timeToString date =

    [ Time.toHour Time.utc date, Time.toMinute Time.utc date, Time.toSecond Time.utc date ]
        |> List.map (String.fromInt >> String.padLeft 2 '0')
        |> List.intersperse ":"
        |> String.concat


dateToString : Posix -> String
dateToString date =

    let
        day =
            date
                |> Time.toDay Time.utc
                |> String.fromInt
                |> String.pad 2 '0'

        month =
            date
                |> Time.toMonth Time.utc
                |> monthToStringNumber

        year =
            date
                |> Time.toYear Time.utc
                |> String.fromInt

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


maybeClamp : Maybe Posix -> Maybe Posix -> Posix -> Posix
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


clamp : Posix -> Posix -> Posix -> Posix
clamp minDate maxDate date =

    if Time.posixToMillis date < Time.posixToMillis minDate then
        minDate
    else if Time.posixToMillis date > Time.posixToMillis maxDate then
        maxDate
    else
        date



previousYear : Posix -> Posix
previousYear date =

    Date.add Date.Month -12 date


previousMonth : Posix -> Posix
previousMonth date =

    Date.add Date.Month -1 date


nextMonth : Posix -> Posix
nextMonth date =

    Date.add Date.Month 1 date


nextYear : Posix -> Posix
nextYear date =

    Date.add Date.Month 12 date


dateAtDayNumber : Int -> Posix -> Posix
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
                    Time.toYear Time.utc selectedDate

                month =
                    Time.toMonth Time.utc selectedDate

                day =
                    Time.toDay Time.utc selectedDate

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


visibleDays : Posix -> List (List (Bool, Int))
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


intsToStrings : List Int -> List String
intsToStrings ints =
    List.map (String.fromInt >> String.padLeft 2 '0') ints


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