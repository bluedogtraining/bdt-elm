module Date.Bdt exposing (..)

{-| Date Helpers

# Init Dates
@docs fromPosix

-}

import Time exposing (Posix, Month (..))
import Date exposing (Date)


fromPosix : Posix -> Date
fromPosix posix =
    Date.fromCalendarDate
        (Time.toYear Time.utc posix)
        (Time.toMonth Time.utc posix)
        (Time.toDay Time.utc posix)


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


{-| Returns a padded Int representation of the month

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
-}
monthToStringNumber : Month -> String
monthToStringNumber =

    monthNumber >> String.fromInt >> String.padLeft 2 '0'


monthNumber : Month -> Int
monthNumber month =
    case month of
        Jan -> 1
        Feb -> 2
        Mar -> 3
        Apr -> 4
        May -> 5
        Jun -> 6
        Jul -> 7
        Aug -> 8
        Sep -> 9
        Oct -> 10
        Nov -> 11
        Dec -> 12


monthFromNumber : Int -> Month
monthFromNumber n =
    case n of
        1 -> Jan
        2 -> Feb
        3 -> Mar
        4 -> Apr
        5 -> May
        6 -> Jun
        7 -> Jul
        8 -> Aug
        9 -> Sep
        10 -> Oct
        11 -> Nov
        _ -> Dec


{-| Returns a padded Int representation of the month

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
-}
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