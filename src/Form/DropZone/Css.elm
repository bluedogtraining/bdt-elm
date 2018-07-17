module Form.DropZone.Css exposing (..)

import Css exposing (..)
import Css.Transitions as Transition exposing (transition)
import Html.Styled exposing (Attribute)
import Html.Styled.Attributes exposing (css)


dropZone : Bool -> Bool -> Bool -> Attribute msg
dropZone isLocked isError areFilesHovering =
    css
        [ padding2 (Css.rem 1.5) (Css.rem 3)
        , border3 (px 2) dashed <| borderCase isLocked isError areFilesHovering
        , displayFlex
        , alignItems center
        , justifyContent center
        , backgroundColor <| backgroundCase isLocked isError areFilesHovering
        , transition
            [ Transition.backgroundColor 400
            , Transition.borderColor 400
            ]
        , width <| pct 100
        , height <| pct 100
        , boxSizing borderBox
        , marginBottom <| Css.rem 0.3
        , fontFamilies
            [ "-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif" ]
        , fontWeight <| int 100
        , color <| Css.rgb 111 111 111
        , cursor <| if isLocked then notAllowed else pointer
        ]


borderCase : Bool -> Bool -> Bool -> Css.Color
borderCase isLocked isError areFilesHovering =

    case (isLocked, isError, areFilesHovering) of

        (True, _, _) ->
            rgb 204 204 204

        (_, True, False) ->
            rgb 189 54 47

        (_, _, True) ->
            rgb 81 163 81

        _ ->
            rgb 204 204 204



backgroundCase : Bool -> Bool -> Bool -> Css.Color
backgroundCase isLocked isError areFilesHovering =

    case (isLocked, isError, areFilesHovering) of

        (True, _, _) ->
            rgb 238 238 238

        (False, True, False) ->
            rgb 246 221 219

        (False, _, True) ->
            rgb 231 243 231

        _ ->
            rgb 255 255 255


filesInput : Attribute msg
filesInput =
    css
        [ position absolute
        , visibility hidden
        ]


file : Attribute msg
file =
    css
        [ displayFlex
        , justifyContent spaceBetween
        , alignItems center
        , padding2 (Css.rem 0.3) (Css.rem 0)
        , fontSize <| Css.rem 0.8
        , borderBottom3 (px 1) solid (rgb 204 204 204)
        , lastChild
            [ borderBottomWidth <| px 0
            ]
        ]


errorTitle : Attribute msg
errorTitle =
    css
        [ color <| rgb 189 54 47
        , backgroundColor <| rgb 241 221 219
        , margin2 (Css.rem 0.4) (Css.rem 0)
        , padding2 (Css.rem 0.2) (Css.rem 0.4)
        , fontSize <| Css.rem 0.8
        , textAlign center
        ]


removeIcon : Attribute msg
removeIcon =
    css
        [ cursor pointer
        , hover
            [ backgroundColor <| rgb 189 54 47
            ]
        ]