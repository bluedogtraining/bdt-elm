module View exposing (view)

import Admin.View as Admin
import Browser exposing (Document)
import Html.Styled as Html exposing (..)
import Html.Styled.Events exposing (..)
import Index.View as Index
import Model exposing (Model)
import Msg exposing (Msg(..))
import Route exposing (Route(..))
import Toasters
import Trainer.View as Trainer


view : Model -> Document Msg
view model =
    { title = "Title"
    , body =
        body model
            |> toUnstyled
            |> List.singleton
    }


body : Model -> Html Msg
body model =
    div
        []
        [ Toasters.view model.toasters
            |> Html.map ToastersMsg
        , menu model.isAdminMenuOpen
        , page model
        ]


menu : Bool -> Html Msg
menu isAdminMenuOpen =
    div
        []
        [ div
            []
            [ text "Index" ]
        , div
            []
            [ text "Admin" ]
        , div
            []
            [ text "Trainer" ]
        , adminMenu isAdminMenuOpen
        ]


adminMenu : Bool -> Html Msg
adminMenu isOpen =
    case isOpen of
        False ->
            text ""

        True ->
            div
                []
                [ text "Admin Menu!" ]


page : Model -> Html Msg
page model =
    case model.route of
        NotFound ->
            div
                []
                [ text "404 D:" ]

        Index ->
            model.index
                |> Index.view
                |> Html.map IndexMsg

        Admin adminRoute ->
            model.admin
                |> Admin.view adminRoute
                |> Html.map AdminMsg

        Trainer trainerRoute ->
            model.trainer
                |> Trainer.view trainerRoute
                |> Html.map TrainerMsg
