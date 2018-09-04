module Date.Bdt exposing (..)

{-| Date Helpers

# Init Dates
@docs fromPosix

-}

import Time exposing (Posix)
import Date exposing (Date)


fromPosix : Posix -> Date
fromPosix posix =
    Date.fromCalendarDate
        (Time.toYear Time.utc posix)
        (Time.toMonth Time.utc posix)
        (Time.toDay Time.utc posix)


firstOfMonth : Date -> Date
firstOfMonth date =
    Date.add Date.Months -(Date.monthNumber date + 1) date


daysInMonth : Date -> Int
daysInMonth date =
    date
        |> Date.add Date.Months 1
        |> firstOfMonth
        |> Date.add Date.Days -1
        |> Date.day


{-| Orders 2 dates. This comes in handy with List.sortWith:

    List.sortWith Time.order [date1, date2, date3]
-}
order : Date -> Date -> Order
order date1 date2 =

    if Date.toRataDie date1 < Date.toRataDie date2 then
        LT
    else if Date.toRataDie date1 > Date.toRataDie date2 then
        GT
    else
        EQ


{-| Returns a string as dd/mm/yyyy
-}
toString : Date -> String
toString date =

    let
        day =
            date
                |> Date.day
                |> String.fromInt
                |> String.pad 2 '0'

        month =
            date
                |> Date.monthNumber
                |> String.fromInt
                |> String.pad 2 '0'

        year =
            date
                |> Date.year
                |> String.fromInt

    in
        String.join "/" [day, month, year]


{-| Returns a string as `dd/mm/yyyy`, defaulted to `––/––/––––`
-}
maybeDateToString : Maybe Date -> String
maybeDateToString date =

    date
        |> Maybe.map toString
        |> Maybe.withDefault "––/––/––––"