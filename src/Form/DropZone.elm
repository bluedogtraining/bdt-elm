module Form.DropZone exposing
    ( Model, init
    , Msg, update
    , view, render
    , reInitialise, reset
    , setInitialValue, setValue
    , setIsError, setIsLocked
    , setLabel
    , getIsChanged, getFiles
    , Files, OkFile, ErrFile
    )

{-| Module to add a file DropZone to your app

# Initialise and update
@docs Model, init, Msg, update

# View and render
@docs view, render

# State Setters
@docs reInitialise, reset, setInitialValue, setValue

# View Setters
@docs setIsError, setIsLocked, setLabel

# Getters
@docs getIsChanged, getFiles, Files, OkFile, ErrFile

-}

import Html.Styled as Html exposing (..)
import Html.Styled.Attributes as Attribute exposing (..)
import Html.Styled.Events exposing (onClick)

import Html.Styled.Bdt as Html

import Time exposing (Time)

import EverySet exposing (EverySet)

import FileReader exposing (File)

import Resettable exposing (Resettable)

import FeatherIcons
import Button

import Form.DropZone.Css as Css


{-| Add a DropZone.Model to your model.

    type alias MyModel =
        { myDropZone : DropZone.Model
        }
-}
type Model
     = Model State


type View
    = View State ViewState


type alias State =
    { files : Resettable (EverySet File)
    , areFilesHovering : Bool
    , isLoading : Bool
    }


initialModel : State
initialModel =
    { files = Resettable.init EverySet.empty
    , areFilesHovering = False
    , isLoading = False
    }


{-| Add a DropZone.Model to your model.

    myInitialModel : MyModel
    myInitialModel =
        { myDropZone = DropZone.init -- optionally pipe into State Setters
        }
-}
init : Model
init =
    Model initialModel


type alias ViewState =
    { isLocked : Bool
    , isError : Bool
    , label : String
    }


initialViewState : ViewState
initialViewState =
    { isLocked = False
    , isError = False
    , label = "Drop files here or click to select files"
    }


{-| Add a DropZone.Msg to your Msg.

    type MyMsg
        = UpdateMyDropZone DropZone.Msg
-}
type Msg
    = Enter
    | Leave
    | Add (List File)
    | Remove File


{-| Use in your update function.

    myUpdate : Msg -> Model -> (Model, Cmd Msg)
    myUpdate msg model =
        case msg of
            UpdateMyDropZone dropZoneMsg ->
                { model | myDropZone = DropZone.update dropZoneMsg model.myDropZone } ! []
-}
update : Msg -> Model -> Model
update msg (Model state) =

    case msg of

        Enter ->
            { state | areFilesHovering = True }
                |> Model

        Leave ->
            { state | areFilesHovering = False }
                |> Model

        Add files ->
            { state
                | areFilesHovering = False
                , files = Resettable.update (EverySet.union (Resettable.getValue state.files) (EverySet.fromList files)) state.files
            }
                |> Model

        Remove file ->
            { state | files = Resettable.update (Resettable.getValue state.files |> EverySet.remove file) state.files }
                |> Model


{-| Transform an DropZone.Model into an DropZone.View, which allows us to pipe View Setters on it.

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ DropZone.view model.myDropZone -- pipe view setters here, for example |> setIsLocked 'your logic here'
            ]
-}
view : Model -> View
view (Model state) =

    View state initialViewState


{-| Transforms an DropZone.View into Html DropZone.Msg

    myView : Model -> Html Msg
    myView model =
        div
            []
            [ DropZone.view model.myDropZone
                |> DropZone.render
                |> Html.map UpdateMyDropZone
            ]
-}
render : View -> Html Msg
render (View state viewState) =

    div
        []
        [ label
            ( List.append
                (FileReader.dropZone dropZoneModel |> List.map Attribute.fromUnstyled)
                [ Css.dropZone viewState.isLocked viewState.isError state.areFilesHovering
                ]
            )
            [ input
                ( List.append
                    (FileReader.filesInput FileReader.Base64 Add |> List.map Attribute.fromUnstyled)
                    [ Css.filesInput
                    , disabled viewState.isLocked
                    ]
                )
                []
            , text viewState.label
            ]
        , Resettable.getValue state.files
            |> EverySet.foldl split ([], [])
            |> fileLists
        ]


