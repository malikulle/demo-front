import {
  CategoryPaginationReponse,
  Category,
} from "../models/catalog/category/Category";
import Product from "../models/catalog/product/Product";
import ProductPagination from "../models/catalog/product/ProductPagination";
import ProductComment from "../models/catalog/productComment/ProductComment";
import ProductCommentPagination from "../models/catalog/productComment/ProductCommentPagination";
import Dynamic from "./base/Dynamic";
import HttClient from "./base/HttpClient";

import { ServiceObjectResult } from "./base/serviceObjectResult";
import { WebAPICollectionRequest } from "./base/webAPICollectionRequest";
import WebApiObjectRequest from "./base/WebApiObjectRequest";
import InternationalizationService from "./internationalizationService";

export default class CatalogService {
  private http = new HttClient("Catalog");

  getCategories(filter: Category, dynamic: Dynamic, lang: any) {
    const internationalizationService = new InternationalizationService();
    const request = new WebAPICollectionRequest<Category>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    if (typeof lang === "string") {
      request.languageID = internationalizationService.getCurrentLanguageID(
        String(lang)
      );
    } else if (typeof lang === "number") {
      request.languageID = Number(lang);
    }
    return this.http.Post<ServiceObjectResult<CategoryPaginationReponse>>(
      "GetCategories",
      request
    );
  }

  updateCategory(requestData: Category, languageID: number = 0) {
    const request = new WebApiObjectRequest<Category>();
    request.data = requestData;
    request.languageID = languageID;
    return this.http.Post<ServiceObjectResult<Category>>(
      "UpdateCategory",
      request
    );
  }

  getCategory(id: number) {
    const request = new WebApiObjectRequest<Category>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Category>>(
      "GetCategory",
      request
    );
  }

  getProducts(filter: Product, dynamic: Dynamic, lang: string) {
    const internationalizationService = new InternationalizationService();
    const request = new WebAPICollectionRequest<Product>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    request.languageID = internationalizationService.getCurrentLanguageID(lang);
    return this.http.Post<ServiceObjectResult<ProductPagination>>(
      "GetProducts",
      request
    );
  }

  getProduct(id: number) {
    const request = new WebApiObjectRequest<Product>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Product>>("GetProduct", request);
  }

  updateProduct(requestData: Product, languageID: number = 0, file: any) {
    const formData = new FormData();
    formData.append("id", requestData.id.toString());
    formData.append("languageID", languageID.toString());
    formData.append("name", requestData.name);
    formData.append("description", requestData.description);
    formData.append("price", requestData.price.toString());
    formData.append("categoryID", String(requestData.categoryID));
    formData.append("statusID", String(requestData.statusID));

    if (file != null) {
      formData.append("file", file);
    }

    return this.http.Post<ServiceObjectResult<Product>>(
      "UpdateProduct",
      formData
    );
  }

  deleteProductImagePath(id: number) {
    const request = new WebApiObjectRequest<Product>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<boolean>>(
      "DeleteProductImagePath",
      request
    );
  }

  getTopViewProducts(lang: string) {
    const internationalizationService = new InternationalizationService();
    const request = new WebAPICollectionRequest<Product>();
    request.languageID = internationalizationService.getCurrentLanguageID(lang);
    return this.http.Post<ServiceObjectResult<Product[]>>(
      "GetTopViewProducts",
      request
    );
  }

  getProductComments(filter: ProductComment, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<ProductComment>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<ProductCommentPagination>>(
      "GetProductComments",
      request
    );
  }

  updateProductComment(requestData: ProductComment) {
    const request = new WebApiObjectRequest<ProductComment>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<ProductComment>>(
      "UpdateProductComment",
      request
    );
  }
}
