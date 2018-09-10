module Form.Helpers exposing
    ( SelectKey (..), onSelectKey
    , getPreviousOption, getNextOption
    )

import Html.Styled exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes exposing (..)

import Json.Decode as Decode exposing (Decoder)

import List.Extra as List


type SelectKey
    = Up
    | Down
    | Enter
    | Space


selectKeyDecoder : String -> Decoder SelectKey
selectKeyDecoder key =
    case key of
        "ArrowUp" ->
            Decode.succeed Up

        "ArrowDown" ->
            Decode.succeed Down

        "Enter" ->
            Decode.succeed Enter

        " " ->
            Decode.succeed Space

        _ ->
            Decode.fail "Not valid SelectKey"


onSelectKey : (SelectKey -> msg) -> Attribute msg
onSelectKey msg =
    preventDefaultOn
        "keydown"
        (Decode.field "key" Decode.string |> Decode.andThen selectKeyDecoder |> Decode.map (\decoder -> (msg decoder, True)))


getPreviousOption : List option -> Maybe option -> Maybe option
getPreviousOption options focusedOption =

    getNextOption (List.reverse options) focusedOption


getNextOption : List option -> Maybe option -> Maybe option
getNextOption options mFocusedOption =
    case mFocusedOption of
        Nothing ->
            List.head options

        Just focusedOption ->
            options
                |> List.dropWhile ((/=) focusedOption)
                |> List.drop 1
                |> List.head