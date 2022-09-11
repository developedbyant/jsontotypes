import utils,{nonObjectTypes} from "./utils.js"
import $jtot from "./$jtot.js" 

//** Create types from object */
export default function jtot(objectList:any[],name:string,typePath?:string){   
    const objectLength = objectList.length
    // Check if correct data was given
    if( objectLength === 0 || objectLength > 2){
        console.log("objectList length must be 1 or max 2") ; return ""
    }
    // Else run code
    const typeName = utils.capitalize(name)  
    const types = []
    // Loop all given object in list
    for(const jsObject of objectList){
        // Check if object uses _useBol
        const objectType = typeof jsObject
        const isJsonObject = nonObjectTypes.includes(objectType) ? false : true
        const useBol = ( isJsonObject && jsObject.hasOwnProperty("_useBol") ) ? jsObject['_useBol'] : false
        // If is not a JavaScrip Object push raw value to list
        if(!isJsonObject){ types.push(jsObject) ; continue }
        // Convert JavaScript Object to interface
        const jsonData = JSON.stringify(jsObject)
        types.push($jtot(jsonData,4,useBol))
    }
    // Create response
    let response:string
    // If length is 1 return interface
    if(objectLength===1) response = `export interface ${typeName} ${types.join(" | ")}`
    // Else return type, cause it's 2 object in list
    else response = `export type ${typeName} = ${types.join(" | ")}`
    // Save type(interface) if path was given
    if(typePath && response!=="") utils.saveType(response,typeName,typePath)
    // Return response
    return response
}