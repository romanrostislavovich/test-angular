import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './components/country-list/country-list.component';
import {CountryRoutingModule} from './country-routing.module';
import { CountryItemComponent } from './components/country-item/country-item.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CountryListComponent,
    CountryItemComponent,
    CountryFormComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatBadge,
    MatFabButton,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButton
  ]
})
export class CountriesModule { }
