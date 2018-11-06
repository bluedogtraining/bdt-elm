module Admin.View exposing (view)

import Admin.Msg as Admin
import Admin.Page as Admin
import Admin.Route as Admin
import Html.Styled exposing (..)


view : Admin.Page -> Html Admin.Msg
view page =
    div
        []
        [ text "admin view" ]
