import { createReducer, on } from "@ngrx/store"
import { logIn,logOut } from "./tasks.actions"
import { LoginResponse } from "../interfaces/interfaces";

export const initState: LoginResponse = {
    user: {
        id: '',
        name: '',
        email: '',
        country: '',
        province: '',
        city: '',
        phone: '',
        profilePicture: ''
    },
    token: ''
};

export const tasksReducer = createReducer(
initState,

// iniciar secion
on(logIn, (state, action ) => {
    return {
        user: action.loginResponse.user,
        token: action.loginResponse.token
    }
}),


on(logOut, (state) => {
    return initState;
  })

);
