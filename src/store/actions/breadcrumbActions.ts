import { Dispatch } from "redux";
import { Breadcrumb } from "../../models/action/Breadcrumb";
import {
  breadcrumbAction,
  BreadcrumbActionType,
} from "../../models/action/BreadcrumbActionType";

export const addBreadcrumb =
  (list: Breadcrumb[]) => async (dispatch: Dispatch<breadcrumbAction>) => {
    dispatch({
      type: BreadcrumbActionType.ADD_BREDCRUMB,
      payload: list,
    });
  };
