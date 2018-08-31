module Form.Helpers exposing (toHtmlId)


toHtmlId : (option -> String) -> option -> String
toHtmlId toLabel option =
    toLabel option