module EverySetTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

suite : Test
suite =
    describe "Test List"
        []

--import EverySet
--import EverySet.Bdt as EverySet
--
--
--suite : Test
--suite =
--    describe "Test List"
--        [ test "test toggle with existing item" test1
--        , test "test toggle with new item" test2
--        , test "test toggle roundtrip" test3
--        ]
--
--
--test1 : () -> Expectation
--test1 _ =
--    ["hi", "hello"]
--        |> EverySet.fromList
--        |> EverySet.toggle "hollaaaa"
--        |> Expect.equal (EverySet.fromList ["hi", "hello", "hollaaaa"])
--
--
--test2 : () -> Expectation
--test2 _ =
--    ["hi", "hello", "hollaaaa"]
--        |> EverySet.fromList
--        |> EverySet.toggle "hello"
--        |> Expect.equal (EverySet.fromList ["hi", "hollaaaa"])
--
--
--test3 : () -> Expectation
--test3 _ =
--    ["hi", "hello", "hollaaaa"]
--        |> EverySet.fromList
--        |> EverySet.toggle "hi"
--        |> EverySet.toggle "hi"
--        |> Expect.equal (EverySet.fromList ["hi", "hello", "hollaaaa"])