import utils,{nonObjectTypes} from "./utils.js"

// Core Function 
export default function javaScriptObjectToInterface(jsonData:string,numSpaces=4,useBol:boolean=false){
    const jsonDataType = typeof jsonData
    const isNotJsonObject = nonObjectTypes.includes(jsonDataType) ? false : true
    const spaces = utils.num2Spaces(numSpaces)
    // If jsonData is not a json object, return it's value
    if(isNotJsonObject) return utils.getType(jsonData)
    // Else get JavaScript Object types
    const jsObject:any = JSON.parse(jsonData)
     // Remove _useBol if exists in object
    if(jsObject.hasOwnProperty("_useBol")){ delete jsObject['_useBol'] }

    let interfaceData = "{"

    // Loop jsObject key and value
    for(let [key,value] of Object.entries(jsObject)){
        const keyValue:any = value
        // Get vale type
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
            // Check if all values in array are the same
            const sameTypes = isSameTypesInList(keyValue)
            // If type in list are the same and it's an object
            if(sameTypes && utils.getType(keyValue[0])==="object"){
                const jsonData = JSON.stringify(keyValue[0])
                interfaceData+=`\n${spaces}${key}:${javaScriptObjectToInterface(jsonData,8,true)}`
            }
            // Else if are not the same get types in list
            else{
                // getTypesInList(keyValue)
                interfaceData+=`\n${spaces}${key}:${getTypesInList(keyValue)}`
            }
        }
        
    }
    // Return response
    return `${interfaceData}\n${spaces.length===4?"":"    "}}`
}

//** Check if all item in list are the same */
function isSameTypesInList(items:any){
    const itemKeys:any[] = []
    for(const item of items){
        const type = typeof item
        if(!itemKeys.includes(type)) itemKeys.push(type)
    }
    return itemKeys.length === 1 ? true : false
}

//** Check if all item in list are the same */
function getTypesInList(items:any){
    const types:any[] = []
    // Loop all items
    for(const item of items){
        const type = utils.getType(item)
        // If object
        if(type==="object"){
            const jsonData = JSON.stringify(item)
            types.push(javaScriptObjectToInterface(jsonData,0,true).replace(/\n| /gi,""))
        }
        // Else return it's type
        else types.push(type)
    }
    // Return multiple types list
    return `(${types.join("|")})[]`
}