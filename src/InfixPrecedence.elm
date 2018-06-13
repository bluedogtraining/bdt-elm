module InfixPrecedence exposing (InfixPrecedence)

{-| This module is useful to allow multiple modules to declare their own (?) infix function.

# Definition
@docs InfixPrecedence

-}

{-| This type is ony here to satisfy elm packages. Can't be created or used.

-}
type InfixPrecedence
    = InfixPrecedence Never


infix 0 ?