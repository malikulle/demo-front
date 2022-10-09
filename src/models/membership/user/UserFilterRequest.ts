import User from "./User"

export class UserFilterRequest {
    pageIndex : number = 1
    pageSize : number = 10
    filter : User = new User()
}