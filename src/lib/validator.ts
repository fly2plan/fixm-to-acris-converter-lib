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
    let icaoCode = obj.flightNumber.airlineCode
    let iataCode = toIATA(icaoCode.replace(/[0-9]/g, ''));

    if(iataCode == ''){
        obj.flightNumber.airlineCode = icaoCode.replace(/[0-9]/g, '')
    }else{
        obj.flightNumber.airlineCode = iataCode
    }

    obj.flightNumber.trackNumber = icaoCode.replace(/\D/g,'');
    if(obj.flightNumber.trackNumber ==''){
        logger.warn("Cannot Detect Track Number")
    }
    return obj
}

function setAirportCodes(obj:any){
    obj.departureAirport = toIATA(obj.departureAirport)
    obj.arrivalAirport = toIATA(obj.arrivalAirport)

}


export function findAndReplaceIcao(dataValue:any){
    let icaoKeys:any = ["locationIndicator"]

    Object.keys(dataValue).forEach(key=>{
        if(key.toLowerCase().includes("icao") ){
            if (typeof dataValue[key] === 'string'){
                dataValue.iataCode = toIATA(dataValue[key])
            }
        }
        if(icaoKeys.includes(key)){
            if (typeof dataValue[key] !== 'object'){
                dataValue[key] = toIATA(dataValue[key])
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

export function validateObject(obj:any,fixmVersion :string){
    obj = convertICAO(obj)
    validateFlightNumber(obj)
    if(fixmVersion === '4.1'){
        setAirportCodes(obj)
    }
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