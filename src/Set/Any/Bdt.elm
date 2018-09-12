module Set.Any.Bdt exposing (toggle)

import Set.Any as AnySet exposing (AnySet)


toggle : a -> AnySet comparable a -> AnySet comparable a
toggle item set =
    if AnySet.member item set then
        AnySet.remove item set
    else
        AnySet.insert item set