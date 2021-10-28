export type Roles = 'usuario' | 'supervisor' | 'administrador';

export interface User{
   
    username: string;
   
    password: string;
}


export interface UserResponse{
    message: string;
    token: string;
    userId: number;
    rol: Roles;
}