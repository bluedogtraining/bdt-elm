module Form.Helpers exposing (toHtmlId)

import Http
import String.Extra as String


toHtmlId : option -> String
toHtmlId option =
    option
        |> toString
        |> Http.encodeUri
        |> String.replace "%" ""