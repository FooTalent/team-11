export interface User {
  id: string;
  email: string;
  name: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  locality: string | null;
  phone: string | null;
  profilePicture: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
}

export interface Pet {
  name?: string;
  description?: string;
  date?: string;
  status?: string;
  speciesType?: string;
  gender?: string;
  province?: string;
  city?: string;
  locality?: string;
  contact?: string;
  createdAt?: string;
  tags: Tag[];
  colors: Color[];
  images: string[];
}

export const pets: Pet[] = [
];

export interface Login   {
  email: string;
  password: string;
}

export  interface registro{
  name:string;
  email:string;
  password:string;
  rePassword:string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Location {
  name: string;
}
