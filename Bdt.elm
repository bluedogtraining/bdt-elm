module Date.Bdt exposing (toString, maybeDateToString)

{-| Date Helpers


# Helpers

@docs toString, maybeDateToString

-}

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
    String.join "/" [ day, month, year ]


{-| Returns a string as `dd/mm/yyyy`, defaulted to `––/––/––––`
-}
maybeDateToString : Maybe Date -> String
maybeDateToString date =
    date
        |> Maybe.map toString
        |> Maybe.withDefault "––/––/––––"
