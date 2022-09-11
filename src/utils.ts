import * as fs from "fs"

export const nonObjectTypes = [
    false, null, true, Date, undefined,
    "false", "null", "number", "true", "Date", "undefined", "boolean", "string", "list"
] 

export default new class utils{

    //** Get given data type */
    getType(data:any,useBol:boolean=false){
        // When using the key _useBoll, return false or true not boolean
        if(!useBol){
            // False
            if(data===false) return "false"
            // True
            if(data===true) return "true"
        }
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

    //** Get types of object in list */
    listToInterface(items:any){
        const itemLength = items.length
        // If Lenght is 0 retun any list
        if(itemLength===0) return "any[]"
        // Else get key inside object
        const firstObject = items[0]
        // If First object in list is non object type return it as value
        if(nonObjectTypes.includes(firstObject)) return `${firstObject}[]`

        const resultList = []

        // Else Loop all key in object
        for(const [key,value] of Object.entries(firstObject)){
            // Check if value is a JavaScript Object
            const objectType = typeof value
            const isJsObject = nonObjectTypes.includes(objectType) ? false : true
            // Run on Object
            if(isJsObject){
                const listData:string = this.listToInterface(value)
                resultList.push(`${key}:${listData}`)
            }
            // Run on non object
            else resultList.push(`${key}:${this.getType(value,true)}`)
        }
        return `{${resultList.join(",")}}[]`
    }

    //** Save types to given path */
    saveType(newData:string,typeName:string,typePath:string){
        // newData = JSON.stringify(newData,null,4)
        // Create file type if not founded
        if(!fs.existsSync(typePath)) fs.writeFileSync(typePath,"// DO NOT REMOVE ANY TAG LIKE THESE <TypeName> or </TypeName> or INSIDE THEM\n")
        // Save to given path
        const oldData = fs.readFileSync(typePath).toString()
        // Update interface | type if typeName exists in type file path
        if(oldData.includes(`//<${typeName}>\n`) && `\n//</${typeName}>`){
            const oldDataInner = oldData.split(`//<${typeName}>\n`)[1].split(`\n//</${typeName}>`)[0]
            // Replace old data for new one
            fs.writeFileSync(typePath,oldData.replace(oldDataInner,newData))
        }
        // Add new type | interface to file
        else fs.appendFileSync(typePath,`\n\n//<${typeName}>\n${newData}\n//</${typeName}>`)
    }

    //** Convert number to spaces */
    num2Spaces(num:number){
        let spaces = ''
        for(let n of [...Array(num).keys()]) spaces += ' '
        return spaces
    }

    //** Capitalize string */
    capitalize(data:string){
        return data.charAt(0).toUpperCase()+data.slice(1)
    }

    //** Check if string it's a number */
    isANumber(data:string){
        return [0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(data)
    }

}