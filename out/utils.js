import * as fs from "fs";
export default new class utils {
    // Get type
    getType(data) {
        const dataType = typeof data;
        const isDateType = (dataType === "string" && this.isANumber(data.slice(0, 1))) && data.endsWith("Z") ? true : false;
        if (isDateType)
            return "Date";
        if (data === null)
            return "null";
        // Undefined
        if (data === undefined)
            return "undefined";
        // Boolean
        if (dataType === "boolean")
            return "boolean";
        // String
        if (dataType === "string")
            return "string";
        // Number
        if (dataType === "number")
            return "number";
        // If we here it's because data type is object or list
        // Get object or list type
        const objectType = JSON.stringify(data).startsWith("[") ? "list" : "object";
        // List
        if (objectType === "list")
            return "list";
        // Object
        else
            return "object";
    }
    // Check if list includes objects inside
    includesObjects(items) {
        let includeObject = false;
        // Loop
        for (const item of items) {
            const itemType = this.getType(item);
            if (itemType === "object") {
                includeObject = true;
                break; // Break loop 
            }
        }
        // Return result false | true
        return includeObject;
    }
    // Check if list only includes objects inside 
    includesOnlyObjects(items) {
        let includesOnlyObjects = true;
        // Loop
        for (const item of items) {
            const itemType = this.getType(item);
            if (itemType !== "object") {
                includesOnlyObjects = false;
                break; // Break loop 
            }
        }
        // Return result false | true
        return includesOnlyObjects;
    }
    // Get types inside list without object
    getListTypesNoObject(items) {
        const types = [];
        for (const item of items) {
            // Get item type
            const itemType = typeof item;
            // Only add if type not in types list
            if (!types.includes(itemType))
                types.push(itemType);
        }
        // Check if only one type or multiple
        if (types.length === 1) {
            return `${types[0]}[]`;
        }
        else {
            return `(${types.join('|')})[]`;
        }
    }
    // Convert number to spaces
    num2Spaces(num) {
        let spaces = '';
        for (let n of [...Array(num).keys()])
            spaces += ' ';
        return spaces;
    }
    // Capitalize string
    capitalize(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }
    // Check if string it's a number
    isANumber(data) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(data);
    }
    //** Save types to given path */
    saveType(newData, typeName, typePath) {
        // newData = JSON.stringify(newData,null,4)
        // Create file type if not founded
        if (!fs.existsSync(typePath))
            fs.writeFileSync(typePath, "// DO NOT REMOVE ANY TAG LIKE THESE <TypeName> or </TypeName> or INSIDE THEM\n");
        // Save to given path
        const oldData = fs.readFileSync(typePath).toString();
        // Update interface | type if typeName exists in type file path
        if (oldData.includes(`//<${typeName}>\n`) && `\n//</${typeName}>`) {
            const oldDataInner = oldData.split(`//<${typeName}>\n`)[1].split(`\n//</${typeName}>`)[0];
            // Replace old data for new one
            fs.writeFileSync(typePath, oldData.replace(oldDataInner, newData));
        }
        // Add new type | interface to file
        else
            fs.appendFileSync(typePath, `\n\n//<${typeName}>\n${newData}\n//</${typeName}>`);
    }
};
