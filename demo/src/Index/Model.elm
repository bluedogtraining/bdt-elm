module Index.Model exposing (Model, initialModel)

import Form.DatePicker as DatePicker
import Form.FloatInput as FloatInput
import Form.Input as Input
import Form.IntInput as IntInput
import Form.MultiSelect as MultiSelect
import Form.SearchSelect as SearchSelect
import Form.Select as Select
import Form.TextArea as TextArea
import Records.Country as Country exposing (Country)
import Records.MusicGenre as MusicGenre exposing (MusicGenre)
import TimeZone
import ToolTip
import Dict


type alias Model =
    { input : Input.Model
    , intInput : IntInput.Model
    , floatInput : FloatInput.Model
    , select : Select.Model MusicGenre
    , multiSelect : MultiSelect.Model MusicGenre
    , searchSelect : SearchSelect.Model Country
    , datePicker : DatePicker.Model
    , datePicker2 : DatePicker.Model
    , datePicker3 : DatePicker.Model
    , textArea : TextArea.Model
    , textAreaWrap : TextArea.Model
    , toggle1 : Bool
    , toggle2 : Bool
    , toggle3 : Bool
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
    , modalResizeOpen : Bool
    , maybeBlockSelect : Select.Model MusicGenre
    , isGridButtonGreen : Bool
    }


initialModel : Model
initialModel =
    let
        maybeBrisbaneTimeZone = Dict.get "Australia/Brisbane" TimeZone.zones

        brisbaneTimeZone =
            case maybeBrisbaneTimeZone of
                Nothing ->
                    Debug.todo "Couldn't get Brisbane time zone"

                Just timeZone ->
                    timeZone ()
    in
    { input = Input.init
    , intInput = IntInput.init
    , floatInput = FloatInput.init
    , select = Select.init MusicGenre.asNonempty
    , multiSelect = MultiSelect.init MusicGenre.asNonempty
    , searchSelect = SearchSelect.init "https://restcountries.eu/rest/v2/name/" Country.countryDecoder
    , datePicker = DatePicker.init |> DatePicker.setTimeZone brisbaneTimeZone
    , datePicker2 = DatePicker.init |> DatePicker.setTimeZone brisbaneTimeZone
    , datePicker3 = DatePicker.init |> DatePicker.setTimeZone brisbaneTimeZone
    , textArea = TextArea.init |> TextArea.setReplacements [ ( "[]", "☐" ) ]
    , textAreaWrap = TextArea.init
    , toggle1 = False
    , toggle2 = False
    , toggle3 = False
    , toolTip1 = ToolTip.init "This is the first ToolTip!"
    , toolTip2 = ToolTip.init "This is the second ToolTip!"
    , toolTip3 = ToolTip.init "This is the third ToolTip!"
    , toolTip4 = ToolTip.init "This is the fourth ToolTip!"
    , name = Input.init
    , startDate = DatePicker.init
    , email = Input.init
    , preferredGenre = Select.init MusicGenre.asNonempty
    , countryOfBirth = SearchSelect.init "https://restcountries.eu/rest/v2/name/" Country.countryDecoder
    , modalSmOpen = False
    , modalLgOpen = False
    , modalResizeOpen = False
    , maybeBlockSelect = Select.init MusicGenre.asNonempty
    , isGridButtonGreen = False
    }
