const { readFile, readFileSync } = require("fs");
var parserXml = require("../dist")
var xml2js = require('xml2js');

const parser = new xml2js.Parser({ignoreAttrs : false, mergeAttrs : false});


data = readFileSync('./fixmsample1.xml')

getParsedData(data)

function getParsedData(data){
   return  parser.parseString(data, (err, result) => {
    if(err) throw err;
    let acris = parserXml.transformFixmToAcris(result);
    console.log(acris)
	    return acris;
});

}