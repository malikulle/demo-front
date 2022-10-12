import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/Login";
import Home from "../components/pages/Home/Home";
import TestPage from "../components/pages/TestPage";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRoute";
import NormalRoute, { NormalRouteRouteProps } from "./NormalRoute";
import CategoryList from "../components/catalog/Category/CategoryList";
import UpdateCategory from "../components/catalog/Category/UpdateCategory";
import LanguageList from "../components/configuration/Language/LanguageList";
import PermissionList from "../components/membership/Permission/PermissionList";
import UpdatePermission from "../components/membership/Permission/UpdatePermission";
import RoleList from "../components/membership/Role/RoleList";
import UpdateRole from "../components/membership/Role/UpdateRole";
import UserList from "../components/membership/User/UserList";
import UpdateUser from "../components/membership/User/UpdateUser";
import UnAuthorizedPage from "../components/common/ResultPages/UnAuthorizedPage";
import NotFoundPage from "../components/common/ResultPages/NotFoundPage";
import ParameterList from "../components/configuration/Parameter/ParameterList";
import UpdateParameter from "../components/configuration/Parameter/UpdateParameter";
import CountryList from "../components/addressBook/Country/CountryList";
import UpdateCountry from "../components/addressBook/Country/EditCountry";
import UpdateCity from "../components/addressBook/City/UpdateCity";
import ExceptionLogList from "../components/logging/ExceptionLog/ExceptionLogList";
import AuditLogList from "../components/logging/AuidtLog/AuditLogList";
import UpdateProduct from "../components/catalog/Product/UpdateProduct";
import ProductList from "../components/catalog/Product/ProductList";
import JobList from "../components/configuration/Job/JobList";
import UpdateJob from "../components/configuration/Job/UpdateJob";
import JobExecutionList from "../components/configuration/JobExecution/JobExecutionList";
import JobExecutionDetail from "../components/configuration/JobExecution/JobExecutionDetail";
import Statistics from "../components/dashboard/Statistics";
import ProductDetail from "../components/pages/ProductDetail/ProductDetail";
import Basket from "../components/pages/Basket/Basket";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/login",
  permissions: "",
};

const defaultNormalRouteProps: Omit<NormalRouteRouteProps, "outlet"> = {
  layoutName: "NORMAL",
};

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<NormalRoute {...defaultNormalRouteProps} outlet={<Home />} />}
      />
      <Route
        path="/unauthorized"
        element={
          <NormalRoute
            {...defaultNormalRouteProps}
            outlet={<UnAuthorizedPage />}
          />
        }
      />
      <Route
        path="/testPage"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<TestPage />}
          />
        }
      />
      <Route
        path="/productDetail/:id"
        element={
          <NormalRoute
            {...defaultNormalRouteProps}
            outlet={<ProductDetail />}
          />
        }
      />
      <Route
        path="/basket"
        element={
          <NormalRoute
            {...defaultNormalRouteProps}
            outlet={<Basket />}
          />
        }
      />
      <Route
        path="/dashboard/statistics"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<Statistics />}
            permissions=""
            authenticationPath=""
          />
        }
      />
      <Route
        path="/catalog/categoryList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<CategoryList />}
            permissions="CategoryList"
            authenticationPath=""
          />
        }
      />
      <Route
        path="/catalog/updateCategory/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateCategory />}
            permissions="UpdateCategory"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/languageList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<LanguageList />}
            permissions="LanguageList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/parameterList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<ParameterList />}
            permissions="ParameterList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/updateParameter/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateParameter />}
            permissions="UpdateParameter"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/membership/permissionList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<PermissionList />}
            permissions="PermissionList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/membership/updatePermission/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdatePermission />}
            permissions="UpdatePermission"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/membership/roleList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<RoleList />}
            permissions="RoleList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/membership/updateRole/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateRole />}
            permissions="UpdateRole"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/membership/userList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UserList />}
            permissions="UserList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/membership/updateUser/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateUser />}
            permissions="UpdateUser"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/addressBook/countryList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<CountryList />}
            permissions="CountryList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/addressBook/updateCountry/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateCountry />}
            permissions="UpdateCountry"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/addressBook/updateCity/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateCity />}
            permissions="UpdateCity"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/logging/exceptionLogList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<ExceptionLogList />}
            permissions="ExceptionLogList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/logging/auditLogList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<AuditLogList />}
            permissions="AuditLogList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/catalog/updateProduct/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateProduct />}
            permissions="UpdateProduct"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/catalog/productList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<ProductList />}
            permissions="ProductList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/jobList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<JobList />}
            permissions="JobList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/jobExecutionList"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<JobExecutionList />}
            permissions="JobExecutionList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/updateJob/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<UpdateJob />}
            permissions="UpdateJob"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/configuration/jobExecutionDetail/:id"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<JobExecutionDetail />}
            permissions="JobExecutionList"
            authenticationPath="/"
          />
        }
      />
      <Route
        path="/login"
        element={
          <NormalRoute {...defaultNormalRouteProps} outlet={<Login />} />
        }
      />
      <Route
        path="*"
        element={
          <NormalRoute {...defaultNormalRouteProps} outlet={<NotFoundPage />} />
        }
      />
    </Routes>
  );
};

export default Routers;
