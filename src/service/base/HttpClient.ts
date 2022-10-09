import axios from "axios";
import api from "../api/api";

export default class HttpClient {
  public Schema: string = "";

  constructor(schema: string) {
    this.Schema = schema;
  }

  Post = <T>(url: string, requestData: any) => {
    axios.defaults.baseURL = api.baseUrl;
    let postPath = "";
    if (this.Schema) {
      postPath = `/api/${this.Schema}/${url}`;
    } else {
      postPath = `/api/${url}`;
    }
    return axios.post<T>(postPath, requestData, {
      baseURL: api.baseUrl,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("accessToken")
          ? `Bearer ${localStorage.getItem("accessToken")}`
          : "",
      },
    });
  };

  Get = (url: string, requestData: any) => {
    axios.defaults.baseURL = api.baseUrl;
    let postPath = "";
    if (this.Schema) {
      postPath = `/api/${this.Schema}/${url}`;
    } else {
      postPath = `/api/${url}`;
    }
    return axios.post(postPath, requestData, {
      baseURL: api.baseUrl,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("accessToken")
          ? `Bearer ${localStorage.getItem("accessToken")}`
          : "",
      },
    });
  };
}
