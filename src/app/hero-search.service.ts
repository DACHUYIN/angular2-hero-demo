import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  private searchHeroesUrl = 'http://localhost:8080/searchHeroes';
  constructor(private http: Http) {}

  search(name: string): Observable<Hero[]> {
    const url = `${this.searchHeroesUrl}/${name}`;
    return this.http
               .get(url)
               .map(response => response.json() as Hero[]);
  }
}
