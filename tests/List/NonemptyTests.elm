module List.NonemptyTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import Json.Decode as Decode

import List.Nonempty exposing (Nonempty (Nonempty))
import List.Nonempty.Bdt as Nonempty


suite : Test
suite =
    describe "Test Nonempty"
        [ test "decoder fails with gibberish" test1
        , test "decoder fails with empty list" test2
        , test "decoder pass with one item" test3
        , test "decoder pass with multiple items" test4
        ]


test1 : () -> Expectation
test1 _ =
    Decode.decodeString (Nonempty.decoder Decode.string) "hladshdgsvnl"
        |> Expect.err


test2 : () -> Expectation
test2 _ =
    Decode.decodeString (Nonempty.decoder Decode.string) "[]"
        |> Expect.err


test3 : () -> Expectation
test3 _ =
    Decode.decodeString (Nonempty.decoder Decode.string) "[\"hello\"]"
        |> Expect.equal (Ok (Nonempty "hello" []))


test4 : () -> Expectation
test4 _ =
    Decode.decodeString (Nonempty.decoder Decode.string) "[\"hello\", \"hola\", \"hi\"]"
        |> Expect.equal (Ok (Nonempty "hello" ["hola", "hi"]))