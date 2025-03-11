import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from '@angular/forms';

export class CountryModel {
  id?: string;
  name: string;

  constructor(name: string, id?: string) {
    this.id = id;
    this.name = name;
  }

  static fromCreateForm(value: { name: string}): CountryModel {
    return new CountryModel(value.name);
  }

  static fromEditForm(value: { name: string , id: string }): CountryModel {
    return new CountryModel(value.name, value.id);
  }
}
