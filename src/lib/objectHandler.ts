import { getAlternative, getCollectionModel } from "../asset/asset";
import winston from "winston" ;

const IterateObject = require("iterate-object")
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
    if(Key === null){
        return ''
    }
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
                logger.error("The data for key :" + Key + " is undefined, setting empty value");
                keyValue = ''
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


function verifiedKey (dataObj :object,key:any){
    if (!Array.isArray(dataObj)){
        if(dataObj.hasOwnProperty(key)){
            return key ;
        }else{
            return tryAlternateKey(key) ;
       }
    }
    
}

function tryAlternateKey(key:string){
    logger.warn('Cannot find key : '+ key+ ' Trying Alternative key')
    const altKeys = getAlternative();
    if(altKeys.hasOwnProperty(key)){
        return altKeys[key] ;
    }else{
        logger.warn('Cannot find alternate for key : '+ key)
        return null ;
    }

}

export function generateCollectionFromObject(collectionObject:any,Key:string,collectionDetails:any,iterObj:any):any{
  let CollectObj :any;
  const collectionKeySet = collectionDetails.keys
  const collectionBase = collectionDetails.base
  IterateObject([iterObj],(value:any)=>{
      let type = getType(value)
      switch (type){
          case 'object':
              if(value.hasOwnProperty(collectionBase)){
                if(value[collectionBase]=== undefined){
                    logger.error("Cannot find collection object base, setting empty collection value")
                    collectionObject[Key] = []
                }else{
                CollectObj = value[collectionBase]
                collectionKeySet.forEach((key:any)=>{
                    CollectObj = collectKeys(CollectObj,key)
                })
                collectionObject[Key] = CollectObj
                return
              }
            }
          case 'array':
            generateCollectionFromObject(collectionObject,Key,collectionDetails,value)
      }
  })
   
}



function collectKeys(obj :any,Pkey:any){
    let objectLst:any = []
    IterateObject(obj,(value:any)=>{
        let type = getType(value)
        switch(type){
            case 'object':
                Object.keys(value).forEach(key=>{
                    if(key === Pkey){
                        objectLst.push(value[key][0])
                    }
                })
        }
    })
    obj = objectLst
    return obj
}


export function isEmpty(obj:any) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}