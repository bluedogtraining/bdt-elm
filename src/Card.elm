module Card exposing (view, header, body, footer, block, blockSizes, render)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)

import Html.Styled.Bdt as Html

import Button exposing (Button)

import Card.Css as Css

import Grid.Size exposing (..)


type Config msg
    = Config (ViewConfig msg)


type alias ViewConfig msg =
    { headerTitle : String
    , headerButtons : List Button
    , cardBlocks : List (CardBlock msg)
    , footerButtons : List Button
    }


initialViewConfig : ViewConfig msg
initialViewConfig =
    { headerTitle = ""
    , headerButtons = []
    , cardBlocks = []
    , footerButtons = []
    }


view : Config msg
view =
    Config initialViewConfig


header : String -> List Button -> Config msg -> Config msg
header title buttons (Config viewConfig) =

    Config { viewConfig | headerTitle = title, headerButtons = buttons }


body : List (CardBlock msg) -> Config msg -> Config msg
body cardBlocks (Config viewConfig) =

    Config { viewConfig | cardBlocks = cardBlocks }


footer : List Button -> Config msg -> Config msg
footer buttons (Config viewConfig) =

    Config { viewConfig | footerButtons = buttons }


type CardBlock msg
    = CardBlock (CardBlockConfig msg)


type alias CardBlockConfig msg =
    { defaultCols : Cols
    , sizes : List (Size, Cols)
    , children : List (Html msg)
    }


block : Cols -> List (Html msg) -> CardBlock msg
block cols children =
    CardBlock <| CardBlockConfig cols [] children


blockSizes : Cols -> List (Size, Cols) -> List (Html msg) -> CardBlock msg
blockSizes cols sizes children =
    CardBlock <| CardBlockConfig cols sizes children


render : Config msg -> Html msg
render (Config viewConfig) =

    div
        [ Css.card ]
        [ Html.divIf (viewConfig.headerTitle /= "" || not (List.isEmpty viewConfig.headerButtons))
            [ Css.header ]
            [ span
                []
                [ text viewConfig.headerTitle ]
            , div
                []
                (List.map renderHeaderButton viewConfig.headerButtons)
            ]
        , Html.divIf (not <| List.isEmpty viewConfig.cardBlocks)
            [ Css.body ]
            (List.map renderCardBlock viewConfig.cardBlocks)
        ]


renderHeaderButton : Button -> Html msg
renderHeaderButton button =

    div
        []
        []


renderCardBlock : CardBlock msg -> Html msg
renderCardBlock (CardBlock cardBlockConfig) =

    div
        [ Css.block cardBlockConfig.defaultCols cardBlockConfig.sizes
        ]
        cardBlockConfig.children