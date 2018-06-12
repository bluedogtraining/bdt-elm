module Form.TextAreaTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Form.TextArea as TextArea


suite : Test
suite =
    describe "Test Stuff"
        [ test "test init" test1
        ]


test1 : () -> Expectation
test1 _ =
    TextArea.init
        |> Expect.equal TextArea.init