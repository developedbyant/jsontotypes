import utils, { nonObjectTypes } from "./utils.js";
import $jtot from "./$jtot.js";
import { readFileSync, existsSync } from "fs";
//** Create types or interface from object */
export default function jtot(objectList, name, typePath) {
    const objectLength = objectList.length;
    // Check if correct data was given
    if (objectLength === 0 || objectLength > 2) {
        console.log("objectList length must be 1 or max 2");
        return "";
    }
    // Else run code
    const typeName = utils.capitalize(name);
    const types = [];
    // Loop all given object in list
    for (const jsObject of objectList) {
        // Check if object uses _useBol
        const objectType = typeof jsObject;
        const isJsonObject = nonObjectTypes.includes(objectType) ? false : true;
        const useBol = (isJsonObject && jsObject.hasOwnProperty("_useBol")) ? jsObject['_useBol'] : false;
        // If is not a JavaScrip Object push raw value to list
        if (!isJsonObject) {
            types.push(jsObject);
            continue;
        }
        // Convert JavaScript Object to interface
        const jsonData = JSON.stringify(jsObject);
        types.push($jtot(jsonData, 4, useBol));
    }
    // Create response
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
//** Create types or interface from json data */
export function jtotFromJson(jsonDataList, name, typePath) {
    jsonDataList = jsonDataList.trim();
    const isJsonList = jsonDataList.startsWith("[") && jsonDataList.endsWith("]");
    if (isJsonList) {
        const objectList = JSON.parse(jsonDataList);
        return jtot(objectList, name, typePath);
    }
    else {
        console.log(`Json data must be a list of json object example: [{"name:"Tone"}]`);
        return "";
    }
}
//** Create types or interface from json file path */
export function jtotFromFile(filePath, name, typePath) {
    const fileExists = existsSync(filePath);
    // Warn if file do not exists
    if (!fileExists) {
        console.log(`Json file:${filePath} do not exists.`);
        return "";
    }
    const jsonFileData = readFileSync(filePath).toString();
    const isJsonList = jsonFileData.startsWith("[") && jsonFileData.endsWith("]");
    if (isJsonList) {
        const objectList = JSON.parse(jsonFileData);
        return jtot(objectList, name, typePath);
    }
    else {
        console.log(`Json data must be a list of json object example: [{"name:"Tone"}]`);
        return "";
    }
}
