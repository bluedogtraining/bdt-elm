module Date.Bdt exposing
    ( toString, maybeDateToString, maybeDateToTimeString, maybeDateToDateTimeString, monthToString
    , order
    , encode, encodeMaybe
    )

{-| Date Helpers

# Print Dates
@docs toString, maybeDateToString, maybeDateToTimeString, maybeDateToDateTimeString, monthToString

# Sort Dates
@docs order

# Encode Dates
@docs encode, encodeMaybe

-}

import Date exposing (Date, Month (..), month)
import Date.Extra.Compare
import Date.Extra.Format exposing (isoString)

import Json.Encode as Encode exposing (Value)


{-| Returns a string as dd/mm/yyyy
-}
toString : Date -> String
toString date =

    let
        day =
            date
                |> Date.day
                |> Basics.toString
                |> String.pad 2 '0'

        month =
            date
                |> Date.month
                |> monthToString

        year =
            date
                |> Date.year
                |> Basics.toString

    in
        [ day, month, year ]
            |> String.join "/"


{-| Returns a string as `dd/mm/yyyy`, defaulted to `––/––/––––`
-}
maybeDateToString : Maybe Date -> String
maybeDateToString date =

    date
        |> Maybe.map toString
        |> Maybe.withDefault "––/––/––––"


{-| Returns a string as `ss:mm:hh`, defaulted to `00:00:00`
-}
maybeDateToTimeString : Maybe Date -> String
maybeDateToTimeString date =

    case date of

            Nothing ->
                "00:00:00"

            Just date ->
                [ Date.hour, Date.minute, Date.second ]
                    |> List.map (((|>) date) >> Basics.toString >> String.pad 2 '0')
                    |> List.intersperse ":"
                    |> String.concat


{-| Returns a string as `ss:mm:hh dd/mm/yyyy`, defaulted to `00:00:00 ––/––/––––`
-}
maybeDateToDateTimeString : Maybe Date -> String
maybeDateToDateTimeString date =

    maybeDateToString date ++ " " ++ maybeDateToTimeString date


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
monthToString : Month -> String
monthToString month =

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


{-| Orders 2 dates. This comes in handy with List.sortWith:

    List.sortWith Date.order [date1, date2, date3]
-}
order : Date -> Date -> Order
order date1 date2 =

    if Date.Extra.Compare.is Date.Extra.Compare.Before date1 date2 then
        LT
    else if Date.Extra.Compare.is Date.Extra.Compare.After date1 date2 then
        GT
    else
        EQ


{-| Encode a Date
-}
encode : Date -> Value
encode =
    isoString >> Encode.string

css
{-| Encode a Maybe Date
-}
encodeMaybe : Maybe Date -> Value
encodeMaybe maybeDate =

    maybeDate
        |> Maybe.map encode
        |> Maybe.withDefault Encode.null