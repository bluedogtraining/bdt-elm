module Model exposing (Model, initialModel)

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker
import Form.TextArea as TextArea

import MusicGenre exposing (MusicGenre)
import StarWars exposing (Character)


type alias Model =
    { input : Input.Model
    , intInput : IntInput.Model
    , floatInput : FloatInput.Model
    , select : Select.Model MusicGenre
    , multiSelect : MultiSelect.Model MusicGenre
    , searchSelect : SearchSelect.Model Character
    , datePicker : DatePicker.Model
    , textArea : TextArea.Model
    }


initialModel : Model
initialModel =
    { input = Input.init
    , intInput = IntInput.init
    , floatInput = FloatInput.init
    , select = Select.init MusicGenre.asList
    , multiSelect = MultiSelect.init MusicGenre.asNonempty
    , searchSelect = SearchSelect.init "https://swapi.co/api/people/?search=" StarWars.characterDecoder
    , datePicker = DatePicker.init
    , textArea = TextArea.init |> TextArea.setSubstituteTabs True |> TextArea.setReplacements [("[]", "☐")]
    }