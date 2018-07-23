module MusicGenre exposing (MusicGenre (..), asList, toLabel, asNonempty)

import List.Nonempty as Nonempty exposing (Nonempty)


type MusicGenre
    = Rock
    | Metal
    | Blues
    | Jazz
    | Pop
    | BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop


asList : List MusicGenre
asList =
    [ Rock
    , Metal
    , Blues
    , Jazz
    , Pop
    , BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop
    ]


toLabel : MusicGenre -> String
toLabel genre =

    case genre of

        BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop ->
            "Blackened Heavy progressive Alternative New-age Rockabilly Glam-core Retro-folk Neo-soul Acid-funk Doo-wop Electrical Dream-pop"

        _ ->
            toString genre


asNonempty : Nonempty MusicGenre
asNonempty =
    Nonempty.fromElement Rock
        |> Nonempty.replaceTail (List.drop 1 asList)