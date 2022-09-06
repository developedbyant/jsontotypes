## Generate TypeScript interfaces and types from Json,JavaScript Object and Json files.
### Import functions
``` js
import { jsonToTypesFromFile,jsonToTypesFromObject,jsonToTypesFromJson } from "jsontotypes"
```
### Or just use npx
```
npx @developedbyant/j2t --file=fileName.json --name=User

--file (The json file path)
--name (Interface name)
```
## Optional typePath
``` js 
// You can also pass typePath
// It will allow to save the generated interface
// To given path
const typePath = "types.ts"
jsonToTypesFromObject(userObject,"User",typePath)
jsonToTypesFromFile(jsonFilePath,"UserFromJsonFile",typePath)
jsonToTypesFromJson(jsonString,"UserFromJsonString",typePath)
```
### Using JavaScript Object
``` js
const userObject = {
    name:"Tony",
    age:24,
    jobs:[ "developer","singer" ],
    posts:[
        { id:1, title:"How to cook", tags:["cook"] },
        { id:2, title:"How to drive", tags:["drive"] }
    ]
}
// User = Interface name
console.log( jsonToTypesFromObject(userObject,"User") )
```
### Using json file 
``` js
// UserFromJsonFile = Interface name
const jsonFilePath = "test/user.json"
console.log( jsonToTypesFromFile(jsonFilePath,"UserFromJsonFile") )
```
### Using json string 
``` js
// UserFromJsonString = Interface name
const jsonString = JSON.stringify(userObject)
console.log( jsonToTypesFromFile(jsonString,"UserFromJsonString") )
```
### Outputs
``` ts
export interface User{
    name:string
    age:number
    jobs:string[]
    posts:{
        id:number
        title:string
        tags:string[]
    }
}
export interface UserFromJsonFile{
    name:string
    age:number
    jobs:string[]
    posts:{
        id:number
        title:string
        tags:string[]
    }
}
export interface UserFromJsonString{
    name:string
    age:number
    jobs:string[]
    posts:{
        id:number
        title:string
        tags:string[]
    }
}
```
## TODO: WORK ON MULTIPLE OBJECT INSIDE LIST