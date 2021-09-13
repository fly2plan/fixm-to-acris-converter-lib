
import { getAlternative } from "../asset/asset";
import winston from "winston" ;
const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});


export function getType(object:any){
    if(Array.isArray(object)){
        return 'array' ;
    }else{
        return typeof object ;
    }
}


export function JSONify(data :any){
    return JSON.parse(JSON.stringify(data));
}


function getDataFromObject(dataObject : any,Key :any){
    Key = verifiedKey(dataObject,Key);
    let keyValue = dataObject[Key];
    switch (typeof keyValue){
        case 'object':
            if(Array.isArray(keyValue)){
                keyValue = keyValue[0];
            }else{
                keyValue = JSONify(keyValue);
            }
            break
        case 'undefined':
            logger.error("Data Undefined");
            
    }
    return keyValue;
}


export function fetchDataFromPath(dataObj: any, keyList:string[]){
    keyList.forEach(key =>{
        dataObj = getDataFromObject(dataObj,key);
    })
    if(Array.isArray(dataObj)){
        dataObj = dataObj[0];
    }
    return dataObj;

}

function tryAlternateKey(key:string){
    logger.warn(" Cannot find key : ", key)
    logger.info("Trying Alternative key")
    let altKeys = getAlternative();
    if(altKeys.hasOwnProperty(key)){
        return altKeys[key] ;
    }else{
    
        return null ;
    }

}

function verifiedKey (dataObj :object,key:any){
    if (!Array.isArray(dataObj)){
        if(dataObj.hasOwnProperty(key)){
            return key ;
        }else{
            return tryAlternateKey(key) ;
       }
    }
    
}

