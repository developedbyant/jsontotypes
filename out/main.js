import * as fs from "fs";
import utils from "./utils.js";
//** Create types from object */
export function jtotFromObject(objectList, name, typePath) {
    const objectLength = objectList.length;
    // Only run if objectList is 1 or max 2
    if (objectLength > 0 && objectLength <= 2) {
        const typeName = utils.capitalize(name);
        const types = [];
        // Loop all given object in list
        for (const objectData of objectList) {
            const json = JSON.stringify(objectData);
            const typeData = jsonToTypes(json, 4);
            types.push(typeData);
        }
        let response;
        // If length is 1 return interface
        if (objectLength === 1)
            response = `export interface ${typeName} ${types.join(" | ")}`;
        // Else return type, cause it's 2 object in list
        else
            response = `export type ${typeName} = ${types.join(" | ")}`;
        // Save type(interface) if path was given
        if (typePath && response !== "")
            utils.saveType(response, typeName, typePath);
        // Return response
        return response;
    }
    else {
        console.log("objectList length must be 1 or max 2");
        return "";
    }
}
//** Create types from json */
export function jtotFromJson(json, name, typePath) {
    // Check if parsed json start with [ mean it's a list
    if (!json.startsWith("[")) {
        console.log("Json data must be inside a list [ {},{} ]");
        return "";
    }
    // Else run code here
    const objectList = JSON.parse(json);
    const objectLength = objectList.length;
    // Only run if objectList is 1 or max 2
    if (objectLength > 0 && objectLength <= 2) {
        const typeName = utils.capitalize(name);
        const types = [];
        // Loop all given object in list
        for (const objectData of objectList) {
            const json = JSON.stringify(objectData);
            const typeData = jsonToTypes(json, 4);
            types.push(typeData);
        }
        let response;
        // If length is 1 return interface
        if (objectLength === 1)
            response = `export interface ${typeName} ${types.join(" | ")}`;
        // Else return type, cause it's 2 object in list
        else
            response = `export type ${typeName} = ${types.join(" | ")}`;
        // Save type(interface) if path was given
        if (typePath && response !== "")
            utils.saveType(response, typeName, typePath);
        // Return response
        return response;
    }
    else {
        console.log("objectList length must be 1 or max 2");
        return "";
    }
}
//** Create types from json file */
export function jtotFromFile(filePath, name, typePath) {
    const json = fs.readFileSync(filePath).toString();
    // Check if parsed json start with [ mean it's a list
    if (!json.startsWith("[")) {
        console.log("Json data must be inside a list [ {},{} ]");
        return "";
    }
    // Else run code here
    const objectList = JSON.parse(json);
    const objectLength = objectList.length;
    // Only run if objectList is 1 or max 2
    if (objectLength > 0 && objectLength <= 2) {
        const typeName = utils.capitalize(name);
        const types = [];
        // Loop all given object in list
        for (const objectData of objectList) {
            const json = JSON.stringify(objectData);
            const typeData = jsonToTypes(json, 4);
            types.push(typeData);
        }
        let response;
        // If length is 1 return interface
        if (objectLength === 1)
            response = `export interface ${typeName} ${types.join(" | ")}`;
        // Else return type, cause it's 2 object in list
        else
            response = `export type ${typeName} = ${types.join(" | ")}`;
        // Save type(interface) if path was given
        if (typePath && response !== "")
            utils.saveType(response, typeName, typePath);
        // Return response
        return response;
    }
    else {
        console.log("objectList length must be 1 or max 2");
        return "";
    }
}
function jsonToTypes(json, numSpaces = 4) {
    // Check if json is a boolean
    if (json === "false" || json === "true")
        return false;
    // The number of spaces tab = 4 or more
    const spaces = utils.num2Spaces(numSpaces);
    const jsonObject = JSON.parse(json);
    // Get all object entries and loop them
    let interfaceStr = "{";
    const objectEntries = Object.entries(jsonObject);
    for (const [objectKey, objectValue] of objectEntries) {
        // Get objectValue type
        const type = utils.getType(objectValue);
        // Run on list and objects
        // List
        if (type === "list") {
            // Check if list includes objects inside
            const includesObject = utils.includesObjects(objectValue);
            // If list do not include object return types inside list (string|number|more)
            if (!includesObject) {
                interfaceStr += `\n${spaces}${objectKey}:${utils.getListTypesNoObject(objectValue)}`;
            }
            // Check if list only includes objects
            // And all the objects are the same like posts
            else if (utils.includesOnlyObjects(objectValue)) {
                interfaceStr += `\n${spaces}${objectKey}:${jsonToTypes(JSON.stringify(objectValue[0]), 8)}[]`;
            }
        }
        // Object
        else if (type === "object") {
            interfaceStr += `\n${spaces}${objectKey}:${jsonToTypes(JSON.stringify(objectValue), 8)}`;
        }
        // Else if not a list or object
        // Return it's value type
        else {
            // Check if key contains special characters
            const specialCharacters = objectKey.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ig);
            interfaceStr += `\n${spaces}${specialCharacters ? `"${objectKey}"` : objectKey}:${type}`;
        }
    }
    // Return interface
    return `${interfaceStr}\n${spaces.length === 4 ? "" : "    "}}`;
}
