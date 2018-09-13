module Set.Any.Bdt exposing (toggle)

{-| Set.Any Helpers


# Helpers

@docs toggle

-}

import Set.Any as AnySet exposing (AnySet)


{-| Toggle an item (add if not existing, remove if existing)
-}
toggle : a -> AnySet comparable a -> AnySet comparable a
toggle item set =
    if AnySet.member item set then
        AnySet.remove item set

    else
        AnySet.insert item set
