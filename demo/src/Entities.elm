module Entities exposing
    ( Course
    , CourseId(..)
    , Entities
    , Task
    , TaskId(..)
    , Unit
    , UnitId(..)
    , init
    , union
    )

import Dict.Any as AnyDict exposing (AnyDict)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Decode
import Json.Encode as Encode exposing (Value)



-- Course --


type CourseId
    = CourseId String


courseIdDecoder : Decoder CourseId
courseIdDecoder =
    Decode.map CourseId Decode.string


courseIdToString : CourseId -> String
courseIdToString (CourseId id) =
    id


encodeCourseId : CourseId -> Encode.Value
encodeCourseId =
    courseIdToString >> Encode.string


type alias Course =
    { id : CourseId
    , code : String
    , name : String
    , description : String
    , text : String
    , nominalHours : Int
    , anzsco : String
    , asco : String
    , qualificationVocationalTrainingArea : String
    , qualificationFieldOfEducation : String
    , associatedCourseIdentifier : String
    , qualificationLevel : String
    , isArchived : Bool
    , inAvetmiss : Bool
    , hasLogbook : Bool
    , hasTrainingPlan : Bool
    , hasTrainingPlanPoints : Bool
    , hasTransitionAgreement : Bool
    , hasApprenticeAgreement : Bool
    , hasStatementOfAttainment : Bool
    , hasEmployerAssessment : Bool
    , hasCertificateDescriptor : Bool
    }


courseDecoder : Decoder Course
courseDecoder =
    Decode.succeed Course
        -- fields
        |> Decode.required "id" courseIdDecoder
        |> Decode.required "code" Decode.string
        |> Decode.required "name" Decode.string
        |> Decode.required "description" Decode.string
        |> Decode.required "text" Decode.string
        |> Decode.required "nominalHours" Decode.int
        |> Decode.required "anzsco" Decode.string
        |> Decode.required "asco" Decode.string
        |> Decode.required "qualificationVocationalTrainingArea" Decode.string
        |> Decode.required "qualificationFieldOfEducation" Decode.string
        |> Decode.required "associatedCourseIdentifier" Decode.string
        |> Decode.required "qualificationLevel" Decode.string
        |> Decode.required "isArchived" Decode.bool
        |> Decode.required "inAvetmiss" Decode.bool
        |> Decode.required "hasLogbook" Decode.bool
        |> Decode.required "hasTrainingPlan" Decode.bool
        |> Decode.required "hasTrainingPlanPoints" Decode.bool
        |> Decode.required "hasTransitionAgreement" Decode.bool
        |> Decode.required "hasApprenticeAgreement" Decode.bool
        |> Decode.required "hasStatementOfAttainment" Decode.bool
        |> Decode.required "hasEmployerAssessment" Decode.bool
        |> Decode.required "hasCertificateDescriptor" Decode.bool



-- relationships (ANY RELATIONSHIP ADDED HERE NEEDS TO BE ADDED TO THE MERGE FUNCTION BELOW)


mergeCourse : Course -> Course -> Course
mergeCourse existing new =
    new



-- Task --


type TaskId
    = TaskId String


taskIdDecoder : Decoder TaskId
taskIdDecoder =
    Decode.map TaskId Decode.string


taskIdToString : TaskId -> String
taskIdToString (TaskId id) =
    id


type alias Task =
    { id : TaskId
    , name : String
    , description : String
    , phoenixId : Maybe Int
    }


taskDecoder : Decoder Task
taskDecoder =
    Decode.succeed Task
        -- fields
        |> Decode.required "id" taskIdDecoder
        |> Decode.required "name" Decode.string
        |> Decode.required "description" Decode.string
        |> Decode.required "phoenixId" (Decode.maybe Decode.int)


mergeTask : Task -> Task -> Task
mergeTask existing new =
    new



-- Unit --


type UnitId
    = UnitId String


unitIdDecoder : Decoder UnitId
unitIdDecoder =
    Decode.map UnitId Decode.string


encodeUnitId : UnitId -> Value
encodeUnitId =
    unitIdToString >> Encode.string


unitIdToString : UnitId -> String
unitIdToString (UnitId id) =
    id


