import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient ,withFetch} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { tasksReducer } from './store/tasks.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), 
    // ngrx
    provideStore(),
    provideState({ name: 'loggedIn', reducer: tasksReducer }),]
};
