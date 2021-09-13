import {getEmptyAcris} from "../asset/ACRIS_Empty";
import { toClass } from "class-converter";
import { ACRISFlight } from "../asset/ACRISFlight";
import * as jsHandle from "./objectHandler"
import {formatObject} from "./formatter" ;
import {getModel} from "../asset/asset" ; 
import winston from "winston" ;

const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});
let FIXM_DATA:object;
let ACRIS_OBJ:object;

function setObjectValues(fixmDataObj:object){
    ACRIS_OBJ =  jsHandle.JSONify(getEmptyAcris())
    FIXM_DATA = fixmDataObj
}

//////////////////// MAPPING ///////////////////////////////////////

export function transformFixmToAcris(fixmDataObj:any):any{
    
    setObjectValues(fixmDataObj)
    logger.info("Starting XML parsing")
    ACRIS_OBJ = jsHandle.JSONify(mapper(ACRISFlight))
    logger.info("Formatting ACRIS data")
    ACRIS_OBJ = formatObject(ACRIS_OBJ) 
    logger.info(" Parsed Object rteun  as JSON ")
    return ACRIS_OBJ;

}

function mapper(classElement:any): any{
    let dataObj = mapAttributesOfElement(classElement.name)
    toClass(dataObj,classElement)
    return dataObj
}

function mapAttributesOfElement(elementName : string,elementObj?: any){
    let AirMoveAttributes:any;
    if(elementObj !== undefined){
        AirMoveAttributes = elementObj
    }else{
        AirMoveAttributes = JSON.parse(getModel(elementName))
    }
    Object.keys(AirMoveAttributes).forEach( key =>{ 
        let keyValue = AirMoveAttributes[key]
        let valueType = jsHandle.getType(keyValue)
        switch (valueType){
            case 'array':
                AirMoveAttributes[key] = jsHandle.fetchDataFromPath(FIXM_DATA,keyValue)
                break;
            case 'string':
                AirMoveAttributes[key] = mapAttributesOfElement(elementName=keyValue)
                break;
            case 'object':
                AirMoveAttributes[key]=mapAttributesOfElement(elementName,elementObj= keyValue)
                break;
        }    
    })
    return AirMoveAttributes

}


