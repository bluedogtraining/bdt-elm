module View exposing (view)

import Admin.Route as Route
import Admin.View as Admin
import Browser exposing (Document)
import Html.Styled as Html exposing (..)
import Html.Styled.Events exposing (..)
import Index.View as Index
import Model exposing (Model)
import Msg exposing (Msg(..))
import Route
import Page
import Toasters
import Trainer.Route as Route
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
        [ a
            [ Route.href Route.Index ]
            [ text "Index" ]
        , a
            [ Route.href <| Route.Admin Route.Courses ]
            [ text "Admin" ]
        , a
            [ Route.href <| Route.Trainer Route.TrainingPlan ]
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
    case model.page of
        Page.NotFound ->
            div
                []
                [ text "404 D:" ]

        Page.Index indexModel ->
            indexModel
                |> Index.view
                |> Html.map IndexMsg

        Page.Admin adminPage ->
            adminPage
                |> Admin.view
                |> Html.map AdminMsg

        Page.Trainer trainerPage ->
            Debug.todo "trainer view"
