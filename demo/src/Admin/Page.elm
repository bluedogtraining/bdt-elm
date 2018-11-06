module Admin.Page exposing (Page(..), fromRoute)

import Admin.Courses.Page as Courses
import Admin.Route as Admin


type Page
    = Courses Courses.Page
    | Units


fromRoute : Admin.Route -> Page
fromRoute route =
    case route of
        Admin.Courses ->
            Courses Courses.Search

        Admin.Units ->
            Units
