import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[class.homepage]': 'homePageLocation'
  }
})
export class AppComponent implements OnInit {

  home = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {

    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      mergeMap(({ urlAfterRedirects }: NavigationEnd) => of(urlAfterRedirects === '/')),
      tap(x => this.home = x)
    ).subscribe();

    this.registerCustomIcons();
    
  }

  registerCustomIcons() {
    this.matIconRegistry.addSvgIcon(
      "hulk",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg-icons/hulk.svg")
    );
  }

  get homePageLocation() {
    return this.home;
  }
}
