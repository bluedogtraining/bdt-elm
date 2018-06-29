module Toasters exposing
    ( Model, init
    , Msg, update
    , subscription
    , addSuccess, addInfo, addWarning, addDanger
    )

import Html.Styled exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import Time


type alias Toaster =
    { context : Context
    , message : String
    , ticks : Int
    }


initialToaster : Context -> String -> Toaster
initialToaster context message =
    { context = context
    , message = message
    , ticks = 0
    }


type Context
    = Success
    | Info
    | Warning
    | Danger


type Msg
    = Tick
    | Close Toaster


type Model =
    Model (List Toaster)


init : Model
init  =
    Model []


update : Msg -> Model -> Model
update toasterMsg (Model toasters) =

    case toasterMsg of
        Close toaster ->
            toasters
                |> List.filter ((/=) toaster)
                |> Model

        Tick ->
            toasters
                |> List.foldl tick []
                |> Model


tick : Toaster -> List Toaster -> List Toaster
tick toaster toasters =

    case toaster.ticks > 100 of
        True ->
            toasters

        False ->
            List.append toasters [{ toaster | ticks = toaster.ticks + 1 }]


subscription : Model -> Sub Msg
subscription (Model toasters) =

    case List.isEmpty toasters of

        False ->
            Time.every (Time.millisecond * 50) (always Tick)

        True ->
            Sub.none


add : Context -> String -> Model -> Model
add context message (Model toasters) =

    initialToaster context message
        |> List.singleton
        |> List.append toasters
        |> Model


addInfo : String -> Model -> Model
addInfo =
    add Info


addWarning : String -> Model -> Model
addWarning =
    add Warning


addDanger : String -> Model -> Model
addDanger =
    add Danger


addSuccess : String -> Model -> Model
addSuccess =
    add Success


view : Model -> Html Msg
view (Model toasters) =

    S.relativeContainer
        []
        [ S.absoluteContainer
            []
            [ S.fixedContainer
                []
                (List.map item toasters)
            ]
        ]


item : Toaster -> Html Msg
item toaster =

    S.toaster toaster.context toaster.ticks
        []
        [ button
            [ type_ "button", class "close", onClick (toaster |> Close) ]
            [ span
                []
                [ text "×" ]
            ]
        , div
            []
            [ text toaster.message ]
        ]