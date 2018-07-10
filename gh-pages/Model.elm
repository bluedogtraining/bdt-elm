module Model exposing (Model, initialModel)

import Toasters

import Form.Input as Input
import Form.IntInput as IntInput
import Form.FloatInput as FloatInput
import Form.Select as Select
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.DatePicker as DatePicker
import Form.TextArea as TextArea

import MusicGenre exposing (MusicGenre)
import Countries exposing (Country)


type alias Model =
    { toasters : Toasters.Model
    , input : Input.Model
    , intInput : IntInput.Model
    , floatInput : FloatInput.Model
    , select : Select.Model MusicGenre
    , multiSelect : MultiSelect.Model MusicGenre
    , searchSelect : SearchSelect.Model Country
    , datePicker : DatePicker.Model
    , datePicker2 : DatePicker.Model
    , datePicker3 : DatePicker.Model
    , textArea : TextArea.Model
    , toggle1 : Bool
    , toggle2 : Bool
    , name : Input.Model
    , startDate : DatePicker.Model
    , email : Input.Model
    , preferredGenre : Select.Model MusicGenre
    , countryOfBirth : SearchSelect.Model Country
    }


initialModel : Model
initialModel =
    { toasters = Toasters.init
    , input = Input.init
    , intInput = IntInput.init
    , floatInput = FloatInput.init
    , select = Select.init MusicGenre.asList
    , multiSelect = MultiSelect.init MusicGenre.asNonempty
    , searchSelect = SearchSelect.init "https://restcountries.eu/rest/v2/name/" Countries.countryDecoder
    , datePicker = DatePicker.init
    , datePicker2 = DatePicker.init
    , datePicker3 = DatePicker.init
    , textArea = TextArea.init |> TextArea.setSubstituteTabs True |> TextArea.setReplacements [("[]", "☐")]
    , toggle1 = False
    , toggle2 = False
    , name = Input.init
    , startDate = DatePicker.init
    , email = Input.init
    , preferredGenre = Select.init MusicGenre.asList
    , countryOfBirth = SearchSelect.init "https://restcountries.eu/rest/v2/name/" Countries.countryDecoder
    }