import { readFileSync } from "fs"
import { DEFAULT_VERSION } from "../lib/constants"
import path = require("path")



export const getModel = (modelFileName :string,version?:string)=>{
    if(version === undefined){
        version = DEFAULT_VERSION
    }
    const modelPath = path.join(__dirname ,"models" ,version, modelFileName + ".json")
    return readFileSync(modelPath,"utf8")
}

export const getIATA= ()=>{
    return JSON.parse(readFileSync(__dirname+"/IATA/ICAO_To_IATA.json", "utf8"))
}

export const getAlternative = ()=>{
    return JSON.parse(readFileSync(__dirname+"/Alternate/Alternate.json", "utf8"))
}

export const getCollectionModel = (version?:string)=>{
    if(version === undefined){
        version = DEFAULT_VERSION
    }
    const modelPath = path.join(__dirname ,"models" ,version,  "Collections.json")
    return JSON.parse(readFileSync(modelPath,"utf8"))

}

