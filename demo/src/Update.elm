module Update exposing (update)

import Admin.Update as Admin
import BaseReturn as Return
import Browser
import Browser.Navigation as Navigation
import Index.Model as Index
import Index.Update as Index
import Model exposing (Model)
import Msg exposing (Msg(..))
import Page
import Return exposing (Return)
import Route
import Toasters
import Url


update : Msg -> Return Msg Model -> Return Msg Model
update msg return =
    case msg of
        Navigate (Browser.Internal url) ->
            return
                |> Return.addCmd (Navigation.pushUrl (Return.get .navigationKey return) (Url.toString url))

        Navigate (Browser.External href) ->
            return
                |> Return.addCmd (Navigation.load href)

        UrlChange url ->
            case Route.fromUrl url of
                Nothing ->
                    return
                        |> Return.map (\model -> { model | page = Page.NotFound })

                Just Route.Index ->
                    return
                        |> Return.map (\model -> { model | page = Page.Index Index.initialModel })

                Just (Route.Admin adminRoute) ->
                    return
                        |> Return.map (\model -> { model | page = Page.NotFound })

                Just (Route.Trainer trainerRoute) ->
                    return
                        |> Return.map (\model -> { model | page = Page.NotFound })

        ToastersMsg toasterMsg ->
            return
                |> Return.map (\model -> { model | toasters = Toasters.update toasterMsg model.toasters })

        ToggleAdminMenu ->
            return
                |> Return.map (\model -> { model | isAdminMenuOpen = not model.isAdminMenuOpen })

        IndexMsg indexMsg ->
            Debug.todo "trainer update"

        --            Index.update indexMsg model.index
        --                |> Tuple.mapFirst (\indexModel -> { model | index = indexModel })
        --                |> Tuple.mapSecond (Cmd.map IndexMsg)
        AdminMsg adminMsg ->
            --            Admin.update adminMsg model.admin
            --                |> Tuple.mapFirst (\adminModel -> { model | admin = adminModel })
            --                |> Tuple.mapSecond (Cmd.map AdminMsg)
            Debug.todo "admin update"

        TrainerMsg trainerMsg ->
            Debug.todo "trainer update"
