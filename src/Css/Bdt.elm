module Css.Bdt exposing (styleIf)

{-| Helpers on top of Html.Styled to show/hide things

# Show Hide Elements
@docs styleIf

-}

import Css exposing (Style, indeterminate)


{-| Optionally add a Style.

    css
        [ cursor pointer |> Css.styleIf canToggle
        ]
-}
styleIf : Bool -> Style -> Style
styleIf bool style =

    if bool then style else indeterminate []