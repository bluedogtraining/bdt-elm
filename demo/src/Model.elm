module Model exposing (Model, initialModel)

--import Form.DropZone as DropZone

import Content
import Countries exposing (Country)
import FeatherIcons
import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Form.TextArea as TextArea
import MusicGenre exposing (MusicGenre)
import Toasters
import ToolTip


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
    , toggle3 : Bool

    --    , dropZone : DropZone.Model
    , toolTip1 : ToolTip.Model
    , toolTip2 : ToolTip.Model
    , toolTip3 : ToolTip.Model
    , toolTip4 : ToolTip.Model
    , name : Input.Model
    , startDate : DatePicker.Model
    , email : Input.Model
    , preferredGenre : Select.Model MusicGenre
    , countryOfBirth : SearchSelect.Model Country
    , modalSmOpen : Bool
    , modalLgOpen : Bool
    , maybeBlockSelect : Select.Model MusicGenre
    }


initialModel : Model
initialModel =
    { toasters = Toasters.init
    , input = Input.init
    , intInput = IntInput.init
    , floatInput = FloatInput.init
    , select = Select.init MusicGenre.asNonempty
    , multiSelect = MultiSelect.init MusicGenre.asNonempty
    , searchSelect = SearchSelect.init "https://restcountries.eu/rest/v2/name/" Countries.countryDecoder
    , datePicker = DatePicker.init
    , datePicker2 = DatePicker.init
    , datePicker3 = DatePicker.init
    , textArea = TextArea.init |> TextArea.setSubstituteTabs True |> TextArea.setReplacements [ ( "[]", "☐" ) ]
    , toggle1 = False
    , toggle2 = False
    , toggle3 = False

    --    , dropZone = DropZone.init
    , toolTip1 = ToolTip.init (Content.Text "ToolTip1") "This is the first ToolTip!"
    , toolTip2 = ToolTip.init (Content.Icon FeatherIcons.compass) "This is the second ToolTip!"
    , toolTip3 = ToolTip.init (Content.Text "help") "This is the third ToolTip!"
    , toolTip4 = ToolTip.init (Content.Icon FeatherIcons.calendar) "This is the fourth ToolTip!"
    , name = Input.init
    , startDate = DatePicker.init
    , email = Input.init
    , preferredGenre = Select.init MusicGenre.asNonempty
    , countryOfBirth = SearchSelect.init "https://restcountries.eu/rest/v2/name/" Countries.countryDecoder
    , modalSmOpen = False
    , modalLgOpen = False
    , maybeBlockSelect = Select.init MusicGenre.asNonempty
    }
