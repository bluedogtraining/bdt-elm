module Grid exposing (row, col, colSizes)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)

import Grid.Css as Css
import Grid.Size exposing (Size, Cols)


type Row msg
    = Row (List (Col msg))


type Col msg
    = Col (ColConfig msg)


type alias ColConfig msg =
    { defaultCols : Cols
    , sizes : List (Size, Cols)
    , children : List (Html msg)
    }


row : List (Col msg) -> Html msg
row cols =

    div
        [ Css.row ]
        (List.map renderCol cols)


col : Cols -> List (Html msg) -> Col msg
col cols children =

    Col <| ColConfig cols [] children


colSizes : Cols -> List (Size, Cols) -> List (Html msg) -> Col msg
colSizes cols sizes children =

    Col <| ColConfig cols sizes children


renderCol : Col msg -> Html msg
renderCol (Col colConfig) =

    div
        [ Css.col colConfig.defaultCols colConfig.sizes ]
        colConfig.children