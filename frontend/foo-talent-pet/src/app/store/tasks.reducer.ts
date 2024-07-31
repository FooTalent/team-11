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
        locality: '',
        phone: '',
        profilePicture: ''
    },
    token: ''
};

export const tasksReducer = createReducer(
initState,


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
