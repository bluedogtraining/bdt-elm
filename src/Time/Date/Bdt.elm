module Time.Date.Bdt exposing (fromPosix)

import Time exposing (Posix)
import Time.Bdt as Time
import Time.Date as Date exposing (Date)


fromPosix : Posix -> Date
fromPosix posix =
    Date.date
        (Time.toYear Time.utc posix)
        (Time.toMonth Time.utc posix |> Time.monthNumber)
        (Time.toDay Time.utc posix)