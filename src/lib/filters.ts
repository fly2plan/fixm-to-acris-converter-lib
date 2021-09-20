import { isEmpty } from "./objectHandler";


export function removeUnwantedKeys(dataValue : any){
    const keyList = ["extension","$","xsi:type"]
    keyList.forEach(key=>{
        if(keyPresent(dataValue,key)){
            delete dataValue[key] ;
         }
    })

}

export function keyPresent(srcObj:any,keyValue :string){
    return srcObj.hasOwnProperty(keyValue) ;
}

export function removeTag(objValue:any){
    const tag = ["fx:","fb:"]
    Object.keys(objValue).forEach(key=>{
        tag.forEach(tagValue=>{
            if(key.includes(tagValue)){
                let newKey = key.replace(tagValue,'')
                objValue[newKey] = objValue[key]
                delete objValue[key]
            }
        })

    })
}

export function removeEmptyFields(obj:any){
    const undesired = [""," ","  "]
    Object.keys(obj).forEach(key=>{
            undesired.forEach(element=>{
                if(obj[key] === element){
                    delete obj[key]
                }
            })
    })
}

export function  removeSingleArray(obj:any){
    Object.keys(obj).forEach(key=>{
        if(Array.isArray(obj[key])){
            if(obj[key].length === 1){
                obj[key] = obj[key][0]
            }
        }
    })
}

export function removeEmptyObject(key:any,value:any,obj:any){
    if(isEmpty(value)){
        delete obj[key]
    }
}
export function removeEmptyArrays(key:any,value:any,obj:any){
    if(Array.isArray(value)){
        if(value.length === 0){
                delete obj[key]
        }

    }

}


export function removeEmptyKeyFields(obj:any){
        Object.keys(obj).forEach(key=>{
            if(isEmpty(obj[key])){
                delete obj[key]
            }
        })
}
