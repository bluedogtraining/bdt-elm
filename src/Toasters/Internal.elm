module Toasters.Internal exposing
    ( Msg
    , Toaster
    , add
    , init
    , subscription
    , update
    , view
    )

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Time
import Toasters.Color exposing (Color)
import Toasters.Css as Css


type alias Toaster =
    { color : Color
    , message : String
    , ticks : Int
    }


initialToaster : Color -> String -> Toaster
initialToaster color message =
    { color = color
    , message = message
    , ticks = 0
    }


type Msg
    = Tick
    | Close Toaster


init : List Toaster
init =
    []


update : Msg -> List Toaster -> List Toaster
update toasterMsg toasters =
    case toasterMsg of
        Close toaster ->
            List.filter ((/=) toaster) toasters

        Tick ->
            List.foldl tick [] toasters


tick : Toaster -> List Toaster -> List Toaster
tick toaster toasters =
    case toaster.ticks > 100 of
        True ->
            toasters

        False ->
            List.append toasters [ { toaster | ticks = toaster.ticks + 1 } ]


subscription : List Toaster -> Sub Msg
subscription toasters =
    case List.isEmpty toasters of
        False ->
            Time.every 50 (always Tick)

        True ->
            Sub.none


add : Color -> String -> List Toaster -> List Toaster
add color message toasters =
    initialToaster color message :: toasters


view : List Toaster -> Html Msg
view toasters =
    div
        [ Css.relativeContainer ]
        [ div
            [ Css.absoluteContainer ]
            [ div
                [ Css.fixedContainer ]
                (List.map item toasters)
            ]
        ]


item : Toaster -> Html Msg
item toaster =
    div
        [ Css.toaster toaster.color toaster.ticks
        , onClick <| Close toaster
        ]
        [ div
            [ Css.toasterMessage ]
            [ text toaster.message ]
        , div
            [ Css.timerBar toaster.color toaster.ticks ]
            []
        ]
