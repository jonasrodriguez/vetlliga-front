import { Rol } from "../enums/UsuarioRol";

export interface Usuario {
  id?: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  rol: Rol;
}

