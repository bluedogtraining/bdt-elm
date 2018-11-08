module Update exposing (update)

import Admin.Page as Admin
import Browser
import Browser.Navigation as Navigation
import Index.Model as Index
import Index.Update as Index
import Model exposing (Model)
import Msg exposing (Msg(..))
import Page
import Route
import Toasters
import Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.page ) of
        ( Navigate (Browser.Internal url), _ ) ->
            ( model, Navigation.pushUrl model.navigationKey (Url.toString url) )

        ( Navigate (Browser.External href), _ ) ->
            ( model, Navigation.load href )

        ( UrlChange url, _ ) ->
            case Route.fromUrl url of
                Nothing ->
                    ( { model | page = Page.NotFound }, Cmd.none )

                Just Route.Index ->
                    ( { model | page = Page.Index Index.initialModel }, Cmd.none )

                Just (Route.Admin adminRoute) ->
                    ( { model | page = Page.Admin <| Admin.fromRoute adminRoute }, Cmd.none )

                Just (Route.Trainer trainerRoute) ->
                    ( { model | page = Page.NotFound }, Cmd.none )

                Just Route.Test ->
                    ( { model | page = Page.Test }, Cmd.none )

        ( ToastersMsg toasterMsg, _ ) ->
            ( { model | toasters = Toasters.update toasterMsg model.toasters }, Cmd.none )

        ( ToggleAdminMenu, _ ) ->
            ( { model | isAdminMenuOpen = not model.isAdminMenuOpen }, Cmd.none )

        ( IndexMsg indexMsg, Page.Index indexModel ) ->
            Index.update indexMsg indexModel
                |> Tuple.mapFirst (\indexModel_ -> { model | page = Page.Index indexModel_ })
                |> Tuple.mapSecond (Cmd.map IndexMsg)

        _ ->
            Debug.todo "other updates"
