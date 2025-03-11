import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {F} from '@angular/cdk/keycodes';
import {CountryModel} from '../../models/country.model';
import {FormModeEnum} from '../../enums/form-mode.enum';
import {FormCountryInterface} from '../../interfaces/form-country.interface';


@Component({
  selector: 'app-country-form',
  standalone: false,
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss'
})
export class CountryFormComponent implements OnInit, OnChanges {
  @Input() country: CountryModel | undefined;
  @Input() formModeType: FormModeEnum = FormModeEnum.undefined;
  @Output() saveCountryEmitter = new EventEmitter<FormCountryInterface>();

  public form!: FormGroup<{
    name: FormControl<string | null>;
    id: FormControl<string | null>,
    mode: FormControl<FormModeEnum | null>
  }>;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl<string>(this.country?.id || ''),
      mode: new FormControl<FormModeEnum>(this.formModeType, [Validators.required]),
      name: new FormControl<string>(this.country?.name || '', [Validators.required, Validators.maxLength(225)]),
    });

    if (this.formModeType === FormModeEnum.create) {
      this.form.reset();
      this.form.setValue({
        mode: FormModeEnum.create,
        name: '',
        id: ''
      })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const countryProp = 'country';
    const formModeTypeProp = 'formModeType';

    if (!!changes[countryProp] && !changes[countryProp].firstChange) {
      const country = changes[countryProp].currentValue;
      const formValue = this.form.getRawValue();
      this.form.setValue({
        ...formValue,
        ...country,
      }, { emitEvent: false })
    }

    if (!!changes[formModeTypeProp] && !changes[formModeTypeProp].firstChange) {
      const formModeType = changes[formModeTypeProp].currentValue;
      const formValue = this.form.getRawValue();
      this.form.setValue({
        ...formValue,
        ...formModeType,
      }, { emitEvent: false })
    }
  }

  saveAction() {
    this.saveCountryEmitter.emit(this.form.getRawValue());
    this.form.reset();
  }
}
