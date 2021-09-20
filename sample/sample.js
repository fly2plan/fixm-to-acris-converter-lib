const { writeFileSync} = require('fs')
var parser = require('../lib/index')


// let xmlString = readFileSync('/home/sethuraman/Documents/Workspace/IBS/DataMapping/Adapter/fixm-to-acris-converter-lib/sample/fixmsample1.xml')

let acrisData  = parser.transformXmlFileToAcris('./4.2/fixmorginal.xml')

// console.log(ast)

console.log("Data : ",acrisData)
writeFileSync("acris.json",JSON.stringify(acrisData))
