module Countries exposing (Country, countryDecoder)

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Decode


type alias Country =
    { name : String
    , altSpellings : List String
    , capital : String
    , region : String
    , population : Int
    }


countryDecoder : Decoder Country
countryDecoder =
    Decode.succeed Country
        |> Decode.required "name" Decode.string
        |> Decode.required "altSpellings" (Decode.list Decode.string)
        |> Decode.required "capital" Decode.string
        |> Decode.required "region" Decode.string
        |> Decode.required "population" Decode.int
