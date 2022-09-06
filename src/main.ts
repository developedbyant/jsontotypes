import * as fs from "fs"
import utils from "./utils.js"

// TODO: WORK ON MULTIPLE OBJECT INSIDE LIST

// Create types from object
export function jtotFromObject(objectData:object,name:string,typePath?:string){
    const json = JSON.stringify(objectData)
    const typeName = utils.capitalize(name)
    const interfaceData = `export interface ${typeName}${jsonToTypes(json,4)}//${typeName}\n`
    // Save interface to path
    if(typePath){
        utils.saveType(interfaceData,typeName,typePath)
    }
    // Return interface
    return interfaceData
}

// Create types from json
export function jtotFromJson(json:string,name:string,typePath?:string){
    const typeName = utils.capitalize(name)
    const interfaceData = `export interface ${typeName}${jsonToTypes(json,4)}//${typeName}\n`
    // Save interface to path
    if(typePath){
        utils.saveType(interfaceData,typeName,typePath)
    }
    // Return interface
    return interfaceData
}

// Create types from json file path
export function jtotFromFile(jsonFilePath:string,name:string,typePath?:string){
    const json = fs.readFileSync(jsonFilePath).toString()
    const typeName = utils.capitalize(name)
    const interfaceData = `export interface ${typeName}${jsonToTypes(json,4)}//${typeName}\n`
    // Save interface to path
    if(typePath){
        utils.saveType(interfaceData,typeName,typePath)
    }
    // Return interface
    return interfaceData
}
 
function jsonToTypes(json:string, numSpaces=4){
    // The number of spaces tab = 4 or more
    const spaces = utils.num2Spaces(numSpaces)
    const jsonObject:Object = JSON.parse(json)
    // Get all object entries and loop them
    let interfaceStr = "{"
    const objectEntries = Object.entries(jsonObject)

    for(const [objectKey,objectValue] of objectEntries){
        // Get objectValue type
        const type = utils.getType(objectValue) 
        // Run on list and objects
        // List
        if(type==="list"){
            // Check if list includes objects inside
            const includesObject = utils.includesObjects(objectValue)
            // If list do not include object return types inside list (string|number|more)
            if(!includesObject){
                interfaceStr += `\n${spaces}${objectKey}:${utils.getListTypesNoObject(objectValue)}`
            }
            // Check if list only includes objects
            // And all the objects are the same like posts
            else if(utils.includesOnlyObjects(objectValue)){
                interfaceStr += `\n${spaces}${objectKey}:${jsonToTypes(JSON.stringify(objectValue[0]),8)}[]`
            }
        } 
        // Object
        else if(type==="object"){
            interfaceStr += `\n${spaces}${objectKey}:${jsonToTypes(JSON.stringify(objectValue),8)}`
        }
        // Else if not a list or object
        // Return it's value type
        else{
            // Check if key contains special characters
            const specialCharacters = objectKey.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ig)
            interfaceStr += `\n${spaces}${specialCharacters ? `"${objectKey}"` : objectKey}:${type}`
        }
    }

    // Return interface
    return `${interfaceStr}\n${spaces.length===4?"":"    "}}`
}