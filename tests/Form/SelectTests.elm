module Form.SelectTests exposing (suite)

import Expect exposing (Expectation)
import Form.Select as Select
import List.Nonempty exposing (Nonempty(..))
import Test exposing (..)


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    Select.init (Nonempty "hi" [ "ho", "haha" ])
        |> Expect.equal (Select.init <| Nonempty "hi" [ "ho", "haha" ])
