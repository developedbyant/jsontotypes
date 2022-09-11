import utils,{nonObjectTypes} from "./utils.js"

// Core Function 
export default function javaScriptObjectToInterface(jsonData:string,numSpaces=4,useBol:boolean=false){
    const jsonDataType = typeof jsonData
    const isNoJsonObject = nonObjectTypes.includes(jsonDataType) ? false : true
    const spaces = utils.num2Spaces(numSpaces)
    // If jsonData is not a json object, return it's value
    if(isNoJsonObject) return utils.getType(jsonData)
    // Else get JavaScript Object types
    const jsObject:any = JSON.parse(jsonData)
     // Remove _useBol if exists in object
    if(jsObject.hasOwnProperty("_useBol")){ delete jsObject['_useBol'] }

    let interfaceData = "{"

    // Loop jsObject key and value
    for(const [key,value] of Object.entries(jsObject)){
        const valueType = utils.getType(value,useBol)
    
        // If value type is not an list or JavaScript object return valueType(non object type)
        const returnValue = valueType!=="object" && valueType!=="list"
        if(returnValue){
            interfaceData+=`\n${spaces}${key}:${valueType}`
        }
        // Rerun JavaScript to Interface
        else if(valueType==="object"){
            interfaceData+=`\n${spaces}${key}:${javaScriptObjectToInterface(JSON.stringify(value),8,true)}`
        }
        // Loop list and get it's interfaces
        else if(valueType==="list"){
            interfaceData+=`\n${spaces}${key}:${utils.listToInterface(value)}`
            utils.listToInterface(value)
        }
        
    }
    // Return response
    return `${interfaceData}\n${spaces.length===4?"":"    "}}`
}