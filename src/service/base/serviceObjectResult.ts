export class ServiceResultMessage{
    public code : string = "";
    public description : string = "";
    public isWarning: boolean = false;
    public isError: boolean = false;
    public isSuccess: boolean = false;  
    
    addSuccess(description : string){
        this.isSuccess = true
        this.description = description;
        this.code = "SUCCESS-1"
    }
}

export interface ServiceObjectResult<T>{
     data : T;
    hasFailed: boolean ;
    messages : ServiceResultMessage[] ;
}

