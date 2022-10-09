import { combineReducers } from "redux";
import { breadcrumbReducer } from "./reducers/breadcrumbReduer";
import { changeLanguageReducer } from "./reducers/changeLanguageReducer";
import { productCommentListReducer } from "./reducers/productCommentListReducer";
import { productListReducer } from "./reducers/productListReducer";
import { userLoginReducer } from "./reducers/userLoginReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  language: changeLanguageReducer,
  breadcrumb: breadcrumbReducer,
  productList: productListReducer,
  productCommentList : productCommentListReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
