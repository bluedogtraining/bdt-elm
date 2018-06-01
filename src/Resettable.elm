module Resettable exposing
    ( Resettable
    , init, update, reset
    , getIsChanged, getValue, getInitialValue
    )


{-| This module is useful if you want to track changes to a value.

# Definition
@docs Resettable

# Initialise and update
@docs init, update, reset

# Getters
@docs getInitialValue, getValue, getIsChanged

-}

{-| Represent values that may be initial or updated. It can be useful if you have a
a save button that should be disabled if nothing on a form changed.

    type alias MyProfileForm =
        { firstName : Resettable String
        , email : Resettable String
        }

    form =
        { firstName = Resettable.init "John Doe"
        , email = Resettable.init ""
        }

    shouldEnableSaveButton : Form -> Bool
    shouldEnableSaveButton form =
        Resettable.getIsChanged form.email || Resettable.getIsChanged form.password
-}
type Resettable a
    = Initial a
    | Updated a a


{-| Initialise a value.

    init "Bob"     -- Initial "Bob"
-}
init : a -> Resettable a
init =
    Initial


{-| Updates a Resettable value.

    -- update to new value
    update "Joshua" (Initial "Josh")       -- Updated "Josh" "Joshua"
    update "Bob" (Updated "Josh" "Joshua")  -- Updated "Josh" "Bob"

    -- if the new value is the initial value or a changed value is set to it's initial value, keep the initial value
    update "Josh" (Initial "Josh")         -- Initial "Bob"
    update "Josh" (Updated "Josh" "Joshua") -- Initial "Josh"
-}
update : a -> Resettable a -> Resettable a
update newValue resettable =

    case resettable of
        Initial initialValue ->
            case newValue == initialValue of
                True ->
                    resettable

                False ->
                    Updated initialValue newValue

        Updated initialValue currentValue ->
            case (currentValue == newValue, initialValue == newValue) of
                (True, _) ->
                    resettable

                (False, True) ->
                    Initial initialValue

                (False, False) ->
                    Updated initialValue newValue


{-| Reset to the initial value.

    reset (Initial "Josh")         -- Initial "Josh"
    reset (Updated "Josh" "Joshua") -- Initial "Josh"
-}
reset : Resettable a -> Resettable a
reset =
    getInitialValue >> init


{-| Whether a value changed.

    getIsChanged (Initial "Josh")         -- False
    getIsChanged (Updated "Josh" "Joshua") -- True

    when checking a lot of values, it may be helpful to put them in a list:

    -- if they all have the same type:
    List.any getIsChanged [ Initial "Josh", Updated "Josh" "Joshua" ]   -- True

    -- if they have different types
    List.any ((==) True) [ getIsChanged (Initial "Josh"), getIsChanged (Initial 12) ]   -- False
-}
getIsChanged : Resettable a -> Bool
getIsChanged resettable =

    case resettable of
        Initial _ ->
            False

        Updated _ _ ->
            True


{-| Get the current value.

    getValue (Initial "Josh")         -- "Josh"
    getValue (Updated "Josh" "Joshua") -- "Joshua"
-}
getValue : Resettable a -> a
getValue resettable =

    case resettable of
        Initial initialValue ->
            initialValue

        Updated _ updatedValue ->
            updatedValue


{-| Get the initial value.

    getInitialValue (Initial "Josh")         -- "Josh"
    getInitialValue (Updated "Josh" "Joshua") -- "Josh"
-}
getInitialValue : Resettable a -> a
getInitialValue resettable =

    case resettable of
        Initial initialValue ->
            initialValue

        Updated initialValue _ ->
            initialValue