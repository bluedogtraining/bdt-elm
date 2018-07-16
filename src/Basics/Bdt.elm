module Basics.Bdt exposing (lift2)

{-| Basics Helpers

# Lifting
@docs lift2

-}

{-| Lift things

    List.sortWith (lift2 .date Date.order) list

-}
lift2 : (a -> b) -> (b -> b -> c) -> a -> a -> c
lift2 f g a1 a2 =
    g (f a1) (f a2)