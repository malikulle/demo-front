import Filter from "./Filter";
import Sort from "./Sort";

export default class Dynamic {
  sort: Sort[] = [];
  filter?: Filter 
  page : number = 1
  pageSize : number = 10
}
