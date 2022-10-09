import { ServiceObjectResult } from "./base/serviceObjectResult";
import Language from "../models/configuration/language/Language";
import { WebAPICollectionRequest } from "./base/webAPICollectionRequest";
import LanguagePagination from "../models/configuration/language/LanguagePagination";
import HttClient from "./base/HttpClient";
import WebApiObjectRequest from "./base/WebApiObjectRequest";
import Parameter from "../models/configuration/paramater/Parameter";
import ParameterPagination from "../models/configuration/paramater/ParameterPagination";
import Dynamic from "./base/Dynamic";
import Job from "../models/configuration/job/Job";
import JobPagination from "../models/configuration/job/JobPagination";
import JobExecution from "../models/configuration/jobExecution/JobExecution";
import JobExecutionPagination from "../models/configuration/jobExecution/JobExecutionPagination";

export default class ConfigurationService {
  private http = new HttClient("configuration");

  getLanguages(filter: Language, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<Language>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<LanguagePagination>>(
      "GetLanguages",
      request
    );
  }
  getParameter(id: number) {
    const request = new WebApiObjectRequest<Parameter>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Parameter>>(
      "GetParameter",
      request
    );
  }

  getParameters(filter: Parameter, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<Parameter>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<ParameterPagination>>(
      "GetParameters",
      request
    );
  }

  updateParameter(requestData: Parameter) {
    const request = new WebApiObjectRequest<Parameter>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<Parameter>>(
      "UpdateParameter",
      request
    );
  }

  getJob(id: number) {
    const request = new WebApiObjectRequest<Job>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Job>>("GetJob", request);
  }

  getJobs(filter: Job, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<Job>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<JobPagination>>(
      "GetJobs",
      request
    );
  }

  updateJob(requestData: Job) {
    const request = new WebApiObjectRequest<Job>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<Job>>("UpdateJob", request);
  }

  getJobExecution(id: number) {
    const request = new WebApiObjectRequest<JobExecution>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<JobExecution>>(
      "GetJobExecution",
      request
    );
  }

  getJobExecutions(filter: JobExecution, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<JobExecution>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<JobExecutionPagination>>(
      "GetJobExecutions",
      request
    );
  }
}
