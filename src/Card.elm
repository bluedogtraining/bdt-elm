module Card exposing (view, viewIf, header, body, footer, CardBlock, block, blockIf, maybeBlock, blockSizes, render)

{-| Module to create Cards with Headers, CardBlocks and Footers

# Init
@docs view, viewIf

# Create blocks
@docs header, body, footer, block, blockIf, maybeBlock, blockSizes

# Render
@docs render
-}

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)

import Html.Styled.Bdt as Html

import Button exposing (Button)

import Grid.Size exposing (..)

import Card.Css as Css


type Config msg
    = Config (ViewConfig msg)


type alias ViewConfig msg =
    { isShown : Bool
    , headerTitle : String
    , headerButtons : List (Button msg)
    , cardBlocks : List (CardBlock msg)
    , footerButtons : List (Button msg)
    }


initialViewConfig : Bool -> ViewConfig msg
initialViewConfig isShown =
    { isShown = isShown
    , headerTitle = ""
    , headerButtons = []
    , cardBlocks = []
    , footerButtons = []
    }


{-| Init a card
-}
view : Config msg
view =
    Config <| initialViewConfig True


{-| Init a card conditionally
-}
viewIf : Bool -> Config msg
viewIf isShown =

    Config <| initialViewConfig isShown


{-| Add a header block
-}
header : String -> List (Button msg) -> Config msg -> Config msg
header title buttons (Config viewConfig) =

    Config { viewConfig | headerTitle = title, headerButtons = buttons }


{-| Add a body block
-}
body : List (CardBlock msg) -> Config msg -> Config msg
body cardBlocks (Config viewConfig) =

    Config { viewConfig | cardBlocks = cardBlocks }


{-| Add a footer block
-}
footer : List (Button msg) -> Config msg -> Config msg
footer buttons (Config viewConfig) =

    Config { viewConfig | footerButtons = buttons }


{-| Type hint a function that returns a card block
-}
type CardBlock msg
    = CardBlock (CardBlockConfig msg)


type alias CardBlockConfig msg =
    { defaultCols : Cols
    , sizes : List (Size, Cols)
    , children : List (Html msg)
    }


{-| Add a block
-}
block : Cols -> List (Html msg) -> CardBlock msg
block cols children =
    CardBlock <| CardBlockConfig cols [] children


{-| Add a block conditionally
-}
blockIf : Cols -> Bool -> List (Html msg) -> CardBlock msg
blockIf cols isShown children =
    case isShown of
        False ->
            CardBlock <| CardBlockConfig cols [] []

        True ->
            CardBlock <| CardBlockConfig cols [] children


{-| Add a block and apply Just
-}
maybeBlock : Cols -> Maybe a -> (a -> List (Html msg)) -> CardBlock msg
maybeBlock cols maybe children =
    case maybe of
        Nothing ->
            CardBlock <| CardBlockConfig cols [] []

        Just a ->
            CardBlock <| CardBlockConfig cols [] ( children a )


{-| Add a block of varying sizes
-}
blockSizes : Cols -> List (Size, Cols) -> List (Html msg) -> CardBlock msg
blockSizes cols sizes children =
    CardBlock <| CardBlockConfig cols sizes children


{-| Render
-}
render : Config msg -> Html msg
render (Config viewConfig) =

    Html.divIf viewConfig.isShown
        [ Css.card ]
        [ Html.divIf (viewConfig.headerTitle /= "" || not (List.isEmpty viewConfig.headerButtons))
            [ Css.header ]
            [ span
                []
                [ text viewConfig.headerTitle ]
            , div
                []
                (List.map Button.render viewConfig.headerButtons)
            ]
        , Html.divIf (not <| List.isEmpty viewConfig.cardBlocks)
            [ Css.body ]
            (List.map renderCardBlock viewConfig.cardBlocks)
        , Html.divIf (not (List.isEmpty viewConfig.footerButtons))
            [ Css.footer ]
            (List.map Button.render viewConfig.footerButtons)
        ]


renderCardBlock : CardBlock msg -> Html msg
renderCardBlock (CardBlock cardBlockConfig) =

    Html.divIf (not <| List.isEmpty cardBlockConfig.children)
        [ Css.block cardBlockConfig.defaultCols cardBlockConfig.sizes ]
        cardBlockConfig.children