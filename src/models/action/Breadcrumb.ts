export class Breadcrumb {
  name: string = "";
  order: number = 0;
  url: string = "";

  constructor(name: string, order: number, url: string) {
    this.name = name;
    this.order = order;
    this.url = url;
  }
}

export class BreadcrumbMaker {
  setEmtpy() {
    return [];
  }

  getHome() {
    const home = new Breadcrumb("Home", 1, "/");
    return [home];
  }

  getProductDetail() {
    const home = new Breadcrumb("Home", 1, "/");
    const detail = new Breadcrumb("ProductDetail", 2, "");
    return [home, detail];
  }

  getCategoryList() {
    const catalog = new Breadcrumb("Catalog", 1, "");
    const categoryList = new Breadcrumb(
      "CategoryList",
      2,
      "/catalog/categoryList"
    );
    return [catalog, categoryList];
  }

  getUpdateCategory() {
    const list = this.getCategoryList();
    const update = new Breadcrumb("UpdateCategory", 3, "");
    return [...list, update];
  }

  getMyBasket(){
    const myBasket = new Breadcrumb("MyBasket", 1, "");
    return [myBasket]
  }

  getDasboardStatistics() {
    const dashboard = new Breadcrumb("Dashboard", 1, "");
    const statistics = new Breadcrumb("Statistics", 2, "/dashboard/statistics");
    return [dashboard, statistics];
  }

  getLanguageList() {
    const configuration = new Breadcrumb("Configuration", 1, "");
    const languageList = new Breadcrumb(
      "LanguageList",
      2,
      "/configuration/languageList"
    );
    return [configuration, languageList];
  }

  getPermissionList() {
    const membership = new Breadcrumb("Membership", 1, "");
    const permissionList = new Breadcrumb(
      "PermissionList",
      2,
      "/membership/permissionList"
    );
    return [membership, permissionList];
  }

  getUpdatePermission() {
    const list = this.getPermissionList();
    const update = new Breadcrumb("UpdatePermission", 3, "");
    return [...list, update];
  }

  getRoleList() {
    const membership = new Breadcrumb("Membership", 1, "");
    const roleList = new Breadcrumb("RoleList", 2, "/membership/roleList");
    return [membership, roleList];
  }

  getUpdateRole() {
    const list = this.getRoleList();
    const update = new Breadcrumb("UpdateRole", 3, "");
    return [...list, update];
  }

  getUserList() {
    const membership = new Breadcrumb("Membership", 1, "");
    const userList = new Breadcrumb("UserList", 2, "/membership/userList");
    return [membership, userList];
  }

  getUpdateUser() {
    const list = this.getUserList();
    const update = new Breadcrumb("UpdateUser", 3, "");
    return [...list, update];
  }

  getParameterList() {
    const configuration = new Breadcrumb("Configuration", 1, "");
    const parameterList = new Breadcrumb(
      "ParameterList",
      2,
      "/configuration/parameterList"
    );
    return [configuration, parameterList];
  }

  getCountryList() {
    const addressBook = new Breadcrumb("AddressBook", 1, "");
    const countryList = new Breadcrumb(
      "CountryList",
      2,
      "/addressBook/countryList"
    );
    return [addressBook, countryList];
  }

  getUpdateCountry() {
    const list = this.getCountryList();
    const update = new Breadcrumb("UpdateCountry", 3, "");
    return [...list, update];
  }

  getExceptionLogList() {
    const logging = new Breadcrumb("Logging", 1, "");
    const exceptionLogList = new Breadcrumb(
      "ExceptionLogList",
      2,
      "/logging/exceptionLogList"
    );
    return [logging, exceptionLogList];
  }

  getAuditLogList() {
    const logging = new Breadcrumb("Logging", 1, "");
    const auditLogList = new Breadcrumb(
      "AuditLogList",
      2,
      "/logging/auditLogList"
    );
    return [logging, auditLogList];
  }

  getProductList() {
    const catalog = new Breadcrumb("Catalog", 1, "");
    const productList = new Breadcrumb(
      "ProductList",
      2,
      "/catalog/ProductList"
    );
    return [catalog, productList];
  }
  getUpdateProduct() {
    const list = this.getProductList();
    const update = new Breadcrumb("UpdateProduct", 3, "");
    return [...list, update];
  }

  getJobList() {
    const configuration = new Breadcrumb("Configuration", 1, "");
    const jobList = new Breadcrumb("JobList", 2, "/configuration/jobList");
    return [configuration, jobList];
  }
  getUpdateJob() {
    const list = this.getProductList();
    const update = new Breadcrumb("UpdateJob", 3, "");
    return [...list, update];
  }

  getJobExecutionList() {
    const configuration = new Breadcrumb("Configuration", 1, "");
    const JobExecutionList = new Breadcrumb(
      "JobExecutionList",
      2,
      "/configuration/jobExecutionList"
    );
    return [configuration, JobExecutionList];
  }
}
