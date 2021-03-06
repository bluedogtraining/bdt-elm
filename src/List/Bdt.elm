module List.Bdt exposing (groupWhile)

{-| List Helpers


# Grouping

@docs groupWhile

-}

import List.Extra as List
import List.Nonempty as Nonempty exposing (Nonempty(..))


{-| Group while a condition holds true

    [ { name = "One", date = Time.second * 1 |> Date.fromTime }
    , { name = "Two", date = Time.second * 2 |> Date.fromTime }
    , { name = "Three", date = Time.second * 1 |> Date.fromTime }
    ]
        |> List.sortWith (\rec1 rec2 -> Date.order rec1.date rec2.date)
        |> List.groupWhile (\rec1 rec2 -> rec1.date == rec2.date)

    Will result in:

    [ Nonempty { name = "One", date = Time.second * 1 |> Date.fromTime } [ { name = "Three", date = Time.second * 1 |> Date.fromTime } ]
    , Nonempty { name = "Two", date = Time.second * 2 |> Date.fromTime } []
    ]

    If we didn't sort, we would be getting, :

    [ Nonempty { name = "One", number = 1 } []
    , Nonempty { name = "Two", number = 2 } []
    , Nonempty { name = "Three", number = 1 } []
    ]

-}
groupWhile : (a -> a -> Bool) -> List a -> List (Nonempty a)
groupWhile eq xs_ =
    case xs_ of
        [] ->
            []

        x :: xs ->
            let
                ( ys, zs ) =
                    List.span (eq x) xs
            in
            Nonempty x ys :: groupWhile eq zs
