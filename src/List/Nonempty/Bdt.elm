module List.Nonempty.Bdt exposing (decoder)

{-| Nonempty Helpers


# Decode a Nonempty

@docs decoder

-}

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Extra as Decode
import List.Nonempty as Nonempty exposing (Nonempty)


{-| Nonempty decoder

    type alias Student =
        { firstName : String
        , courses : Nonempty Course
        }

    decoder : Decoder Student
    decoder =
        Decode.decode Student
            |> Decode.required "firstName" Decode.string
            |> Decode.required "courses" (Nonempty.decoder courseDecoder)

-}
decoder : Decoder a -> Decoder (Nonempty a)
decoder decoder_ =
    decoder_
        |> Decode.list
        |> Decode.map (Nonempty.fromList >> Result.fromMaybe "A nonempty result contained an empty list")
        |> Decode.andThen Decode.fromResult
