module Form.SearchSelectTests exposing (suite)

import Expect exposing (Expectation)
import Form.SearchSelect as SearchSelect
import Json.Decode as Decode
import Test exposing (..)


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    SearchSelect.init "" Decode.string
        |> Expect.equal (SearchSelect.init "" Decode.string)
