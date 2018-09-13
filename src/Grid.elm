module Grid exposing (container, row, col, colSizes)

{-| Module to create Grids with Rows and Cols


# Add Elements

@docs container, row, col, colSizes

-}

import Grid.Css as Css
import Grid.Size exposing (Cols, Size)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Bdt as Html


type Row msg
    = Row (List (Col msg))


type Col msg
    = Col (ColConfig msg)


type alias ColConfig msg =
    { defaultCols : Cols
    , sizes : List ( Size, Cols )
    , children : List (Html msg)
    }


{-| Create a container
-}
container : List (Attribute msg) -> List (Html msg) -> Html msg
container attributes children =
    div
        ([ Css.container ] ++ attributes)
        children


{-| Add a row
-}
row : List (Col msg) -> Html msg
row cols =
    div
        [ Css.row ]
        (List.map renderCol cols)


{-| Add a col
-}
col : Cols -> List (Html msg) -> Col msg
col cols children =
    Col <| ColConfig cols [] children


{-| Add a col, specifying different col sizes based on window size
-}
colSizes : Cols -> List ( Size, Cols ) -> List (Html msg) -> Col msg
colSizes cols sizes children =
    Col <| ColConfig cols sizes children


renderCol : Col msg -> Html msg
renderCol (Col colConfig) =
    Html.divIf (not <| List.isEmpty colConfig.children)
        [ Css.col colConfig.defaultCols colConfig.sizes ]
        colConfig.children
