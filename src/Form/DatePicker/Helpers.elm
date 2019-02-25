module Form.DatePicker.Helpers exposing (isSameMonthAndYear, visibleDays)

import List.Extra as List
import Time exposing (Month(..), Posix)
import Time.Extra as Time
import Time.Bdt as Time
import Date.Bdt as Date
import Date

isSameMonthAndYear : Time.Zone -> Posix -> Maybe Posix -> Bool
isSameMonthAndYear timeZone posix1 mPosix2 =
    case mPosix2 of
        Just posix2 ->
            Time.toYear timeZone posix1 == Time.toYear timeZone posix2 && Time.toMonth timeZone posix1 == Time.toMonth timeZone posix2

        _ ->
            False


visibleDays : Time.Zone -> Posix -> List (List Posix)
visibleDays timeZone navigationPosix =
    let
        date =
            navigationPosix
                |> Date.fromPosix timeZone

        firstOfMonth =
            Date.firstOfMonth date

        startNumber =
            firstOfMonth
                |> Date.weekday
                |> Date.weekdayToNumber
                -- We need zero-starting weekdays, but this library starts Monday as 1
                |> (\weekdayNumber -> weekdayNumber - 1)

        daysInMonth =
            Date.diff Date.Days (firstOfMonth) (Date.firstOfNextMonth date)

        previousMonth =
            Date.add Date.Months -1 date

        daysInPreviousMonth =
            Date.diff Date.Days (Date.firstOfMonth previousMonth) (Date.firstOfNextMonth previousMonth)

        {-
           the 3 lists we're interested in:
               - the tail of the previous month (the disabled list at the front)
               - the current month (the enabled dates for this month)
               - the head of the next month (the disabled list as the end)
        -}
        currentMonth =
            List.range 1 daysInMonth
                |> List.map (\day -> navigationPosix |> Time.setDay timeZone day)

        tailOfPreviousMonth =
            List.range 1 daysInPreviousMonth
                |> List.drop (daysInPreviousMonth - startNumber)
                |> List.map (\day -> navigationPosix |> Time.addMonths timeZone -1 |> Time.setDay timeZone day)

        headOfNextMonth =
            List.range 1 (6 * 7 - startNumber - daysInMonth)
                |> List.map (\day -> navigationPosix |> Time.addMonths timeZone 1 |> Time.setDay timeZone day)
    in
    -- bundle them up and split them in groups for each week
    tailOfPreviousMonth
        ++ currentMonth
        ++ headOfNextMonth
        |> List.groupsOf 7
