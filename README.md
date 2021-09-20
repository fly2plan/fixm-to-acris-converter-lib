# Fixm-To-ACRIS-Converter-Lib

Nodejs library for FIXM 4.2 XML schema to ACRIS JSON Schema converter which take an FIXM xml contenet or file path as an input parameter and produce ACRIS based JSON ouput. The sample folder has file which shows how to use the library.  


####  * The Project Consist of * ####
	-  JSON files that maps the fixm xml tags to ACRIS attributes
	-  Typescript source code
	-  scripts to convert the project to js
	-  Sample code in JS
#### * Running the sample * ####
	-  Build the project using “npm run build”
	-  Go to the sample folder
	-  run “ node sample.js”
	-  This will generate an ACRIS.json file corresponding  to the given fixm sample
        -  The file acris.json have the output of the execution.
	
The transformFixmToAcris and transformXmlFileToAcris function are  entry points into the lib. The function transformFixmToAcris accept XML file contents and schema version(optional parameter one, no need to pass) as parameters. The function transformXmlFileToAcris accepts XML the file path and version . Version is optional parameter . Default is 4.2 .
	

