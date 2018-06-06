module MusicGenre exposing (MusicGenre (..), asList, asNonempty)

import List.Nonempty as Nonempty exposing (Nonempty)


type MusicGenre
    = Rock
    | Metal
    | Blues
    | Jazz
    | Pop


asList : List MusicGenre
asList =
    [ Rock
    , Metal
    , Blues
    , Jazz
    , Pop
    ]


asNonempty : Nonempty MusicGenre
asNonempty =
    Nonempty.fromElement Rock
        |> Nonempty.replaceTail (List.drop 1 asList)