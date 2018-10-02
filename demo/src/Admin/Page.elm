module Admin.Page exposing (Page (..))

import Admin.Courses.Page as Courses


type Page
    = Courses Courses.Page
    | Units