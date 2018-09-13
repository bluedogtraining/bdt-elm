module Time.Bdt exposing
    ( toDateString, toTimeString, toDateTimeString, maybeToDateString, maybeToTimeString, maybeToDateTimeString
    , monthNumber, monthString, monthFromNumber
    , addMonths, clamp, maybeClamp
    , order
    , encode, encodeMaybe
    )

{-| Time Helpers


# Print Posix

@docs toDateString, toTimeString, toDateTimeString, maybeToDateString, maybeToTimeString, maybeToDateTimeString


# Helpers

@docs monthNumber, monthString, monthFromNumber, addMonths, clamp, maybeClamp


# Sort Times

@docs order


# Encode Times

@docs encode, encodeMaybe

-}

import Json.Encode as Encode exposing (Value)
import Time exposing (Month(..), Posix)
import Time.DateTime as DateTime


{-| Returns a string as dd/mm/yyyy
-}
toDateString : Posix -> String
toDateString date =
    let
        day =
            date
                |> Time.toDay Time.utc
                |> String.fromInt
                |> String.pad 2 '0'

        month =
            date
                |> Time.toMonth Time.utc
                |> monthNumber
                |> String.fromInt
                |> String.pad 2 '0'

        year =
            date
                |> Time.toYear Time.utc
                |> String.fromInt
    in
    [ day, month, year ]
        |> String.join "/"


{-| Returns a string as hh:mm:ss
-}
toTimeString : Posix -> String
toTimeString posix =
    let
        hour =
            posix
                |> Time.toHour Time.utc
                |> String.fromInt
                |> String.pad 2 '0'

        minute =
            posix
                |> Time.toMinute Time.utc
                |> String.fromInt
                |> String.pad 2 '0'

        second =
            posix
                |> Time.toSecond Time.utc
                |> String.fromInt
                |> String.pad 2 '0'
    in
    [ hour, minute, second ]
        |> String.join ":"


{-| Returns a string as dd/mm/yyyy hh:mm:ss
-}
toDateTimeString : Posix -> String
toDateTimeString posix =
    toDateString posix ++ " " ++ toTimeString posix


{-| Returns a string as dd/mm/yyyy. Defaults to --/--/----
-}
maybeToDateString : Maybe Posix -> String
maybeToDateString mPosix =
    mPosix
        |> Maybe.map toDateString
        |> Maybe.withDefault "--/--/----"


{-| Returns a string as hh:mm:ss. Defaults to 00:00:00
-}
maybeToTimeString : Maybe Posix -> String
maybeToTimeString mPosix =
    mPosix
        |> Maybe.map toTimeString
        |> Maybe.withDefault "00:00:00"


{-| Returns a string as hh:mm:ss dd/mm/yyyy. Defaults to --/--/---- 00:00:00
-}
maybeToDateTimeString : Maybe Posix -> String
maybeToDateTimeString mPosix =
    maybeToTimeString mPosix ++ " " ++ maybeToDateString mPosix


{-| Returns the Int representation of a month
-}
monthNumber : Month -> Int
monthNumber month =
    case month of
        Jan ->
            1

        Feb ->
            2

        Mar ->
            3

        Apr ->
            4

        May ->
            5

        Jun ->
            6

        Jul ->
            7

        Aug ->
            8

        Sep ->
            9

        Oct ->
            10

        Nov ->
            11

        Dec ->
            12


{-| Returns the String representation of a month
-}
monthString : Month -> String
monthString month =
    case month of
        Jan ->
            "January"

        Feb ->
            "February"

        Mar ->
            "March"

        Apr ->
            "April"

        May ->
            "May"

        Jun ->
            "June"

        Jul ->
            "July"

        Aug ->
            "August"

        Sep ->
            "September"

        Oct ->
            "October"

        Nov ->
            "November"

        Dec ->
            "December"


{-| Returns the Month based on it's number
-}
monthFromNumber : Int -> Month
monthFromNumber n =
    case n of
        1 ->
            Jan

        2 ->
            Feb

        3 ->
            Mar

        4 ->
            Apr

        5 ->
            May

        6 ->
            Jun

        7 ->
            Jul

        8 ->
            Aug

        9 ->
            Sep

        10 ->
            Oct

        11 ->
            Nov

        _ ->
            Dec


{-| Add months to a posix
-}
addMonths : Int -> Posix -> Posix
addMonths number posix =
    posix
        |> DateTime.fromPosix
        |> DateTime.addMonths number
        |> DateTime.toPosix


{-| Clamp a posix
-}
clamp : Posix -> Posix -> Posix -> Posix
clamp minPosix maxPosix posix =
    if Time.posixToMillis posix < Time.posixToMillis minPosix then
        minPosix

    else if Time.posixToMillis posix > Time.posixToMillis maxPosix then
        maxPosix

    else
        posix


{-| Clamp between maybe posix
-}
maybeClamp : Maybe Posix -> Maybe Posix -> Posix -> Posix
maybeClamp mMinPosix mMaxPosix posix =
    case ( mMinPosix, mMaxPosix ) of
        ( Just minPosix, Just maxPosix ) ->
            clamp minPosix maxPosix posix

        ( Just minPosix, _ ) ->
            clamp minPosix posix posix

        ( _, Just maxPosix ) ->
            clamp posix maxPosix posix

        _ ->
            posix


{-| Orders 2 dates. This comes in handy with List.sortWith:

    List.sortWith Time.order [ date1, date2, date3 ]

-}
order : Posix -> Posix -> Order
order date1 date2 =
    if Time.posixToMillis date1 > Time.posixToMillis date2 then
        LT

    else if Time.posixToMillis date1 < Time.posixToMillis date2 then
        GT

    else
        EQ


{-| Encode a Time
-}
encode : Posix -> Value
encode =
    Time.posixToMillis >> Encode.int


{-| Encode a Maybe Time
-}
encodeMaybe : Maybe Posix -> Value
encodeMaybe maybeTime =
    maybeTime
        |> Maybe.map encode
        |> Maybe.withDefault Encode.null
