import { readFileSync } from "fs"
import path = require("path")

let DEFAULT_VERSION = "4.2"


export function getModel(modelFileName :string,version?:string) {
    if(version === undefined){
        version = DEFAULT_VERSION
    }
    const modelPath = path.join(__dirname ,"models" ,version, modelFileName + ".json")
    return readFileSync(modelPath,"utf8")
}

export function getIATA(){
    return JSON.parse(readFileSync(__dirname+"/IATA/ICAO_To_IATA.json", "utf8"))
}

export function getAlternative(){
    return JSON.parse(readFileSync(__dirname+"/Alternate/Alternate.json", "utf8"))
}

export function getCollectionModel(version?:string){
    if(version === undefined){
        version = DEFAULT_VERSION
    }
    const modelPath = path.join(__dirname ,"models" ,version,  "Collections.json")
    return JSON.parse(readFileSync(modelPath,"utf8"))

}

