module AnySetTests exposing (suite)

import Expect exposing (Expectation)
import Set.Any as AnySet exposing (AnySet)
import Set.Any.Bdt as AnySet
import Test exposing (..)


suite : Test
suite =
    describe "Test AnySet"
        [ test "test toggle when missing" test1
        , test "test toggle when existing" test2
        , test "test test double toggle when missing" test3
        , test "test test double toggle when existing" test4
        ]


type alias Item =
    { name : String
    }


item : Item
item =
    Item "alfred"


test1 : () -> Expectation
test1 _ =
    AnySet.empty .name
        |> AnySet.toggle item
        |> AnySet.member item
        |> Expect.equal True


test2 : () -> Expectation
test2 _ =
    AnySet.singleton item .name
        |> AnySet.toggle item
        |> AnySet.member item
        |> Expect.equal False


test3 : () -> Expectation
test3 _ =
    AnySet.empty .name
        |> AnySet.toggle item
        |> AnySet.toggle item
        |> AnySet.member item
        |> Expect.equal False


test4 : () -> Expectation
test4 _ =
    AnySet.singleton item .name
        |> AnySet.toggle item
        |> AnySet.toggle item
        |> AnySet.member item
        |> Expect.equal True
