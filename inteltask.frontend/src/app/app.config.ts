import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { tokenInterceptor } from "./core/Interceptors/token-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    //provideClientHydration(withEventReplay()),
    provideEventPlugins(),
    provideHttpClient(
      withFetch(),
      /* withInterceptors([tokenInterceptor]) */),
  ]
};
