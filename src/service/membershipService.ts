import { UserLoginRequest } from "../models/membership/userLoginRequest";
import { ServiceObjectResult } from "./base/serviceObjectResult";
import { UserLoginResponse } from "../models/membership/userLoginResponse";
import WebApiObjectRequest from "./base/WebApiObjectRequest";
import Permission from "../models/membership/permission/Permission";
import { WebAPICollectionRequest } from "./base/webAPICollectionRequest";
import PermissionPaginationReponse from "../models/membership/permission/PermissionPaginationReponse";
import Role from "../models/membership/role/Role";
import RolePaginationResponse from "../models/membership/role/RolePaginationResponse";
import User from "../models/membership/user/User";
import UserPaginationResponse from "../models/membership/user/UserPaginationResponse";
import HttClient from "./base/HttpClient";
import Dynamic from "./base/Dynamic";

export default class MembershipService {
  private http = new HttClient("membership");

  login(requestData?: UserLoginRequest) {
    let request = new WebApiObjectRequest<UserLoginRequest>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<UserLoginResponse>>(
      "Login",
      request
    );
  }

  getPermissions(filter: Permission, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<Permission>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<PermissionPaginationReponse>>(
      "GetPermissions",
      request
    );
  }

  getPermission(id: number) {
    const request = new WebApiObjectRequest<Permission>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Permission>>(
      "GetPermission",
      request
    );
  }

  updatePermission(requestData: Permission) {
    const request = new WebApiObjectRequest<Permission>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<Permission>>(
      "UpdatePermission",
      request
    );
  }

  getRoles(filter: Role, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<Role>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<RolePaginationResponse>>(
      "GetRoles",
      request
    );
  }

  getRole(id: number) {
    const request = new WebApiObjectRequest<Role>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Role>>("GetRole", request);
  }

  updateRole(requestData: Role) {
    const request = new WebApiObjectRequest<Role>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<Role>>("UpdateRole", request);
  }

  getUsers(filter: User, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<User>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<UserPaginationResponse>>(
      "GetUsers",
      request
    );
  }

  getUser(id: number) {
    const request = new WebApiObjectRequest<User>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<User>>("GetUser", request);
  }

  updateUser(requestData: User, file?: any) {
    const formData = new FormData();
    formData.append("id", requestData.id.toString());
    formData.append("name", requestData.name);
    formData.append("surname", requestData.surname);
    formData.append("statusID", requestData.statusID.toString());
    formData.append("emailAddress", requestData.emailAddress);
    formData.append("isGlobalAdmin", String(requestData.isGlobalAdmin));
    formData.append("password", requestData.password);
    if (requestData.roleID) {
      formData.append("roleID", requestData.roleID?.toString());
    }
    if (file) {
      formData.append("file", file);
    }
    return this.http.Post<ServiceObjectResult<User>>("UpdateUser", formData);
  }

  deleteUserImagePath(id: number) {
    const request = new WebApiObjectRequest<User>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<boolean>>(
      "DeleteUserImagePath",
      request
    );
  }
}
