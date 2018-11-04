module Return exposing (Return)

import Entities exposing (Entities)
import BaseReturn exposing (BaseReturn)


type alias Return msg model =
    BaseReturn Entities msg model
