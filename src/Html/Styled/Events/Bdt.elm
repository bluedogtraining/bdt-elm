module Html.Styled.Events.Bdt exposing (onContentEditableInput)

import Html.Events
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes as Attributes
import Json.Decode as Decode exposing (Decoder)


onContentEditableInput : (String -> msg) -> Attribute msg
onContentEditableInput msg =
    hijackOn "input" (contentEditableDecoder msg)


contentEditableDecoder : (String -> msg) -> Decoder msg
contentEditableDecoder msg =
    Decode.at [ "target", "innerHTML" ] Decode.string |> Decode.map msg


hijackOn : String -> Decoder msg -> Attribute msg
hijackOn event decoder =
    Html.Events.preventDefaultOn event (Decode.map hijack decoder) |> Attributes.fromUnstyled


hijack : msg -> ( msg, Bool )
hijack msg =
    ( msg, True )
