import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideTranslateService } from "@ngx-translate/core";
// Import all required icons
import { LucideAngularModule } from "lucide-angular";
import { lucideIcons } from "./lucide-icons";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: "/assets/i18n/",
        suffix: ".json",
      }),
      fallbackLang: "en",
      lang: "en",
    }),
    importProvidersFrom(
      BrowserAnimationsModule,
      LucideAngularModule.pick(lucideIcons),
    ),
  ],
};
