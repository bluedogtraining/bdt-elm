module Form.MultiSelectTests exposing (suite)

import Expect exposing (Expectation)
import Form.MultiSelect as MultiSelect
import Json.Decode as Decode
import List.Nonempty exposing (Nonempty(..))
import Test exposing (..)


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    MultiSelect.init (Nonempty "hi" [ "ho", "haha" ])
        |> Expect.equal (MultiSelect.init <| Nonempty "hi" [ "ho", "haha" ])
