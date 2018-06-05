module Form.MultiSelectTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Json.Decode as Decode

import List.Nonempty exposing (Nonempty (Nonempty))

import Form.MultiSelect as MultiSelect


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    MultiSelect.init (Nonempty "hi" ["ho", "haha"])
        |> Expect.equal (MultiSelect.init <| Nonempty "hi" ["ho", "haha"])