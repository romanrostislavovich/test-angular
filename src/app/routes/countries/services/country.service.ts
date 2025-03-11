import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryModel} from '../models/country.model';
import {Observable, switchMap, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountryService {
  private beURL = 'http://localhost:3000';
  private prefix = 'countries';

  constructor(private http: HttpClient) {

  }

  create(country: CountryModel) {
    return this.http.post(`${this.beURL}/${this.prefix}`, { ...country}).pipe(
      tap((v) => {
        console.log(v);
      })
    )
  }

  getById(id: number) {
    return this.http.get(`${this.beURL}/${this.prefix}/${id}`).pipe(
      tap((v) => {
        console.log(v);
      })
    )
  }

  getAll(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this.beURL}/${this.prefix}`)
  }

  update(country: CountryModel) {
    return this.http.put(`${this.beURL}/${this.prefix}/${country.id}`, country).pipe(
      tap((v) => {
        console.log(v);
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.beURL}/${this.prefix}/${id}`);
  }
}
