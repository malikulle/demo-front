import Parameter from "./Parameter"

export default class ParameterFilterRequest{
    pageIndex : number = 1
    pageSize : number = 10
    filter : Parameter = new Parameter()
}