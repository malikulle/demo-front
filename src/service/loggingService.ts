import AuditLog from "../models/logging/auditLog/AuditLog";
import AuditLogPagination from "../models/logging/auditLog/AuditLogPagination";
import ExceptionLog from "../models/logging/exceptionLog/ExceptionLog";
import ExceptionLogPagination from "../models/logging/exceptionLog/ExceptionLogPagination";
import Dynamic from "./base/Dynamic";
import HttpClient from "./base/HttpClient";
import { ServiceObjectResult } from "./base/serviceObjectResult";
import { WebAPICollectionRequest } from "./base/webAPICollectionRequest";
import WebApiObjectRequest from "./base/WebApiObjectRequest";

export default class LoggingService {
  private http = new HttpClient("Logging");

  getExceptionLog(id: number) {
    const request = new WebApiObjectRequest<ExceptionLog>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<ExceptionLog>>(
      "GetExceptionLog",
      request
    );
  }

  getExceptionLogs(filter: ExceptionLog, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<ExceptionLog>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<ExceptionLogPagination>>(
      "GetExceptionLogs",
      request
    );
  }

  getAuditLog(id: number) {
    const request = new WebApiObjectRequest<AuditLog>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<AuditLog>>(
      "GetAuditLog",
      request
    );
  }

  getAuditLogs(filter: AuditLog, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<AuditLog>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<AuditLogPagination>>(
      "GetAuditLogs",
      request
    );
  }
}
