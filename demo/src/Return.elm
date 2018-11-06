module Return exposing (Return)

import BaseReturn exposing (BaseReturn)
import Entities exposing (Entities)


type alias Return msg model =
    BaseReturn Entities msg model
