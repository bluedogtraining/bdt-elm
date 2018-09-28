module Update exposing (update)

--import Admin.Update as Admin
--import Trainer.Update as Trainer

import Browser
import Browser.Navigation as Navigation
import Index.Update as Index
import Model exposing (Model)
import Msg exposing (Msg(..))
import Route exposing (Route(..))
import Toasters
import Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Navigate (Browser.Internal url) ->
            ( model
            , Navigation.pushUrl model.navigationKey (Url.toString url)
            )

        Navigate (Browser.External href) ->
            ( model
            , Navigation.load href
            )

        UrlChange url ->
            case Route.fromUrl url of
                Just route ->
                    ( { model | route = route }, Cmd.none )

                Nothing ->
                    ( { model | route = NotFound }, Cmd.none )

        ToastersMsg toasterMsg ->
            ( { model | toasters = Toasters.update toasterMsg model.toasters }, Cmd.none )

        ToggleAdminMenu ->
            ( { model | isAdminMenuOpen = not model.isAdminMenuOpen }, Cmd.none )

        IndexMsg indexMsg ->
            Index.update indexMsg model.index
                |> Tuple.mapFirst (\indexModel -> { model | index = indexModel })
                |> Tuple.mapSecond (Cmd.map IndexMsg)

        _ ->
            Debug.todo "todo update"



--        AdminMsg adminMsg ->
--            Admin.update adminMsg model.admin
--
--        TrainerMsg trainerMsg ->
--            Trainer.update trainerMsg model.trainer
