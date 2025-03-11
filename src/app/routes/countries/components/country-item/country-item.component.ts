import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CountryModel} from '../../models/country.model';

@Component({
  selector: 'app-country-item',
  standalone: false,
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.scss'
})
export class CountryItemComponent {
    @Input() country?: CountryModel;
    @Output() editCountryEmitter = new EventEmitter<CountryModel>();
    @Output() deleteCountryEmitter = new EventEmitter<string>();

    editAction() {
      this.editCountryEmitter.emit(this.country);
    }

    deleteAction() {
      this.deleteCountryEmitter.emit(this.country?.id)
    }
}
