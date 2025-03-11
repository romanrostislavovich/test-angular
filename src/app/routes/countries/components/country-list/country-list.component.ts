import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CountryService} from '../../services/country.service';
import {CountryModel} from '../../models/country.model';
import {switchMap} from 'rxjs';
import {FormModeEnum} from '../../enums/form-mode.enum';
import {FormCountryInterface} from '../../interfaces/form-country.interface';

@Component({
  selector: 'app-country-list',
  standalone: false,
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {
  public countryList: CountryModel[] = [];
  public editCountry!: CountryModel;
  public formModeType!: FormModeEnum;
  public countryFormAvailable = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private countryService: CountryService,
  ) {
  }

  ngOnInit() {
    this.countryService.getAll()
      .subscribe((v) => {
        this.countryList = v;
      })
  }

  toggleCreateForm() {
    this.formModeType = FormModeEnum.create;
    this.countryFormAvailable = !this.countryFormAvailable;
  }

  saveAction(event: FormCountryInterface) {
    if (event.mode === FormModeEnum.create) {
      this.createCountryMethod(event);
    }

    if (event.mode === FormModeEnum.edit) {
      this.editCountryMethod(event);
    }
  }

  editAction(event: CountryModel) {
      this.formModeType = FormModeEnum.edit;
      this.editCountry = event;
      this.countryFormAvailable = true;
  }

  deleteAction(event: string) {
    this.countryService.delete(event)
      .pipe(
        switchMap((v) => {
          return this.countryService.getAll();
        })
      ).subscribe((v) => {
        this.countryList = v;
      });
  }

  private createCountryMethod(event: FormCountryInterface) {
    if (!!event.name) {
      this.countryFormAvailable = false;
      const country = CountryModel.fromCreateForm({ name: event.name })
      this.countryService.create(country)
        .pipe(
          switchMap((v) => {
            return this.countryService.getAll();
          })
        ).subscribe((v) => {
          this.countryList = v;
        });
    }
  }

  private editCountryMethod(event: FormCountryInterface) {
    if (!!event.name && !!event.id) {
      this.countryFormAvailable = false;
      const country = CountryModel.fromEditForm({ name: event.name, id: event.id})
      this.countryService.update(country)
        .pipe(
          switchMap((v) => {
            return this.countryService.getAll();
          })
        ).subscribe((v) => {
        this.countryList = v;
      });
    }

  }
}
