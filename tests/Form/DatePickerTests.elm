module Form.DatePickerTests exposing (suite)

import Expect exposing (Expectation)
import Form.DatePicker as DatePicker
import Test exposing (..)


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    DatePicker.init
        |> Expect.equal DatePicker.init
