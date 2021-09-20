const { writeFileSync} = require('fs')
var parser = require('../lib/index')




acrisData  = parser.parseFixmFromFile('./4.2/fixmorginal.xml')

// console.log(ast)

console.log("Data : ",acrisData)
writeFileSync("acris.json",JSON.stringify(acrisData))
