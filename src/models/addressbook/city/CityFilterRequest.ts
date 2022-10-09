import City from "./City"

export default class CityFilterRequest {
    pageIndex : number = 1
    pageSize : number = 10
    filter : City = new City()
}