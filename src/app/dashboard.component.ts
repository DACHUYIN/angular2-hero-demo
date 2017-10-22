import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    constructor(
      private heroService: HeroService,
      private http: Http          
    ) { }
    ngOnInit(): void {
      this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
