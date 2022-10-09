import Role from "../role/Role"

export default class User {
    id : number = 0
    statusID : number = 0
    name : string = "" 
    surname : string = ""
    emailAddress :string = ""
    imagePath : string = ""
    isGlobalAdmin : boolean = false
    password : string = ""
    roleID? : number
    roleName : string = ""
    role : Role = new Role()
}