import { getIATA } from '../asset/asset' ;
import winston from "winston" ;
import * as FILTER from "./filters"
import {getType} from'./objectHandler' ;

const IterateObject = require("iterate-object")


const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});

export function validateFlightNumber(obj:any){

    obj.flightNumber.airlineCode = obj.flightNumber.airlineCode.replace(/[0-9]/g, '');
    obj.flightNumber.trackNumber = obj.flightNumber.trackNumber.replace(/\D/g,'');
    return obj
}


export function findAndReplaceIcao(dataValue:any){

    Object.keys(dataValue).forEach(key=>{
        if(key.toLowerCase().includes("icao")){
            if (typeof dataValue[key] === 'string'){
                dataValue.iataCode = toIATA(dataValue[key])
            }
        }
    })
}
export function convertICAO(obj:any){
    IterateObject(obj,(value: any)=> {
        const type = getType(value)
        switch (type){
            case 'object':
                findAndReplaceIcao(value)
            case 'array':
                convertICAO(value)
        }
    })
    return obj
}

export function validateObject(obj:any){
    obj = convertICAO(obj)
    validateFlightNumber(obj)
    return obj
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