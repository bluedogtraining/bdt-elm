module Page exposing (Page(..))

import Admin.Page as Admin
import Index.Model as Index
import Trainer.Page as Trainer


type Page
    = NotFound
    | Index Index.Model
    | Admin Admin.Page
    | Trainer Trainer.Page
    | Test
