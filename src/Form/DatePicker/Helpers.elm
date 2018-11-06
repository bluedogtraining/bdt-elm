module Form.DatePicker.Helpers exposing (isSameMonthAndYear, visibleDays)

import List.Extra as List
import Time exposing (Month(..), Posix)
import Time.Date as Date exposing (Weekday(..))
import Time.DateTime as DateTime


isSameMonthAndYear : Time.Zone -> Posix -> Maybe Posix -> Bool
isSameMonthAndYear timeZone posix1 mPosix2 =
    case mPosix2 of
        Just posix2 ->
            Time.toYear timeZone posix1 == Time.toYear timeZone posix2 && Time.toMonth timeZone posix1 == Time.toMonth timeZone posix2

        _ ->
            False


visibleDays : Posix -> List (List Posix)
visibleDays navigationPosix =
    let
        date =
            navigationPosix
                |> DateTime.fromPosix
                |> DateTime.date

        firstOfMonth =
            Date.setDay 1 date

        startNumber =
            firstOfMonth
                |> Date.weekday
                |> weekDayOnCalendar

        daysInMonth =
            Date.daysInMonth (Date.year date) (Date.month date)

        daysInPreviousMonth =
            Date.addMonths 1 date
                |> (\newDate -> Date.daysInMonth (Date.year newDate) (Date.month newDate))

        {-
           the 3 lists we're interested in:
               - the tail of the previous month (the disabled list at the front)
               - the current month (the enabled dates for this month)
               - the head of the next month (the disabled list as the end)
        -}
        currentMonth =
            List.range 1 daysInMonth
                |> List.map (\day -> DateTime.fromPosix navigationPosix |> DateTime.setDay day |> DateTime.toPosix)

        tailOfPreviousMonth =
            List.range 1 daysInPreviousMonth
                |> List.drop (daysInPreviousMonth - startNumber)
                |> List.map (\day -> DateTime.fromPosix navigationPosix |> DateTime.addMonths -1 |> DateTime.setDay day |> DateTime.toPosix)

        headOfNextMonth =
            List.range 1 (6 * 7 - startNumber - daysInMonth)
                |> List.map (\day -> DateTime.fromPosix navigationPosix |> DateTime.addMonths 1 |> DateTime.setDay day |> DateTime.toPosix)
    in
    -- bundle them up and split them in groups for each week
    tailOfPreviousMonth
        ++ currentMonth
        ++ headOfNextMonth
        |> List.groupsOf 7


weekDayOnCalendar : Weekday -> Int
weekDayOnCalendar weekday =
    case weekday of
        Mon ->
            0

        Tue ->
            1

        Wed ->
            2

        Thu ->
            3

        Fri ->
            4

        Sat ->
            5

        Sun ->
            6
