module StringFormatting exposing (phoneNumber)

{-| String Formatting Helpers

# String Formatting Helpers
@docs phoneNumber

-}

{-| Returns a string as `xxxx xxx xxx`
-}
phoneNumber : String -> String
phoneNumber number =

    String.join " " [String.slice 0 4 number, String.slice 4 7 number, String.slice 7 10 number]