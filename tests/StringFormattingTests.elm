module StringFormattingTests exposing (suite)

import Expect exposing (Expectation)
import StringFormatting
import Test exposing (..)


suite : Test
suite =
    describe "Test Date"
        [ test "test mobileNumber " test1
        ]


test1 : () -> Expectation
test1 _ =
    StringFormatting.mobileNumber "0435251028"
        |> Expect.equal "0435 251 028"
