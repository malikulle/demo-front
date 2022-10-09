import Permission from "./Permission"

export default class PermissionFilterRequest{
    pageIndex : number = 1
    pageSize : number = 10
    filter : Permission = new Permission()
}