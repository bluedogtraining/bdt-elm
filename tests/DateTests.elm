module DateTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Time.Date as Date
import Date.Bdt as Date


suite : Test
suite =
    describe "Test Date"
        [ test "test toString" test1
        , test "test maybeDateToString with Just" test2
        , test "test maybeDateToString with Nothing" test3
--        , test "test maybeDateToTimeString with Just" test4
--        , test "test maybeDateToTimeString with Nothing" test5
--        , test "test maybeDateToDateTimeString with Just" test6
--        , test "test maybeDateToDateTimeString with Nothing" test7
        , test "test order" test8
        ]


test1 : () -> Expectation
test1 _ =
    Date.toString (Date.date 2016 11 28)
        |> Expect.equal "28/11/2016"


test2 : () -> Expectation
test2 _ =
    Date.maybeDateToString (Just <| Date.date 2019 1 8)
        |> Expect.equal "08/01/2019"


test3 : () -> Expectation
test3 _ =
    Date.maybeDateToString Nothing
        |> Expect.equal "––/––/––––"


--test4 : () -> Expectation
--test4 _ =
--    Date.maybeDateToTimeString (Just <| Date.fromRataDie <| 1531)
--        |> Expect.equal "17:43:07"
--
--
--test5 : () -> Expectation
--test5 _ =
--    Date.maybeDateToTimeString Nothing
--        |> Expect.equal "00:00:00"
--
--
--test6 : () -> Expectation
--test6 _ =
--    Date.maybeDateToDateTimeString (Just <| Date.fromRataDie <| 1531 )
--        |> Expect.equal "09/07/2018 17:43:07"
--
--
--test7 : () -> Expectation
--test7 _ =
--    Date.maybeDateToDateTimeString Nothing
--        |> Expect.equal "––/––/–––– 00:00:00"


test8 : () -> Expectation
test8 _ =
    [ Date.date 2019 10 8
    , Date.date 2017 1 20
    , Date.date 2049 17 8
    , Date.date 2019 1 5
    ]
        |> List.sortWith Date.compare
        |> Expect.equal
            [ Date.date 2017 1 20
            , Date.date 2019 1 5
            , Date.date 2019 10 8
            , Date.date 2049 17 8
            ]