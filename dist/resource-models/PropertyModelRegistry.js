import { BOOLEAN, DATE, EMBEDDED_MULTIPLE, EMBEDDED_SINGLE, ENUM_MULTIPLE, ENUM_SINGLE, FILE_MULTIPLE, FILE_SINGLE, FLOAT, ID, IMAGE_MULTIPLE, INTEGER, MONEY, PHONE, REFERENCE, REFERENCE_MULTIPLE, STRING, TEXTAREA } from "../generators/forms/inputs/InputTypes";
import { NumberModel } from "./propertyModels/NumberModel";
import { ReferenceModel } from "./propertyModels/ReferenceModel";
import { EmbeddedSingleModel } from "./propertyModels/EmbeddedSingleModel";
import { EmbeddedMultipleModel } from "./propertyModels/EmbeddedMultipleModel";
import { BooleanModel } from "./propertyModels/BooleanModel";
import { DateModel } from "./propertyModels/DateModel";
import { SingleFileModel } from "./propertyModels/SingleFileModel";
import { MultipleImageModel } from "./propertyModels/MultipleImageModel";
import { FloatModel } from "./propertyModels/FloatModel";
import { TextareaModel } from "./propertyModels/TextareaModel";
import { PhoneModel } from "./propertyModels/PhoneModel";
import { MoneyModel } from "./propertyModels/MoneyModel";
import { EnumSingleModel } from "./propertyModels/EnumSingleModel";
import { EnumMultipleModel } from "./propertyModels/EnumMultipleModel";
import { IdModel } from "./propertyModels/IdModel";
import { StringModel } from "./propertyModels/StringModel";
import { ReferenceMultipleModel } from "./propertyModels/ReferenceMultipleModel";
import { MultipleFileModel } from "./propertyModels/MultipleFileModel";
/**
 * @Property {id} - Name of the property
 */
export class PropertyModelRegistry {
    static get(id, others) {
        switch (others.type) {
            case BOOLEAN: {
                return new BooleanModel(id, others);
            }
            case STRING: {
                return new StringModel(id, others);
            }
            case INTEGER: {
                return new NumberModel(id, others);
            }
            case DATE: {
                return new DateModel(id, others);
            }
            case REFERENCE: {
                return new ReferenceModel(id, others);
            }
            case REFERENCE_MULTIPLE: {
                return new ReferenceMultipleModel(id, others);
            }
            case EMBEDDED_SINGLE: {
                return new EmbeddedSingleModel(id, others);
            }
            case EMBEDDED_MULTIPLE: {
                return new EmbeddedMultipleModel(id, others);
            }
            case FILE_SINGLE: {
                return new SingleFileModel(id, others);
            }
            case IMAGE_MULTIPLE: {
                return new MultipleImageModel(id, others);
            }
            case FILE_MULTIPLE: {
                return new MultipleFileModel(id, others);
            }
            case FLOAT: {
                return new FloatModel(id, others);
            }
            case TEXTAREA: {
                return new TextareaModel(id, others);
            }
            case PHONE: {
                return new PhoneModel(id, others);
            }
            case MONEY: {
                return new MoneyModel(id, others);
            }
            case ENUM_SINGLE: {
                return new EnumSingleModel(id, others);
            }
            case ENUM_MULTIPLE: {
                return new EnumMultipleModel(id, others);
            }
            case ID: {
                return new IdModel(id, others);
            }
            default: {
                return new IdModel(id, others);
            }
        }
    }
}
