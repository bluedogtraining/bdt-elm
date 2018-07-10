module StringFormattingTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import StringFormatting


suite : Test
suite =
    describe "Test Date"
        [ test "test mobileNumber " test1
        ]


test1 : () -> Expectation
test1 _ =
    StringFormatting.mobileNumber "0435251028"
        |> Expect.equal "0435 251 028"