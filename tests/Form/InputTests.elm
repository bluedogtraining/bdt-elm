module Form.InputTests exposing (suite)

import Test exposing (..)
import Fuzz exposing (Fuzzer)
import Expect exposing (Expectation)

import Form.Input


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    Form.Input.init
        |> Expect.equal Form.Input.init