/* eslint @typescript-eslint/no-var-requires: "off" */
import {getType} from'./objectHandler' ;
import winston from "winston" ;
import * as FILTER from "./filters"

const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});
/* tslint:disable no-var-requires */
const IterateObject = require("iterate-object")

function setTextValue(dataValue:any){
    if(FILTER.keyPresent(dataValue,"_")){
        dataValue.value = dataValue._
        delete dataValue._
    }

}


export function formatObject(formatObj:any){
    IterateObject(formatObj,(value: any,name:any)=> {

        const type = getType(value)
        switch (type){
            case 'object':
                setTextValue(value)
                FILTER.removeUnwantedKeys(value)
                FILTER.removeTag(value)
                FILTER.removeSingleArray(value)
                FILTER.removeEmptyFields(value)
                FILTER.removeEmptyArrays(name,value,formatObj)
                FILTER.removeEmptyObject(name,value,formatObj)
            case 'array':

                formatObject(value)
        }
    })
    FILTER.removeEmptyKeyFields(formatObj)
    return formatObj
}


