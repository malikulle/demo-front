import City from "../city/City";

export default class Country {
  id: number = 0;
  statusID: number = 0;
  name: string = "";
  codeISO: string = "";
  codeISO3: string = "";
  phoneCode: string = "";
  cities: City[] = [];
}
