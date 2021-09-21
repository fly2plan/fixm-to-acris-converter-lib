const { writeFileSync} = require('fs')
let parser = require('../lib/index')
let acrisData  = parser.transformXmlFileToAcris('./4.2/fixmorginal.xml')
console.log("Data : ",acrisData)
writeFileSync("acris.json",JSON.stringify(acrisData))
