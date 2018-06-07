module Html.Bdt exposing ((?), maybeAttribute, viewIf, divIf)

import Html.Styled exposing (Html, Attribute, text, div)
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
viewIf show view =

    if show then view else text ""


divIf : Bool -> List (Attribute msg) -> List (Html msg) -> Html msg
divIf show attributes children =

    div attributes children |> viewIf show