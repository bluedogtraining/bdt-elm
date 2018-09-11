module ListTests exposing (suite)

import Test exposing (..)
import Expect exposing (Expectation)

import List.Nonempty exposing (Nonempty (..))
import List.Bdt as List

import Time.Date as Date
import Date.Bdt as Date


suite : Test
suite =
    describe "Test List"
        [ test "test groupWhile with no successions" test1
        , test "test groupWhile with successions" test2
        , test "test groupWhile after a sort" test3
        , test "test sortByDate" test4
        ]


test1 : () -> Expectation
test1 _ =
    [ { name = "One", number = 1 }
    , { name = "Two", number = 2 }
    , { name = "Three", number = 1 }
    ]
        |> List.groupWhile (\rec1 rec2 -> rec1.number == rec2.number)
        |> Expect.equal
            [ Nonempty { name = "One", number = 1 } []
            , Nonempty { name = "Two", number = 2 } []
            , Nonempty { name = "Three", number = 1 } []
            ]


test2 : () -> Expectation
test2 _ =
    [ { name = "One", number = 1 }
    , { name = "Two", number = 1 }
    , { name = "Three", number = 2 }
    ]
        |> List.groupWhile (\rec1 rec2 -> rec1.number == rec2.number)
        |> Expect.equal
            [ Nonempty { name = "One", number = 1 } [ { name = "Two", number = 1 } ]
            , Nonempty { name = "Three", number = 2 } []
            ]


test3 : () -> Expectation
test3 _ =
    [ { name = "One", date = Date.date 2018 9 17 }
    , { name = "Two", date = Date.date 2019 4 8 }
    , { name = "Three", date = Date.date 2018 9 17 }
    ]
        |> List.sortWith (\rec1 rec2 -> Date.compare rec1.date rec2.date)
        |> List.groupWhile (\rec1 rec2 -> rec1.date == rec2.date)
        |> Expect.equal
            [ Nonempty { name = "One", date = Date.date 2018 9 17 } [ { name = "Three", date = Date.date 2018 9 17 } ]
            , Nonempty { name = "Two", date = Date.date 2019 4 8 } []
            ]


test4 : () -> Expectation
test4 _ =
    [ { name = "One", date = Date.date 2018 9 17 }
    , { name = "Two", date = Date.date 2019 4 8 }
    , { name = "Three", date = Date.date 2018 9 17 }
    ]
        |> List.sortByDate .date
        |> Expect.equal
            [ { name = "One", date = Date.date 2018 9 17 }
            , { name = "Three", date = Date.date 2018 9 17 }
            , { name = "Two", date = Date.date 2019 4 8 }
            ]