module Admin.View exposing (view)

import Html.Styled exposing (..)
import Admin.Page as Admin
import Admin.Msg as Admin
import Admin.Route as Admin


view : Admin.Page -> Html Admin.Msg
view page =
    div
        []
        [ text "admin view" ]
