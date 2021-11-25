import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGetListingGroup} from "../redux/actions/verbs/get_listing";
import {getReferenceKeys, initializeReferenceFields} from "../generators/forms/formHelpers";
import {updateResourceListings} from "../redux/actions/app/actions";
import {Listings} from "../resource-models/listings/Listings";
import {Listing} from "../resource-models/listings/Listing";

export function GetListingsMap(model){
    const {getListingGroup} = useGetListingGroup();
    const initialReferenceMap = useMemo(()=>{return initializeReferenceFields(model)},[model]); //map with all reference fields
    const [referencesMap, setReferencesMap] = useState(initialReferenceMap);
    const resourceNames = useMemo(()=>{
        const referenceItemsKeys =  getReferenceKeys(model);
        return referenceItemsKeys.map(key => key.resourceName)
    },[model])

    const getListing = useCallback(()=>{
        if(resourceNames.length!==0){
            getListingGroup({resources:resourceNames}).then(result => {
                const newMap = new Map();
                Object.keys(result).forEach(key => newMap.set(key, result[key]));
                setReferencesMap((newMap))
            } );
        }
    },[resourceNames])

    useEffect(()=>{
       getListing();
    },[resourceNames])

    return {referencesMap, refreshReferencesMap: getListing};
}


export function UpdateListings(){
    const {resourceBuffer, listings} = useSelector(state=>state.appReducer);
    const dispatch = useDispatch();
    const {getListingGroup, loading} = useGetListingGroup();

    useEffect(()=>{console.log(resourceBuffer)},[resourceBuffer])

    const updateListings =useCallback(()=>{

        const finalMap = new Map();
        Array.from(resourceBuffer.entries()).forEach(([id,value])=>{
            finalMap.set(id, Object.fromEntries(value.entries()))
        })

        const resourceArray = Object.fromEntries(finalMap.entries())
        //const resourceArray = Array.from(resourceBuffer);
        if(Object.keys(resourceArray).length!==0){
            getListingGroup({resources:resourceArray}).then(result => {
                const listings = new Listings();
                Object.keys(result).forEach(key => listings.set(key, Listing.createFromJson(result[key])));
                dispatch(updateResourceListings(listings));
            } );
        }
    },[resourceBuffer]);

    useEffect(()=>updateListings(),[resourceBuffer]);

    return {listings,updateListings};

}
