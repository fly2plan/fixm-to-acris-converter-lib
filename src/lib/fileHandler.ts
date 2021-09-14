import { readFileSync, writeFileSync ,existsSync} from "fs";
import winston from "winston"

const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});


export function writeFile(file:string,data:any){
    try{
        writeFileSync(file,data)
    }catch(e){
        logger.error("File Write Error : " + e)
    }
}
export function readFile(filepath:string){
    if(existsSync(filepath)){
        return readFileSync(filepath,"utf8")
    }else{
        logger.error("No Such File Exists : ",filepath);
        throw ReferenceError("File not found")
    }
}

