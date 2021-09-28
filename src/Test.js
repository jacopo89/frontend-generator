import React, {useState} from "react";
import {useSetResourceModel} from "./resource-models/modelsRegistry";
import {createServer} from "miragejs"
import {properties} from "./mock/properties";
import {listings} from "./mock/listings";
import {model} from "./mock/model";
import {overrideRegistry} from "./mock/overrideRegistry";
import {landlords} from "./mock/landlords";
import {propertyShow} from "./mock/propertyShow";
import {units} from "./mock/units";
import {landlordRelationship} from "./mock/landlordRelationship";
import {landlord} from "./mock/landlord";
import {tenancies} from "./mock/tenancies";
import {EditPage} from "./generators/pages/EditPageGenerator";
import {unit} from "./mock/unit";
import {RouteFilterList} from "./generators/pages/ListPageGenerator";

export default function Test(){


    createServer({
        routes() {
            this.get("http://localhost:1000/api/properties/1", ()=> propertyShow)

            this.get("http://localhost:1000/api/properties", () => properties);
            this.get("http://localhost:1000/api/landlords", () => landlords);
            this.get("http://localhost:1000/api/landlord_relationships/1", () => landlordRelationship);
            this.post("http://localhost:1000/api/resources/listings", ()=> listings)
            this.get("http://localhost:1000/resources", ()=> model)
            this.get("http://localhost:1000/api/units", ()=> units)
            this.get("http://localhost:1000/api/landlords/1", ()=> landlord)
            this.get("http://localhost:1000/api/landlord_relationships", ()=> tenancies)
        },
    })

    const modelLoaded = useSetResourceModel(overrideRegistry,"http://localhost:1000/resources" );


    const [resourceName, setResourceName] = useState(true)


    const render = <div>


        <RouteFilterList resourceName={"properties"} filters={{}}/>
        {/*<ShowPage propResourceName={"properties"} propId={1} propShowPage={<ShowPageCustom/>}/>*/}


    </div>
    return modelLoaded ? <div style={{padding:30}}>{render}</div> : <div></div>;
}
