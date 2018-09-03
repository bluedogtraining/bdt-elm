module Form.SelectTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import List.Nonempty exposing (Nonempty (..))

import Form.Select as Select


suite : Test
suite =
    describe "Test Stuff"
        [ test "test" test1
        ]


test1 : () -> Expectation
test1 _ =
    Select.init (Nonempty "hi" ["ho", "haha"])
        |> Expect.equal (Select.init <| Nonempty "hi" ["ho", "haha"])