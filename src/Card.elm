module Card exposing (view, header, body, footer, block, render)

import Html.Styled exposing (..)

import Html.Styled.Bdt as Html

import Button exposing (Button)


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
    { cols : Int
    , content : List (Html msg)
    }


block : Int -> List (Html msg) -> CardBlock msg
block cols children =
    CardBlock <| CardBlockConfig cols children


render : Config msg -> Html msg
render (Config viewConfig) =

    div
        []
        [ Html.divIf (viewConfig.headerTitle /= "" && List.isEmpty viewConfig.headerButtons)
            []
            [ span
                []
                [ text viewConfig.headerTitle ]
            , div
                []
                (List.map renderHeaderButton viewConfig.headerButtons)
            ]
        ]


renderHeaderButton : Button -> Html msg
renderHeaderButton button =

    div
        []
        []