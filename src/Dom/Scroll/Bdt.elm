module Dom.Scroll.Bdt exposing (HorizontalScroll, onHorizontalScroll, VerticalScroll, onVerticalScroll)

{-| Dom Scroll Helpers


# String Formatting Helpers

@docs HorizontalScroll, onHorizontalScroll, VerticalScroll, onVerticalScroll

-}

import Html exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode


{-| This record is emitted by onHorizontalScroll
-}
type alias HorizontalScroll =
    { scrollWidth : Int
    , scrollLeft : Int
    , clientWidth : Int
    }


{-| Attach this event listener on DOM elements to be notified if it get's scrolled
-}
onHorizontalScroll : (HorizontalScroll -> msg) -> Attribute msg
onHorizontalScroll tagger =
    on "scroll" (Decode.map tagger onHorizontalScrollJsonParser)


onHorizontalScrollJsonParser : Decode.Decoder HorizontalScroll
onHorizontalScrollJsonParser =
    Decode.map3 HorizontalScroll
        (Decode.at [ "target", "scrollWidth" ] Decode.int)
        (Decode.at [ "target", "scrollLeft" ] Decode.int)
        (Decode.at [ "target", "clientWidth" ] Decode.int)


{-| This record is emitted by onHorizontalScroll
-}
type alias VerticalScroll =
    { scrollHeight : Int
    , scrollTop : Int
    , clientHeight : Int
    }


{-| Attach this event listener on DOM elements to be notified if it get's scrolled
-}
onVerticalScroll : (VerticalScroll -> msg) -> Attribute msg
onVerticalScroll tagger =
    on "scroll" (Decode.map tagger onVerticalScrollJsonParser)


onVerticalScrollJsonParser : Decode.Decoder VerticalScroll
onVerticalScrollJsonParser =
    Decode.map3 VerticalScroll
        (Decode.at [ "target", "scrollHeight" ] Decode.int)
        (Decode.at [ "target", "scrollTop" ] Decode.int)
        (Decode.at [ "target", "clienHeight" ] Decode.int)
