module Html.Styled.Bdt exposing ((?), maybeAttribute, viewIf, divIf, maybeView)

{-| Helpers on top of Html.Styled to show/hide things

# Show Hide Elements
@docs (?), maybeAttribute, viewIf, divIf, maybeView

-}

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (class)

import InfixPrecedence


{-| Optionally add an attribute.

    button
        [ onClick MyMessage ? model.isButtonEnabled ]
        [ text "Clickety Click" ]
-}
(?) : Attribute msg -> Bool -> Attribute msg
(?) attribute bool =

    if bool then attribute else class ""


{-| Maybe add an attribute.

    button
        [ maybeAttribute onClick model.myMaybeMsg ]
        [ text "Clickety Click" ]
-}
maybeAttribute : (a -> Attribute msg) -> Maybe a -> Attribute msg
maybeAttribute f maybe =

    case maybe of
        Nothing ->
            class ""

        Just a ->
            f a


{-| Only display if True.

    viewIf model.isShown myViewFunction
-}
viewIf : Bool -> Html msg -> Html msg
viewIf show html =

    case show of
        True -> html
        False -> text ""


{-| Only display if True.

    divIf model.isShown
        [ id "potato" ]
        [ text "Hello" ]
-}
divIf : Bool -> List (Attribute msg) -> List (Html msg) -> Html msg
divIf show attributes children =

    case show of
        True -> div attributes children
        False -> text ""


{-| Maybe display a view.

    maybeView view model.myMaybe
-}
maybeView : (a -> Html msg) -> Maybe a -> Html msg
maybeView f maybe =

    case maybe of
        Nothing ->
            text ""

        Just a ->
            f a