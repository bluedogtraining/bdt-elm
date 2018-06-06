module StarWars exposing (Character, characterDecoder)

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Decode


type alias Character =
    { name : String
    , hairColor : String
    , gender : String
    }


characterDecoder : Decoder Character
characterDecoder =
    Decode.decode Character
        |> Decode.required "name" Decode.string
        |> Decode.required "hairColor" Decode.string
        |> Decode.required "gender" Decode.string