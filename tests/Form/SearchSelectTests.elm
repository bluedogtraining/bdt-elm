module Form.SearchSelectTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Json.Decode as Decode

import Form.SearchSelect as SearchSelect


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    SearchSelect.init "" Decode.string
        |> Expect.equal (SearchSelect.init "" Decode.string)