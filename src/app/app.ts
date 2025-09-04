import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThemeService } from './services/theme.service';
import {CvComponent} from "./components/cv.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CvComponent,
  ],
  template: `
    <div class="App min-h-screen" [class.dark]="isDarkMode">
     <app-cv></app-cv>
    </div>
  `,
  styles: [],
})
export class App implements OnInit {
  isDarkMode = false;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('fr');

    // Set initial language
    const browserLang = this.translate.getBrowserLang();
    const supportedLangs = ['en', 'fr', 'nl'];
    const lang = supportedLangs.includes(browserLang || '')
      ? browserLang
      : 'fr';
    this.translate.use(lang || 'fr');
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });
  }
}
