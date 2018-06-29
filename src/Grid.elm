module Grid exposing (row, col)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)


type Row msg
    = Row (List (Col msg))


type Col msg
    = Col Int (List (Html msg))


row : List (Col msg) -> Html msg
row cols =

    div
        [ class "row" ]
        (List.map renderCol cols)


col : Int -> List (Html msg) -> Col msg
col int children =

    Col int children


renderCol : Col msg -> Html msg
renderCol (Col int children) =

    div
        [ class <| String.join "-" ["col", toString int] ]
        children