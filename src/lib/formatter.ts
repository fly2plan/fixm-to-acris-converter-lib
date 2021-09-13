
import { getIATA } from '../asset/asset' ;
import {getType} from'./objectHandler' ;
const IterateObject = require("iterate-object")

function removeUnwantedKeys(dataValue : any){
    const keyList = ["extension","$"]
    keyList.forEach(key=>{
        if(keyPresent(dataValue,key)){
            delete dataValue[key] ;
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
            if(typeof dataValue !== 'object'){
                dataValue[key] = toIATA(dataValue[key])
            }

        }
    })
}

export function formatObject(formatObj:any){
    IterateObject(formatObj,(value: any)=> {
        let type = getType(value)
        switch (type){
            case 'object':
                removeUnwantedKeys(value)
                setTestValue(value)
                convertICAO(value)
            case 'array':
                formatObject(value)
        }
    })

    return formatObj
}



export function toIATA(icaoCode:any){
    let codeList = getIATA()
    return codeList[icaoCode]

}
