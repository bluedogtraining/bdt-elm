module Date.Bdt exposing (toString, maybeDateToString, monthNumber, monthToString)

{-| Date Helpers

# Helpers
@docs toString, maybeDateToString, monthNumber, monthToString

-}

import Time exposing (Month (..))
import Time.Date as Date exposing (Date)


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
                |> Date.month
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



{-| Returns the Int representation of the month

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
-}
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