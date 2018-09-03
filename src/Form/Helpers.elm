module Form.Helpers exposing
    ( toHtmlId
    , UpDown (..), onUpDown, onSpaceEnter, onEnter
    , getPreviousOption, getNextOption
    , focusOption
    )

import Html.Styled as Html exposing (..)
import Html.Styled.Lazy exposing (..)
import Html.Styled.Events exposing (..)
import Html.Styled.Attributes as Attributes exposing (..)

import Task
import Browser.Dom as Dom
import Json.Decode as Decode exposing (Decoder)

import List.Extra as List


toHtmlId : (option -> String) -> option -> String
toHtmlId toLabel option =
    toLabel option


type UpDown
    = Up
    | Down


upDownDecoder : String -> Decoder UpDown
upDownDecoder key =
    case key of
        "ArrowUp" ->
            Decode.succeed Up

        "ArrowDown" ->
            Decode.succeed Down

        _ ->
            Decode.fail "Not ArrowUp or ArrowDown"


onUpDown : (UpDown -> msg) -> Attribute msg
onUpDown msg =

    preventDefaultOn
        "keydown"
        (Decode.field "key" Decode.string |> Decode.andThen upDownDecoder |> Decode.map (\decoder -> (msg decoder, True)))


spaceEnterDecoder : msg -> String -> Decoder msg
spaceEnterDecoder msg key =
    case key of
        " " ->
            Decode.succeed msg

        "Enter" ->
            Decode.succeed msg

        _ ->
            Decode.fail "Not Space or Enter"


onSpaceEnter : msg -> Attribute msg
onSpaceEnter msg =

    preventDefaultOn
        "keydown"
        (Decode.field "key" Decode.string |> Decode.andThen (spaceEnterDecoder msg) |> Decode.map (\decoder -> (decoder, True)))


enterDecoder : msg -> String -> Decoder msg
enterDecoder msg key =
    case key of
        "Enter" ->
            Decode.succeed msg

        _ ->
            Decode.fail "Not Space"


onEnter : msg -> Attribute msg
onEnter msg =

    preventDefaultOn
        "keydown"
        (Decode.field "key" Decode.string |> Decode.andThen (enterDecoder msg) |> Decode.map (\decoder -> (decoder, True)))


getPreviousOption : List option -> Maybe option -> Maybe option
getPreviousOption options focusedOption =

    getNextOption (List.reverse options) focusedOption


getNextOption : List option -> Maybe option -> Maybe option
getNextOption options focusedOption =

    options
        |> List.dropWhile (\option -> Just option == focusedOption)
        |> List.drop 1
        |> List.head


focusOption : (option -> String) -> Maybe option -> (Result Dom.Error () -> msg) -> Cmd msg
focusOption toLabel mOption msg =

    case mOption of
        Just option ->
            Task.attempt msg (toHtmlId toLabel option |> Dom.focus)

        Nothing ->
            Cmd.none