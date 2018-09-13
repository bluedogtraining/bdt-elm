module Form.FloatInputTests exposing (suite)

import Expect exposing (Expectation)
import Form.FloatInput as FloatInput
import Fuzz exposing (Fuzzer)
import Test exposing (..)


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    FloatInput.init
        |> Expect.equal FloatInput.init
