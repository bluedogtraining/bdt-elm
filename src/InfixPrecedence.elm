module InfixPrecedence exposing (InfixPrecedence)

{-| This module is useful to allow multiple modules to declare their own (?) infix function.

It's sole purpose is to set `infix 0 ?`.

So if you have multiple (?) functions, simply import this module from each of them
(as the same infix precedence can't be set more than once).

# Definition
@docs InfixPrecedence

-}

{-| This type is ony here to satisfy elm packages. Can't be created or used.

-}
type InfixPrecedence
    = InfixPrecedence Never


infix 0 ?