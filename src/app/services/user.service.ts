import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { User } from '../models/user';
import { Global } from '../data/services/global';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UsuarioService{

    public url!:string;
    public lista!:Array<User>;
    constructor(
        private _http: HttpClient,
        private cookies: CookieService
    ){
        this.url = Global.url;
    }

    login(role: any, id: any): Observable<any>{
        return this._http.get(this.url + role +'/'+id);
    }

    setToken(token: any){
        this.cookies.set("token", token);
    }

    getToken(){
        return this.cookies.get("token");
    }

    getUsuarioLog(){
        const token = this.getToken();
    }
    

    //OBTENER LISTAS DE USUARIOS
    

    getAllArray(){
        return this._http.get<User[]>(this.url +'usuarios');
    }

    getAllUsers(): Observable<any>{
        return this._http.get('http://localhost:8080/usuarios');
    }

    getSupervisores(): Observable<any>{
        return this._http.get(this.url + 'supervisores');
    }

    getAdministrador(): Observable<any>{
        return this._http.get(this.url + 'administradores');
    }


    createUser(usuario:Usuario): Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url + 'usuarios/'+usuario._id, params, 
        {headers: headers});
    }

    createSupervisor(usuario:Usuario): Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json'); 

        return this._http.post(this.url + 'supervisores/'+usuario._id, params, {headers: headers});
    }

    createAdministrador(usuario:Usuario): Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url + 'administradores/'+usuario._id, params, {headers: headers});
    }

    updateUser(id:number, usuario:Usuario): Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json'); 
        return this._http.put(this.url + 'usuarios/'+id, params, 
        {headers: headers});
    }

    updateSuper(id:number, usuario:Usuario): Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.put(this.url + 'supervisores/'+id, params, {headers: headers});
    }


    updateAdmin(id:number, usuario:Usuario): Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.put(this.url + 'administradores/'+id, params, {headers: headers});
    }

    delete(id:number): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.delete(this.url + 'usuarios/'+id, {headers: headers});
    }

    getAdminByUsername(id:number): Observable<any>{
        return this._http.get(this.url + 'administradores/'+id);
    }

    getUserByUsername(id:number): Observable<any>{
        return this._http.get(this.url + 'usuarios/'+id)
    }

    getSuperUserByUsername(id:number): Observable<any>{
        return this._http.get(this.url + 'supervisores/'+id);
    }
}