module Tuple.Bdt exposing ((~))

import InfixPrecedence


(~) : a -> b -> (a, b)
(~) a b =
    (a, b)