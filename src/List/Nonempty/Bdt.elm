module List.Nonempty.Bdt exposing (decoder)

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Extra as Decode

import List.Nonempty as Nonempty exposing (Nonempty)


decoder : Decoder a -> Decoder (Nonempty a)
decoder decoder =

    decoder
        |> Decode.list
        |> Decode.map (Nonempty.fromList >> (Result.fromMaybe "A nonempty result contained an empty list"))
        |> Decode.andThen Decode.fromResult