type alias Unit =
    { id : UnitId
    , code : String
    , name : String
    , isArchived : Bool
    , isAssessable : Bool
    , description : String
    , requiredResources : String
    , assessorInstructions : String
    , inAvetmiss : Bool
    , modcompFoeId : String
    , nominalHours : Int
    , nominalHoursUnsupervised : Int
    , scheduledHours : Int
    , points : Int
    , employerObservations : String
    , practicalAssessments : String
    , practicalSkills : String
    }


unitDecoder : Decoder Unit
unitDecoder =
    Decode.succeed Unit
        -- fields
        |> Decode.required "id" unitIdDecoder
        |> Decode.required "code" Decode.string
        |> Decode.required "name" Decode.string
        |> Decode.required "isArchived" Decode.bool
        |> Decode.required "isAssessable" Decode.bool
        |> Decode.required "description" Decode.string
        |> Decode.required "requiredResources" Decode.string
        |> Decode.required "assessorInstructions" Decode.string
        |> Decode.required "inAvetmiss" Decode.bool
        |> Decode.required "modcompFoeId" Decode.string
        |> Decode.required "nominalHours" Decode.int
        |> Decode.required "nominalHoursUnsupervised" Decode.int
        |> Decode.required "scheduledHours" Decode.int
        |> Decode.required "points" Decode.int
        |> Decode.required "employerObservations" Decode.string
        |> Decode.required "practicalAssessments" Decode.string
        |> Decode.required "practicalSkills" Decode.string


mergeUnit : Unit -> Unit -> Unit
mergeUnit existing new =
    new



-- Entities --


type alias Entities =
    { courses : AnyDict String CourseId Course
    , units : AnyDict String UnitId Unit
    , tasks : AnyDict String TaskId Task
    }


init : Entities
init =
    { courses = AnyDict.empty courseIdToString
    , units = AnyDict.empty unitIdToString
    , tasks = AnyDict.empty taskIdToString
    }


entitiesDecoder : Decoder Entities
entitiesDecoder =
    Decode.succeed Entities
        -- fields
        |> Decode.optional "courses" (anyDictDecoder courseIdToString CourseId courseDecoder) (AnyDict.empty courseIdToString)
        |> Decode.optional "units" (anyDictDecoder unitIdToString UnitId unitDecoder) (AnyDict.empty unitIdToString)
        |> Decode.optional "tasks" (anyDictDecoder taskIdToString TaskId taskDecoder) (AnyDict.empty taskIdToString)


type alias DictItem a =
    { result : a
    , entities : Entities
    }


type alias DictCollection a =
    { result : List a
    , entities : Entities
    }


anyDictDecoder : (k -> String) -> (String -> k) -> Decoder v -> Decoder (AnyDict String k v)
anyDictDecoder toString keyConstructor entityDecoder =
    Decode.keyValuePairs entityDecoder
        |> Decode.map (List.map (Tuple.mapFirst keyConstructor))
        |> Decode.map (AnyDict.fromList toString)


dictItemDecoder : Decoder a -> Decoder (DictItem a)
dictItemDecoder idDecoder =
    Decode.succeed DictItem
        |> Decode.required "result" idDecoder
        |> Decode.required "entities" entitiesDecoder


dictCollectionDecoder : Decoder a -> Decoder (DictCollection a)
dictCollectionDecoder idDecoder =
    Decode.succeed DictCollection
        |> Decode.required "result" (Decode.list idDecoder)
        |> Decode.required "entities" entitiesDecoder


union : Entities -> Entities -> Entities
union existingEntities newEntities =
    { courses = unionDictionary mergeCourse existingEntities.courses newEntities.courses
    , units = unionDictionary mergeUnit existingEntities.units newEntities.units
    , tasks = unionDictionary mergeTask existingEntities.tasks newEntities.tasks
    }


unionDictionary : (value -> value -> value) -> AnyDict String key value -> AnyDict String key value -> AnyDict String key value
unionDictionary mergeFunc existing new =
    AnyDict.foldl (mergeDictionaryEntity mergeFunc) existing new


mergeDictionaryEntity : (value -> value -> value) -> key -> value -> AnyDict String key value -> AnyDict String key value
mergeDictionaryEntity mergeFunc key value acc =
    case AnyDict.get key acc of
        Nothing ->
            AnyDict.insert key value acc

        Just existing ->
            AnyDict.insert key (mergeFunc existing value) acc
