module StringFormatting exposing (mobileNumber)

{-| String Formatting Helpers

# String Formatting Helpers
@docs mobileNumber

-}

{-| Returns a string as `xxxx xxx xxx`
-}
mobileNumber : String -> String
mobileNumber number =

    String.join " " [String.slice 0 4 number, String.slice 4 7 number, String.slice 7 10 number]