module Admin.View exposing (view)

import Html.Styled exposing (..)
import Admin.Model as Admin
import Admin.Msg as Admin
import Admin.Route as Admin


view : Admin.Route -> Admin.Model -> Html Admin.Msg
view route model =
    div
        []
        [ text "admin view" ]
