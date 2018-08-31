module Css.Bdt exposing (styleIf)

{-| Helpers on top of Html.Styled to show/hide things

# Show Hide Elements
@docs (?)

-}

import Css exposing (Style, indeterminate)


{-| Optionally add a Style.

    css
        [ cursor pointer ? canToggle
        ]
-}
styleIf : Style -> Bool -> Style
styleIf style bool =

    if bool then style else indeterminate []