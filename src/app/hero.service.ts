import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Hero } from './hero';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private getAllHeroesUrl = 'http://localhost:8080/getAllHeroes';  // URL to web api
  private getHeroUrl = 'http://localhost:8080/getHero';
  private delHeroUrl = 'http://localhost:8080/delHero';
  private creHeroUrl = 'http://localhost:8080/creHero';
  private upHeroUrl = 'http://localhost:8080/upHero';
  constructor(private http: Http) { }
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.getAllHeroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
  }
  getHero(id: number): Promise<Hero> {
    const url = `${this.getHeroUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.delHeroUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.creHeroUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  update(hero: Hero): Promise<Hero> {
    return this.http
      .put(this.upHeroUrl, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
