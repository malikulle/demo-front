import { Breadcrumb } from "./Breadcrumb";

export enum BreadcrumbActionType {
  ADD_BREDCRUMB = "ADD_BREDCRUMB",
}

interface actionSuccess {
  type: BreadcrumbActionType.ADD_BREDCRUMB;
  payload: Breadcrumb[];
}

export type breadcrumbAction = actionSuccess;
