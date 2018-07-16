module Css.Bdt exposing ((?))

{-| Helpers on top of Html.Styled to show/hide things

# Show Hide Elements
@docs (?)

-}

import Css exposing (Style, indeterminate)

import InfixPrecedence


{-| Optionally add a Style.

    css
        [ cursor pointer ? canToggle
        ]
-}
(?) : Style -> Bool -> Style
(?) style bool =

    if bool then style else indeterminate []