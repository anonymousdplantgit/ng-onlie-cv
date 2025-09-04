import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideTranslateService } from '@ngx-translate/core';
// Import all required icons
import {
  // Navigation & UI Icons
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Loader2,

  // Automotive & Service Icons
  Car,
  Truck,
  Wrench,
  Settings,
  Cog,
  ScanLine,
  Zap,
  ShieldCheck,
  Building,
  Cpu,

  // Contact & Communication Icons
  Phone,
  Mail,
  Send,
  Calendar,
  Clock,
  MapPin,
  Compass,

  // User & Team Icons
  User,
  Users,
  Award,
  Star,
  GraduationCap,
  Heart,

  // Business & Stats Icons
  Briefcase,
  Target,
  TrendingUp,
  Layers,
  Database,
  Link,
  Brain,
  Coffee,

  // Alert & Status Icons
  AlertCircle,
  Info,
  Sparkles,

  // Social Media Icons
  Facebook,
  Twitter,
  Linkedin,
  Instagram, LucideAngularModule, Github
} from 'lucide-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'fr',
      lang: 'fr',
    }),
    importProvidersFrom(
      BrowserAnimationsModule,
      LucideAngularModule.pick({
        // Navigation & UI Icons
        Github,
        Menu,
        X,
        Sun,
        Moon,
        Globe,
        ChevronDown,
        ArrowRight,
        ArrowLeft,
        Check,
        CheckCircle,
        Loader2,

        // Automotive & Service Icons
        Car,
        Truck,
        Wrench,
        Settings,
        Cog,
        ScanLine,
        Zap,
        ShieldCheck,
        Building,
        Cpu,

        // Contact & Communication Icons
        Phone,
        Mail,
        Send,
        Calendar,
        Clock,
        MapPin,
        Compass,

        // User & Team Icons
        User,
        Users,
        Award,
        Star,
        GraduationCap,
        Heart,

        // Business & Stats Icons
        Briefcase,
        Target,
        TrendingUp,
        Layers,
        Database,
        Link,
        Brain,
        Coffee,

        // Alert & Status Icons
        AlertCircle,
        Info,
        Sparkles,

        // Social Media Icons
        Facebook,
        Twitter,
        Linkedin,
        Instagram
      })
    )
  ],
};
