module ResettableTests exposing (suite)

import Test exposing (..)
import Fuzz exposing (Fuzzer)
import Expect exposing (Expectation)

import Resettable


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
    [ fuzz fuzzer "getValue on original value returns the original value." test1
    , fuzz2 fuzzer fuzzer "getValue on updated value returns the updated value." test2
    , fuzz fuzzer "getOriginalValue on original value returns the original value." test3
    , fuzz2 fuzzer fuzzer "getOriginalValue on updated value returns the original value." test4
    , fuzz2 fuzzer fuzzer "getValue after reset on updated value returns the original value." test5
    , fuzz2 fuzzer fuzzer "isChanged on updated value returns true." test6
    ]


test1 : a -> Expectation
test1 originalValue =
    Resettable.init originalValue
        |> Resettable.getValue
        |> Expect.equal originalValue


test2 : a -> a -> Expectation
test2 originalValue updatedValue =
    Resettable.init originalValue
        |> Resettable.update updatedValue
        |> Resettable.getValue
        |> Expect.equal updatedValue


test3 : a -> Expectation
test3 originalValue =
    Resettable.init originalValue
        |> Resettable.getOriginalValue
        |> Expect.equal originalValue


test4 : a -> a -> Expectation
test4 originalValue updatedValue =
    Resettable.init originalValue
        |> Resettable.update updatedValue
        |> Resettable.getOriginalValue
        |> Expect.equal originalValue


test5 : a -> a -> Expectation
test5 originalValue updatedValue =
    Resettable.init originalValue
        |> Resettable.update updatedValue
        |> Resettable.reset
        |> Resettable.getValue
        |> Expect.equal originalValue


test6 : a -> a -> Expectation
test6 originalValue updatedValue =
    Resettable.init originalValue
        |> Resettable.update updatedValue
        |> Resettable.isChanged
        |> Expect.equal (originalValue /= updatedValue)