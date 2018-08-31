module DateTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Time exposing (Posix)

import Date.Bdt as Date


suite : Test
suite =
    describe "Test Date"
        [ test "test toString" test1
        , test "test maybeDateToString with Just" test2
        , test "test maybeDateToString with Nothing" test3
        , test "test maybeDateToTimeString with Just" test4
        , test "test maybeDateToTimeString with Nothing" test5
        , test "test maybeDateToDateTimeString with Just" test6
        , test "test maybeDateToDateTimeString with Nothing" test7
        , test "test order" test8
        ]


test1 : () -> Expectation
test1 _ =
    Date.toString (Time.millisToPosix <| 1531122187 * 1000)
        |> Expect.equal "09/07/2018"


test2 : () -> Expectation
test2 _ =
    Date.maybeDateToString (Just <| Time.millisToPosix <| 1531122187 * 1000)
        |> Expect.equal "09/07/2018"


test3 : () -> Expectation
test3 _ =
    Date.maybeDateToString Nothing
        |> Expect.equal "––/––/––––"


test4 : () -> Expectation
test4 _ =
    Date.maybeDateToTimeString (Just <| Time.millisToPosix <| 1531122187 * 1000)
        |> Expect.equal "17:43:07"


test5 : () -> Expectation
test5 _ =
    Date.maybeDateToTimeString Nothing
        |> Expect.equal "00:00:00"


test6 : () -> Expectation
test6 _ =
    Date.maybeDateToDateTimeString (Just <| Time.millisToPosix <| 1531122187 * 1000)
        |> Expect.equal "09/07/2018 17:43:07"


test7 : () -> Expectation
test7 _ =
    Date.maybeDateToDateTimeString Nothing
        |> Expect.equal "––/––/–––– 00:00:00"


test8 : () -> Expectation
test8 _ =
    [ Time.millisToPosix (1531122187 * 1000)
    , Time.millisToPosix (1431022187 * 1000)
    , Time.millisToPosix (1631522187 * 1000)
    , Time.millisToPosix (1501522187 * 1000)
    ]
        |> List.sortWith Date.order
        |> Expect.equal
            [ Time.millisToPosix (1431022187 * 1000)
            , Time.millisToPosix (1501522187 * 1000)
            , Time.millisToPosix (1531122187 * 1000)
            , Time.millisToPosix (1631522187 * 1000)
            ]