module DateTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Date
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
    Date.toString (Date.fromRataDie <| 736194)
        |> Expect.equal "18/08/2016"


test2 : () -> Expectation
test2 _ =
    Date.maybeDateToString (Just <| Date.fromRataDie <| 736296)
        |> Expect.equal "28/11/2016"


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
    [ Date.fromRataDie 1531
    , Date.fromRataDie 1431
    , Date.fromRataDie 1631
    , Date.fromRataDie 1501
    ]
        |> List.sortWith Date.order
        |> Expect.equal
            [ Date.fromRataDie 1431
            , Date.fromRataDie 1501
            , Date.fromRataDie 1531
            , Date.fromRataDie 1631
            ]