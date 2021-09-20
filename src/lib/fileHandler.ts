import { readFileSync, writeFileSync ,existsSync} from "fs";
import winston from "winston"

const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});

// Write file
export const writeFile=(fileName:string,data:any)=>{
    try{
        writeFileSync(fileName,data)
    }catch(e){
        logger.error(`File Write Error : ${e}`)
    }
}
// Read a File
export const readFile=(filepath:string)=>{
    if(existsSync(filepath)){
        return readFileSync(filepath,"utf8")
    }else{
        logger.error(`No Such File Exists : ${filepath}`);
        throw ReferenceError("File not found")
    }
}

