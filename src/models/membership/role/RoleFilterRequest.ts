import Role from "./Role"

export class RoleFilterRequest {
    pageIndex : number = 1
    pageSize : number = 10
    filter : Role = new Role()
}