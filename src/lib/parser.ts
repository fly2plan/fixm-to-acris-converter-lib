import {getEmptyAcris} from "../asset/ACRIS_Empty";
import { toClass } from "class-converter";
import { readFile } from "./fileHandler";
import { ACRISFlight } from "../asset/ACRISFlight";
import * as jsHandle from "./objectHandler"
import {formatObject} from "./formatter" ;
import {getModel} from "../asset/asset" ; 
import winston from "winston" ;
import { Parser } from "xml2js"

const parser = new Parser({ignoreAttrs : false, mergeAttrs : false});
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




export function transformFixmToAcris(fixmFilePath:string):any{
    setFixmDatFromFile(fixmFilePath)
    logger.info("Starting XML parsing")
    ACRIS_OBJ = jsHandle.JSONify(mapper(ACRISFlight))
    logger.info("Formatting ACRIS data")
    ACRIS_OBJ = formatObject(ACRIS_OBJ) 
    logger.info(" Parsed Object returned  as JSON ")
    return ACRIS_OBJ;

}

function mapper(classElement:any): any{
    const dataObj = mapAttributesOfElement(classElement.name)
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
        const keyValue = AirMoveAttributes[key]
        const valueType = jsHandle.getType(keyValue)
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

function setFixmDatFromFile(xmlFilePath:string){

    parser.parseString(readFile(xmlFilePath), (err:any, result:any) => {
        if(err) throw err
        setObjectValues(result)
    });


}
