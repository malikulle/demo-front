import City from "../models/addressbook/city/City";
import CityPagination from "../models/addressbook/city/CityPagination";
import Country from "../models/addressbook/country/Country";
import CountryPagination from "../models/addressbook/country/CountryPagination";
import Dynamic from "./base/Dynamic";
import HttClient from "./base/HttpClient";
import { ServiceObjectResult } from "./base/serviceObjectResult";
import { WebAPICollectionRequest } from "./base/webAPICollectionRequest";
import WebApiObjectRequest from "./base/WebApiObjectRequest";

export default class AddressBookService {
  private http = new HttClient("AddressBook");

  getCity(id: number) {
    const request = new WebApiObjectRequest<City>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<City>>("GetCity", request);
  }

  getCities(requestData: City, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<City>();
    request.dynamicFilter = dynamic;
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<CityPagination>>(
      "GetCities",
      request
    );
  }

  updateCity(requestData: City) {
    const request = new WebApiObjectRequest<City>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<City>>("UpdateCity", request);
  }

  getCountry(id: number) {
    const request = new WebApiObjectRequest<Country>();
    request.id = id;
    return this.http.Post<ServiceObjectResult<Country>>("GetCountry", request);
  }

  getCountries(filter: Country, dynamic: Dynamic) {
    const request = new WebAPICollectionRequest<Country>();
    request.data = filter;
    request.dynamicFilter = dynamic;
    return this.http.Post<ServiceObjectResult<CountryPagination>>(
      "GetCountries",
      request
    );
  }

  updateCountry(requestData: Country) {
    const request = new WebApiObjectRequest<Country>();
    request.data = requestData;
    return this.http.Post<ServiceObjectResult<Country>>(
      "UpdateCountry",
      request
    );
  }
}
