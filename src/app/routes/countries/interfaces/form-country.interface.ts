import {FormModeEnum} from '../enums/form-mode.enum';

export interface FormCountryInterface {
  id: string | null,
  name: string | null,
  mode: FormModeEnum | null
}
