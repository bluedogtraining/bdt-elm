module Css.Bdt exposing ((?))

import Css exposing (Style, indeterminate)

import InfixPrecedence


(?) : Style -> Bool -> Style
(?) style bool =

    if bool then style else indeterminate []