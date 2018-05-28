module Resettable exposing
    ( Resettable
    , init, update, reset
    , isChanged, getValue, getOriginalValue
    )


{-| This module is useful if you want to track changes to a value.

# Definition
@docs Resettable

# Initialise and update
@docs init, update, reset

# Getters
@docs isChanged, getValue, getOriginalValue

-}

{-| Represent values that may be original or updated. It can be useful if you have a
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
        Resettable.isChanged form.email || Resettable.isChanged form.password
-}
type Resettable a
    = Original a
    | Updated a a


{-| Initialise a value.

    init "Bob"     -- Original "Bob"
-}
init : a -> Resettable a
init =
    Original


{-| Updates a Resettable value.

    -- update to new value
    update "Joshua" (Original "Josh")       -- Updated "Josh" "Joshua"
    update "Bob" (Updated "Josh" "Joshua")  -- Updated "Josh" "Bob"

    -- if the new value is the original value or a changed value is set to it's original value, keep the original value
    update "Josh" (Original "Josh")         -- Original "Bob"
    update "Josh" (Updated "Josh" "Joshua") -- Original "Josh"
-}
update : a -> Resettable a -> Resettable a
update newValue resettable =

    case resettable of
        Original originalValue ->
            case newValue == originalValue of
                True ->
                    resettable

                False ->
                    Updated originalValue newValue

        Updated originalValue currentValue ->
            case (currentValue == newValue, originalValue == newValue) of
                (True, _) ->
                    resettable

                (False, True) ->
                    Original originalValue

                (False, False) ->
                    Updated originalValue newValue


{-| Reset to the original value.

    reset (Original "Josh")         -- Original "Josh"
    reset (Updated "Josh" "Joshua") -- Original "Josh"
-}
reset : Resettable a -> Resettable a
reset =
    getOriginalValue >> init


{-| Whether a value changed.

    isChanged (Original "Josh")         -- False
    isChanged (Updated "Josh" "Joshua") -- True

    when checking a lot of values, it may be helpful to put them in a list:

    -- if they all have the same type:
    List.any isChanged [ Original "Josh", Updated "Josh" "Joshua" ]   -- True

    -- if they have different types
    List.any ((==) True) [ isChanged (Original "Josh"), isChanged (Original 12) ]   -- False
-}
isChanged : Resettable a -> Bool
isChanged resettable =

    case resettable of
        Original _ ->
            False

        Updated _ _ ->
            True


{-| Get the current value.

    getValue (Original "Josh")         -- "Josh"
    getValue (Updated "Josh" "Joshua") -- "Joshua"
-}
getValue : Resettable a -> a
getValue resettable =

    case resettable of
        Original originalValue ->
            originalValue

        Updated _ updatedValue ->
            updatedValue


{-| Get the original value.

    getOriginalValue (Original "Josh")         -- "Josh"
    getOriginalValue (Updated "Josh" "Joshua") -- "Josh"
-}
getOriginalValue : Resettable a -> a
getOriginalValue resettable =

    case resettable of
        Original originalValue ->
            originalValue

        Updated originalValue _ ->
            originalValue