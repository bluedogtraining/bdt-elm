module Modal exposing (view, viewIf, setSize, header, body, footer, block, blockSizes, render)

{-| Module to create Modals with Headers, ModalBlocks and Footers

# Init
@docs view, viewIf, setSize

# Create blocks
@docs header, body, footer, block, blockSizes

# Render
@docs render
-}

import Html.Styled as Html exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import Html.Styled.Bdt as Html


import FeatherIcons
import Button exposing (Button)
import Grid.Size exposing (..)

import Modal.Css as Css


type Config msg
    = Config (ViewConfig msg)


type alias ViewConfig msg =
    { isOpen : Bool
    , closeMsg : msg
    , size : Size
    , headerTitle : String
    , headerButtons : List (Button msg)
    , modalBlocks : List (ModalBlock msg)
    , footerButtons : List (Button msg)
    }


initialViewConfig : Bool -> msg -> ViewConfig msg
initialViewConfig isOpen msg =
    { isOpen = isOpen
    , closeMsg = msg
    , size = Md
    , headerTitle = ""
    , headerButtons = []
    , modalBlocks = []
    , footerButtons = []
    }


{-| Init a modal
-}
view : msg -> Config msg
view =
    Config << initialViewConfig True


{-| Init a modal conditionally
-}
viewIf : Bool -> msg -> Config msg
viewIf isOpen =

    Config << initialViewConfig isOpen


{-| Set the modal size
-}
setSize : Size -> Config msg -> Config msg
setSize size (Config viewConfig) =

    Config { viewConfig | size = size }


{-| Add a header block
-}
header : String -> List (Button msg) -> Config msg -> Config msg
header title buttons (Config viewConfig) =

    Config { viewConfig | headerTitle = title, headerButtons = buttons }


{-| Add a body block
-}
body : List (ModalBlock msg) -> Config msg -> Config msg
body modalBlocks (Config viewConfig) =

    Config { viewConfig | modalBlocks = modalBlocks }


{-| Add a footer block
-}
footer : List (Button msg) -> Config msg -> Config msg
footer buttons (Config viewConfig) =

    Config { viewConfig | footerButtons = buttons }


type ModalBlock msg
    = ModalBlock (ModalBlockConfig msg)


type alias ModalBlockConfig msg =
    { defaultCols : Cols
    , sizes : List (Size, Cols)
    , children : List (Html msg)
    }


{-| Add a block
-}
block : Cols -> List (Html msg) -> ModalBlock msg
block cols children =
    ModalBlock <| ModalBlockConfig cols [] children


{-| Add a block of varying sizes
-}
blockSizes : Cols -> List (Size, Cols) -> List (Html msg) -> ModalBlock msg
blockSizes cols sizes children =
    ModalBlock <| ModalBlockConfig cols sizes children


{-| Render
-}
render : Config msg -> Html msg
render (Config viewConfig) =

    Html.divIf viewConfig.isOpen
        []
        [ Css.removeBodyScroll
        , div
            [ Css.background
            , onClick viewConfig.closeMsg
            ]
            []
        , div
            [ Css.modal viewConfig.size ]
            [ closeIcon viewConfig.closeMsg
            , Html.divIf (viewConfig.headerTitle /= "" || not (List.isEmpty viewConfig.headerButtons))
                [ Css.header ]
                [ span
                    []
                    [ text viewConfig.headerTitle ]
                , div
                    []
                    (List.map Button.render viewConfig.headerButtons)
                ]
            , Html.divIf (not <| List.isEmpty viewConfig.modalBlocks)
                [ Css.body ]
                (List.map renderModalBlock viewConfig.modalBlocks)
            , Html.divIf (not (List.isEmpty viewConfig.footerButtons))
                [ Css.footer ]
                (List.map Button.render viewConfig.footerButtons)
            ]
        ]


renderModalBlock : ModalBlock msg -> Html msg
renderModalBlock (ModalBlock modalBlockConfig) =

    div
        [ Css.block modalBlockConfig.defaultCols modalBlockConfig.sizes ]
        modalBlockConfig.children


closeIcon : msg -> Html msg
closeIcon closeMsg =

    div
        [ Css.closeIcon, onClick closeMsg ]
        [ FeatherIcons.x |> FeatherIcons.withSize 14 |> FeatherIcons.toHtml [] |> Html.fromUnstyled ]