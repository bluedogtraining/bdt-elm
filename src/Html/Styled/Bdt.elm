module Html.Styled.Bdt exposing ((?), maybeAttribute, viewIf, divIf, maybeView)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (class)

import InfixPrecedence


(?) : Attribute msg -> Bool -> Attribute msg
(?) attribute bool =

    if bool then attribute else class ""


maybeAttribute : (a -> Attribute msg) -> Maybe a -> Attribute msg
maybeAttribute f maybe =

    case maybe of
        Nothing ->
            class ""

        Just a ->
            f a


viewIf : Bool -> Html msg -> Html msg
viewIf show html =

    case show of
        True -> html
        False -> text ""


divIf : Bool -> List (Attribute msg) -> List (Html msg) -> Html msg
divIf show attributes children =

    case show of
        True -> div attributes children
        False -> text ""


maybeView : (a -> Html msg) -> Maybe a -> Html msg
maybeView f maybe =

    case maybe of
        Nothing ->
            text ""

        Just a ->
            f a