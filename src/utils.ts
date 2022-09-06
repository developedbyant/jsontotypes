import * as fs from "fs"

export default new class utils{

    // Get type
    getType(data:any){
        const dataType = typeof data
        const isDateType = (dataType==="string" && this.isANumber(data.slice(0,1))) && data.endsWith("Z") ? true : false
        if(isDateType) return "Date"
        if(data===null) return "null"
        // Undefined
        if(data===undefined) return "undefined"
        // Boolean
        if(dataType==="boolean") return "boolean"
        // String
        if(dataType==="string") return "string"
        // Number
        if(dataType==="number") return "number"
        // If we here it's because data type is object or list
        // Get object or list type
        const objectType = JSON.stringify(data).startsWith("[") ? "list" : "object"
        // List
        if(objectType==="list") return "list"
        // Object
        else return "object"
    }

    // Check if list includes objects inside
    includesObjects(items:any[]){
        let includeObject = false
        // Loop
        for(const item of items){
            const itemType = this.getType(item)
            if(itemType==="object"){
                includeObject = true 
                break // Break loop 
            }
        }
        // Return result false | true
        return includeObject
    }

    // Check if list only includes objects inside 
    includesOnlyObjects(items:any[]){
        let includesOnlyObjects = true
        // Loop
        for(const item of items){
            const itemType = this.getType(item)
            if(itemType!=="object"){
                includesOnlyObjects = false 
                break // Break loop 
            }
        }
        // Return result false | true
        return includesOnlyObjects
    }

    // Get types inside list without object
    getListTypesNoObject(items:any[]){
        const types:any[] = []
        for(const item of items){
            // Get item type
            const itemType = typeof item
            // Only add if type not in types list
            if(!types.includes(itemType)) types.push(itemType)
        }
        // Check if only one type or multiple
        if(types.length===1){ return `${types[0]}[]` }
        else{ return `(${types.join('|')})[]` }
    }

    // Convert number to spaces
    num2Spaces(num:number){
        let spaces = ''
        for(let n of [...Array(num).keys()]) spaces += ' '
        return spaces
    }

    // Capitalize string
    capitalize(data:string){
        return data.charAt(0).toUpperCase()+data.slice(1)
    }

    // Check if string it's a number
    isANumber(data:string){
        return [0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(data)
    }

    // Save types to given path
    saveType(interfaceData:string,typeName:string,typePath:string){
        // Check if path exists
        // If not create new path file
        if(!fs.existsSync(typePath)) fs.writeFileSync(typePath,"")
        // Save to given path
        const typePathData = fs.readFileSync(typePath).toString()
        if(typePathData.includes(typeName)){
            // Update interface
            const interfaceInner = typePathData.split(`export interface ${typeName}`)[1].split(`//${typeName}\n`)[0]
            const oldInterface = `export interface ${typeName}${interfaceInner}//${typeName}\n`
            // Replace old data for new one
            fs.writeFileSync(typePath,typePathData.replace(oldInterface,interfaceData))
        }else{
            // Add new interface 
            fs.appendFileSync(typePath,interfaceData)
        }
    }

}