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

import Time exposing (Posix, Month (..))

import Json.Encode as Encode exposing (Value)


{-| Returns a string as dd/mm/yyyy
-}
toString : Posix -> String
toString date =

    let
        day =
            date
                |> Time.toDay Time.utc
                |> String.fromInt
                |> String.pad 2 '0'

        month =
            date
                |> Time.toMonth Time.utc
                |> monthToString

        year =
            date
                |> Time.toYear Time.utc
                |> String.fromInt

    in
        [ day, month, year ]
            |> String.join "/"


{-| Returns a string as `dd/mm/yyyy`, defaulted to `––/––/––––`
-}
maybeDateToString : Maybe Posix -> String
maybeDateToString date =

    date
        |> Maybe.map toString
        |> Maybe.withDefault "––/––/––––"


{-| Returns a string as `ss:mm:hh`, defaulted to `00:00:00`
-}
maybeDateToTimeString : Maybe Posix -> String
maybeDateToTimeString mDate =

    case mDate of
        Nothing ->
            "00:00:00"

        Just date ->
            [ Time.toHour, Time.toMinute, Time.toSecond ]
                |> List.map (\f -> f Time.utc)
                |> List.map (((|>) date) >> String.fromInt >> String.pad 2 '0')
                |> List.intersperse ":"
                |> String.concat


{-| Returns a string as `ss:mm:hh dd/mm/yyyy`, defaulted to `00:00:00 ––/––/––––`
-}
maybeDateToDateTimeString : Maybe Posix -> String
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
order : Posix -> Posix -> Order
order date1 date2 =

    if Time.posixToMillis date1 > Time.posixToMillis date2 then
        LT
    else if Time.posixToMillis date1 < Time.posixToMillis date2 then
        GT
    else
        EQ


{-| Encode a Date
-}
encode : Posix -> Value
encode =
    Time.posixToMillis >> Encode.int


{-| Encode a Maybe Date
-}
encodeMaybe : Maybe Posix -> Value
encodeMaybe maybeDate =

    maybeDate
        |> Maybe.map encode
        |> Maybe.withDefault Encode.null


fromPosix : Time.Zone -> Time.Posix -> Date
fromPosix zone posix =
    Date.fromCalendarDate
        (Time.toYear zone posix)
        (Time.toMonth zone posix)
        (Time.toDay zone posix)