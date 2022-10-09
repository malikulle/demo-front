import { Category } from "./Category"

export default class CategoryFilterRequest {
    pageIndex : number = 1
    pageSize : number = 10
    filter : Category = new Category()
}