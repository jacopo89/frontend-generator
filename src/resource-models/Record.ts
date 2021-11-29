import _ from 'lodash';
import {Model} from "./Model";


export class Record extends Object{

    /**
     * This method allows to create a Record object where each recognised property correctly gives its record value.
     * If the json record does not have a property listed within the model, that property won't be mapped by means of the model
     * @param jsonModel
     * @param model
     */
    static createFromJson(jsonModel:any, model: Model):Record{
        const record = new Record();
        Object.keys(jsonModel).forEach(key =>  {
            try{
                const propertyModel = model.getProperty(key);
                // @ts-ignore
                record[key] = propertyModel.getRecord(jsonModel[key]);
            }catch(error){
                // @ts-ignore
                record[key] = Record.createFromJsonNoModel(jsonModel[key])
            }
        });
        return record;
    }

    static createFromJsonNoModel(jsonModel:any):any{

            if(Array.isArray(jsonModel)){
                const map = new Map();
                jsonModel.forEach((item:object, index:number) => map.set(index,Record.createFromJsonNoModel(item)))
                return map;
                // @ts-ignore
            }else if(jsonModel===null){
                return null;
            }
            else if(typeof jsonModel === "object"){
                const record = new Record();
                Object.keys(jsonModel).forEach(key => {
                    // @ts-ignore
                    record[key] = Record.createFromJsonNoModel(jsonModel[key])
                })
                return record;
            }else{
                // @ts-ignore
                return jsonModel
            }
    }


    getPropertyRecord(name:string): any{
        const split = _.split(name, ".");
        const reducerModel = (accumulator:any, value:string):any |undefined => {
            return accumulator ? accumulator[value] : new Record();
        }
        // @ts-ignore
        return split.reduce(reducerModel, this);
    }

    getListPropertyRecord(name:string): any{
        const split = _.split(name, ".");
        split.pop();
        const reducerModel = (accumulator:any, value:string):any |undefined => {
            return accumulator ? accumulator[value] : new Record();
        }
        // @ts-ignore
        return split.reduce(reducerModel, this);
    }


    toJson(){
        return this;
    }
}
