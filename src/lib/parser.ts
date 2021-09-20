import {getEmptyAcris} from "../asset/ACRIS_Empty";
import { toClass } from "class-converter";
import { readFile, writeFile } from "./fileHandler";
import { ACRISFlight } from "../asset/ACRISFlight";
import * as jsHandle from "./objectHandler"
import {formatObject} from "./formatter" ;
import {getCollectionModel, getModel} from "../asset/asset" ; 
import winston, { version } from "winston" ;
import { Parser } from "xml2js"
import { validateObject } from "./validator";


const parser = new Parser({ignoreAttrs : false, mergeAttrs : false});
const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});

let VERSION :any
let FIXM_DATA:object;
let ACRIS_OBJ:object;

function setObjectValues(fixmDataObj:object){
    ACRIS_OBJ =  jsHandle.JSONify(getEmptyAcris())
    FIXM_DATA = fixmDataObj
}


export function parseFixmFromFile(fixmFilePath:string,fixmversion?:string){
    const fixmString = readFile(fixmFilePath)
    return transformFixmToAcris(fixmString,fixmversion)
}


export function transformFixmToAcris(xmlString:any,fixmversion?:string):any{
    
    setFixmDatFromFile(xmlString,fixmversion)
    logger.info("Starting XML parsing")
    ACRIS_OBJ = jsHandle.JSONify(mapper(ACRISFlight))
    logger.info("Formatting ACRIS data")
    ACRIS_OBJ = formatObject(ACRIS_OBJ) 
    logger.info(" Validateing ACRIS Fields")
    ACRIS_OBJ = validateObject(ACRIS_OBJ,VERSION)
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
        AirMoveAttributes = JSON.parse(getModel(elementName,VERSION))
    }
    Object.keys(AirMoveAttributes).forEach( key =>{ 
        const keyValue = AirMoveAttributes[key]
        const valueType = jsHandle.getType(keyValue)
        switch (valueType){
            case 'array':
                AirMoveAttributes[key] = jsHandle.fetchDataFromPath(FIXM_DATA,keyValue)
                break;
            case 'string':
                if(keyValue.includes("_collection")){
                    const model = getCollectionModel(VERSION)
                    const collectionObjectDetails = model[keyValue]
                    const iterobj = jsHandle.fetchDataFromPath(FIXM_DATA,collectionObjectDetails.path)
                    jsHandle.generateCollectionFromObject(AirMoveAttributes,key,collectionObjectDetails,iterobj)
                }else{
                    AirMoveAttributes[key] = mapAttributesOfElement(elementName=keyValue)
                }
                break;
            case 'object':
                AirMoveAttributes[key]=mapAttributesOfElement(elementName,elementObj= keyValue)
                break;
        }    
    })
    return AirMoveAttributes

}

function setFixmDatFromFile(fixmData:string,fixmVersion?:string){
    VERSION = fixmVersion
    parser.parseString(fixmData, (err:any, result:any) => {
        if(err) throw err
        setObjectValues(result)
    });
}