import Html.Styled as Html exposing (..)

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker


main : Program Never Model Msg
main =
    program
        { init = init
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }


init : (Model, Cmd Msg)
init =
    initialModel ! []


type alias Model =
    { input : Input.Model
    }


initialModel : Model
initialModel =
    { input = Input.init
    }


type Msg
    = InputMsg Input.Msg


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =

    case msg of
        InputMsg inputMsg ->
            { model | input = Input.update inputMsg model.input } ! []


view : Model -> Html Msg
view model =
    div
        []
        [ h1
            []
            [ text "Form Elements" ]
        , h2
            []
            [ text "Input" ]
        , Input.view model.input
            |> Input.render
            |> Html.map InputMsg
        ]