module Form.IntInputTests exposing (suite)

import Test exposing (..)
import Fuzz exposing (Fuzzer)
import Expect exposing (Expectation)

import Form.IntInput as IntInput


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    IntInput.init
        |> Expect.equal (IntInput.init)