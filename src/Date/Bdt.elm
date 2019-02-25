module Date.Bdt exposing (..)

import Date exposing (Date, Unit(..))



firstOfMonth : Date -> Date
firstOfMonth date =
    Date.floor Date.Month date


firstOfNextMonth : Date -> Date
firstOfNextMonth date =
    firstOfMonth date
        |> Date.add Months 1