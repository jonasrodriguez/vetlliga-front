export enum Rol {
  ADMIN = "ADMIN",
  USUARIO = "USUARIO"
}

export const RolDisplay: Record<Rol, string> = {
  [Rol.ADMIN]: "Admin",
  [Rol.USUARIO]: "Usuario",
};