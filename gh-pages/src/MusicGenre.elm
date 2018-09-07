module MusicGenre exposing (MusicGenre(..), asNonempty, toLabel)

import List.Nonempty exposing (Nonempty(..))


type MusicGenre
    = Rock
    | Metal
    | Blues
    | Jazz
    | Pop
    | BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop


toLabel : MusicGenre -> String
toLabel genre =
    case genre of
        Rock ->
            "Rock"

        Metal ->
            "Metal"

        Blues ->
            "Blues"

        Jazz ->
            "Jazz"

        Pop ->
            "Pop"

        BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop ->
            "Blackened Heavy progressive Alternative New-age Rockabilly Glam-core Retro-folk Neo-soul Acid-funk Doo-wop Electrical Dream-pop"


asNonempty : Nonempty MusicGenre
asNonempty =
    Nonempty Rock
        [ Metal
        , Blues
        , Jazz
        , Pop
        , BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop
        ]
