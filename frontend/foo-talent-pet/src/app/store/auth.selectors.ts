import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAuthState = (state: AppState) => state.loggedIn;

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.token
);