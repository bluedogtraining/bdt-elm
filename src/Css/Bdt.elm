module Css.Bdt exposing ((?))

import Css exposing (Style, indeterminate)


(?) : Style -> Bool -> Style
(?) style bool =

    if bool then style else indeterminate []


infix 0 ?