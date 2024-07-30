import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '../interfaces/interfaces';


export const logIn = createAction("[Login Component] Login success",
props<{ loginResponse:LoginResponse }>());

export const logOut = createAction("[Login Component] logOut");