split : File -> (List File, List (File, FileReader.Error)) -> (List File, List (File, FileReader.Error))
split file (oks, errs) =

    case file.data of
        Err error ->
            (oks, errs ++ [(file, error)])

        Ok base64 ->
            (oks ++ [file], errs)


fileLists : (List File, List (File, FileReader.Error)) -> Html Msg
fileLists (oks, errs) =

    div
        []
        [ div
            []
            (List.map okFile oks)
        , Html.divIf (not <| List.isEmpty errs)
            [ Css.errorTitle ]
            [ text "The following files had errors" ]
        , div
            []
            (List.map errFile errs)
        ]


okFile : File -> Html Msg
okFile file =

    div
        [ Css.file ]
        [ span
            []
            [ text file.name ]
        , Button.view
            |> Button.icon FeatherIcons.x
            |> Button.red
            |> Button.small
            |> Button.onClick (Remove file)
            |> Button.render
        ]


errFile : (File, FileReader.Error) -> Html Msg
errFile (file, error) =

    div
        [ Css.file ]
        [ span
            []
            [ text <| file.name ++ " - " ++ error.message ]
        , Button.view
            |> Button.icon FeatherIcons.x
            |> Button.red
            |> Button.small
            |> Button.onClick (Remove file)
            |> Button.render
        ]


dropZoneModel : { dataFormat : FileReader.DataFormat , enterMsg : Msg, leaveMsg : Msg, filesMsg : List File -> Msg }
dropZoneModel =
    { dataFormat = FileReader.Base64
    , enterMsg = Enter
    , leaveMsg = Leave
    , filesMsg = Add
    }


{-| ReInitialise your DropZone.Model.
-}
reInitialise : Model -> Model
reInitialise (Model state) =

    Model { state | files = Resettable.init <| Resettable.getValue state.files }


{-| Reset your DropZone.Model.
-}
reset : Model -> Model
reset (Model state) =

    Model { state | files = Resettable.reset state.files }


{-| Set the initial files of your DropZone.Model.
-}
setInitialValue : List File -> Model -> Model
setInitialValue files (Model state) =

    Model { state | files = Resettable.init <| EverySet.fromList files }


{-| Change the files of your DropZone.Model.
-}
setValue : List File -> Model -> Model
setValue files (Model state) =

    Model { state | files = Resettable.update (EverySet.fromList files) state.files }


{-| Set whether your input is in error mode (red border).
-}
setIsError : Bool -> View -> View
setIsError isError (View state viewState) =

    View state { viewState | isError = isError }


{-| Set whether your input is locked (disabled).
-}
setIsLocked : Bool -> View -> View
setIsLocked isLocked (View state viewState) =

    View state { viewState | isLocked = isLocked }


{-| Set the label for your DropZone.
-}
setLabel : String -> View -> View
setLabel label (View state viewState) =

    View state { viewState | label = label }


{-| Whether your DropZone was changed. Useful if you want to disable save buttons unless there were changes etc.
-}
getIsChanged : Model -> Bool
getIsChanged (Model state) =

    Resettable.getIsChanged state.files


{-| Get the current value of your DropZone. This is what you'd use to display the data somewhere outside of your DropZone,
or to send the files to the backend for example etc.
-}
getFiles : Model -> Files
getFiles (Model state) =

    state.files
        |> Resettable.getValue
        |> EverySet.foldl splitFiles (Files [] [])


{-| List of files that imported properly and list of files that didn't
-}
type alias Files =
    { ok : List OkFile
    , err : List ErrFile
    }


{-| File that imported successfully
-}
type alias OkFile =
    { lastModified : Time
    , name : String
    , size : Int
    , mimeType : String
    , base64 : String
    }


{-| File that didn't import successfully
-}
type alias ErrFile =
    { lastModified : Time
    , name : String
    , size : Int
    , mimeType : String
    , error : FileReader.Error
    }


splitFiles : File -> Files -> Files
splitFiles file acc =

    case file.data of
        Err error ->
            { acc | err = acc.err ++ [ ErrFile file.lastModified file.name file.size file.mimeType error ] }

        Ok base64 ->
            { acc | ok = acc.ok ++ [ OkFile file.lastModified file.name file.size file.mimeType base64 ] }