/* eslint @typescript-eslint/no-var-requires: "off" */
import { getIATA } from '../asset/asset' ;
import {getType} from'./objectHandler' ;
import winston from "winston" ;

const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});
/* tslint:disable no-var-requires */
const IterateObject = require("iterate-object")

function removeUnwantedKeys(dataValue : any){
    const keyList = ["extension","$"]
    keyList.forEach(key=>{
        if(keyPresent(dataValue,key)){
            delete dataValue[key] ;
         }
    })

}


function removeTag(objValue:any){
    let tag = "fx:"
    Object.keys(objValue).forEach(key=>{
        if(key.includes(tag)){
            let newKey = key.replace(tag,'')
            objValue[newKey] = objValue[key]
            delete objValue[key]
        }
    })
}

function keyPresent(srcObj:any,keyValue :string){
    return srcObj.hasOwnProperty(keyValue) ;
}

function setTestValue(dataValue:any){
    if(keyPresent(dataValue,"_")){
        dataValue.value = dataValue._
        delete dataValue._
    }

}

export function convertICAO(dataValue:any){

    Object.keys(dataValue).forEach(key=>{
        if(key.toLowerCase().includes("icao")){
            if (typeof dataValue[key] === 'string'){
                dataValue.iataCode = toIATA(dataValue[key])
            }
        }
    })
}

export function formatObject(formatObj:any){
    IterateObject(formatObj,(value: any)=> {
        const type = getType(value)
        switch (type){
            case 'object':
                removeUnwantedKeys(value)
                setTestValue(value)
                convertICAO(value)
                removeTag(value)
            case 'array':
                formatObject(value)
        }
    })

    return formatObj
}



export function toIATA(icaoCode:string){
    const codeList = getIATA()
    let IATAcode = codeList[icaoCode]
    if(IATAcode === undefined){
        logger.warn("Cannot find the IATA code to the corresponding ICAO Code :"+icaoCode+", Setting empty value")
        IATAcode = ''
    }
    return IATAcode

}
