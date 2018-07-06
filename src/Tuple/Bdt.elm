module Tuple.Bdt exposing ((~))

{-| Silly module to write tuples with the ~ (noodle) operator

# Create Tuple
@docs (~)

-}

import InfixPrecedence


{-| Create a Tuple.

    "Hello" ~ "Sir" == ("Hello", "Sir")
-}
(~) : a -> b -> (a, b)
(~) a b =
    (a, b)