module Button.Size exposing (Size(..), paddingX, paddingY, icon)

import Css exposing (..)


type Size
    = Small
    | Normal


paddingX : Size -> Rem
paddingX size =

    case size of

        Small ->
            Css.rem 0.5

        Normal ->
            Css.rem 1


paddingY : Size -> Rem
paddingY size =

    case size of

        Small ->
            Css.rem 0.25

        Normal ->
            Css.rem 0.5


icon : Size -> Int
icon size =

    case size of

        Small -> 14
        Normal -> 18