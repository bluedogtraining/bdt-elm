module Form.InputTests exposing (suite)

import Expect exposing (Expectation)
import Form.Input as Input
import Test exposing (..)


suite : Test
suite =
    describe "Test Stuff"
        [ test "test init" test1
        ]


test1 : () -> Expectation
test1 _ =
    Input.init
        |> Expect.equal Input.init
