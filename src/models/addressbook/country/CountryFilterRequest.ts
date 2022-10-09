import Country from "./Country"

export default class CountryFilterRequest {
    pageIndex : number = 1
    pageSize : number = 10
    filter : Country = new Country()
}