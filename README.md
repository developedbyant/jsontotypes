## Generate TypeScript interfaces and types from Json,JavaScript Object and Json files.
``` ts
// Import module
import jtot, { jtotFromJson, jtotFromFile } from "jtot"
// jtot take 3 params
    // 1 list object js object
    // 2 interface|type name
    // 3 path to save data (optinal)
// List of object must be 1 for interface or 2 for OR type
// add { _useBol:true } to treat boolean as boolean not false|true

// Create single interface
const userData = {
    name:"Tony", age:24, canPost:true
}
// Wrap inside a list [userData]
const userInterface = jtot([userData],"User","types.ts")
// OUTPUT
export interface User {
    name:string
    age:number
    canPost:true
}

// Create OR type
const errorObject = { ok:false, msg:"Could not create user" }
    // added _useBol to treat canPost boolean
const newUserData = { _useBol:true, name:"Tony", age:24, canPost:true }
const newUserResponseType = [errorObject,newUserData] 
// OUTPUT
export type NewUserOutOut = {
    ok:false
    msg:string
} | {
    name:string
    age:number
    canPost:boolean
}

// Create interface from json string(data)
jtotFromJson(`[{"name":"Tone","age":23,"canPost":true}]`,"UserFromJsonString")
// OUTPUT
export interface UserFromJsonString {
    name:string
    age:number
    canPost:boolean
}

// Create interface from json string(data)
const interfaceFromJsonFile = jtotFromFile("test/sample.json","UserFromJsonFile")
// OUTPUT
export interface NewUserOutOut {
    name:string
    age:number
    canPost:boolean
}
```