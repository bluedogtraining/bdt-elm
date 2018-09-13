module ResettableTests exposing (suite)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Resettable
import Test exposing (..)


suite : Test
suite =
    describe "Test Getters with: "
        [ describe "Fuzz.string" (tests Fuzz.string)
        , describe "Fuzz.bool" (tests Fuzz.bool)
        , describe "Fuzz.int" (tests Fuzz.int)
        , describe "Fuzz.char" (tests Fuzz.char)
        , describe "Fuzz.maybe" (tests (Fuzz.maybe Fuzz.string))
        , describe "Fuzz.order" (tests Fuzz.order)
        ]


tests : Fuzzer a -> List Test
tests fuzzer =
    [ fuzz fuzzer "getValue on initial value returns the initial value." test1
    , fuzz2 fuzzer fuzzer "getValue on updated value returns the updated value." test2
    , fuzz fuzzer "getInitialValue on initial value returns the initial value." test3
    , fuzz2 fuzzer fuzzer "getInitialValue on updated value returns the initial value." test4
    , fuzz2 fuzzer fuzzer "getValue after reset on updated value returns the initial value." test5
    , fuzz2 fuzzer fuzzer "isChanged on updated value returns true." test6
    ]


test1 : a -> Expectation
test1 initialValue =
    Resettable.init initialValue
        |> Resettable.getValue
        |> Expect.equal initialValue


test2 : a -> a -> Expectation
test2 initialValue updatedValue =
    Resettable.init initialValue
        |> Resettable.update updatedValue
        |> Resettable.getValue
        |> Expect.equal updatedValue


test3 : a -> Expectation
test3 initialValue =
    Resettable.init initialValue
        |> Resettable.getInitialValue
        |> Expect.equal initialValue


test4 : a -> a -> Expectation
test4 initialValue updatedValue =
    Resettable.init initialValue
        |> Resettable.update updatedValue
        |> Resettable.getInitialValue
        |> Expect.equal initialValue


test5 : a -> a -> Expectation
test5 initialValue updatedValue =
    Resettable.init initialValue
        |> Resettable.update updatedValue
        |> Resettable.reset
        |> Resettable.getValue
        |> Expect.equal initialValue


test6 : a -> a -> Expectation
test6 initialValue updatedValue =
    Resettable.init initialValue
        |> Resettable.update updatedValue
        |> Resettable.getIsChanged
        |> Expect.equal (initialValue /= updatedValue)
