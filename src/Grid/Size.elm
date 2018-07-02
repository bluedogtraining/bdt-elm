module Grid.Size exposing (..)

import Ordering exposing (Ordering)


type Size
    = Xs
    | Sm
    | Md
    | Lg
    | Xl


asList : List Size
asList =
    [ Xs
    , Sm
    , Md
    , Lg
    , Xl
    ]


type Cols
    = One
    | Two
    | Three
    | Four
    | Five
    | Six
    | Seven
    | Eight
    | Nine
    | Ten
    | Eleven
    | Twelve


colsToFloat : Cols -> Float
colsToFloat cols =

    case cols of
        One -> 1
        Two -> 2
        Three -> 3
        Four -> 4
        Five -> 5
        Six -> 6
        Seven -> 7
        Eight -> 8
        Nine -> 9
        Ten -> 10
        Eleven -> 11
        Twelve -> 12


breakpointWidth : Size -> Float
breakpointWidth size =

    case size of
        Xs -> 576
        Sm -> 768
        Md -> 992
        Lg -> 1200
        Xl -> 1600


containerWidth : Size -> Float
containerWidth size =

    case size of
        Xs -> 540
        Sm -> 720
        Md -> 960
        Lg -> 1140
        Xl -> 1540


-- Orders by biggest first
orderBySize : List (Size, Cols) -> List (Size, Cols)
orderBySize sizes =

    List.sortWith (Ordering.byFieldWith (asList |> List.reverse |> Ordering.explicit) Tuple.first) sizes