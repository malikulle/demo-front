import { Breadcrumb } from "../../models/action/Breadcrumb";
import {
  breadcrumbAction,
  BreadcrumbActionType,
} from "../../models/action/BreadcrumbActionType";
import initialState from "../initialState";

interface State {
  breadcrumbs: Breadcrumb[];
}

export const breadcrumbReducer = (
  state: State = initialState,
  action: breadcrumbAction
): State => {
  switch (action.type) {
    case BreadcrumbActionType.ADD_BREDCRUMB:
      return {
        breadcrumbs: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
