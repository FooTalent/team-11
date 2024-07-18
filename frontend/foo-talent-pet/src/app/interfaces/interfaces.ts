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

export interface PetResponse {
  id: string;
  name: string;
  description: string;
  date: string;
  status: string;
  speciesType: string;
  gender?: string;
  province?: string;
  city?: string;
  locality?: string;
  contact?: string;
  createdAt: string;
  user: User;
  tags: Tag[];
  colors: Color[];
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface PetWithComments {
  post: PetResponse;
  comments: Comment[];
}
export const pets: Pet[] = [
];

export interface Login   {
  email: string;
  password: string;
}

export interface Comment {
    content: string,
    user: User,
    createdAt: string,
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

export interface Color {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Filters {
  animal: string | null;
  gender: string | null;
  province: string | null;
  city: string | null;
  locality: string | null;
  date: string | null;
  colors: string[] | null;
  tags: string[] | null;
}
