import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    

    url: string = 'http://localhost:8080/login';
    constructor(private httpClient: HttpClient, 
        private router: Router,
            private route: ActivatedRoute){
       
    }
    login( json:any){
        return this.httpClient.post(this.url, json).subscribe(
            (resp: any) => {
                this.router.navigate(['../dashboard']);
                let tk = encMD5(token());
                localStorage.setItem('auth_token', tk);
                let rl = encMD5(json.role);
                localStorage.setItem('usuario', rl);
                let n = encMD5(json.id);
                localStorage.setItem('idUsuario', n);
                console.log(json.role);
            }
        );
    }

    logOut(){
       
    }
    public get logUser():boolean{
        return (localStorage.getItem('auth_token')!==null);
    }

    loginByEmail(form:LoginI):Observable<ResponseI>{
        return this.httpClient.post<ResponseI>(this.url, form);
    }

    /*login(id: number, password: string):Observable<string> {
        return this.$httpClient.get<string>(environment.API_URL + '/api/auth/login?id='+id+'&password='+password);
    }*/
}

function random() {
    return Math.random().toString(36).substr(2); 
};

function token() {
    return random() + random(); // Para hacer el token más largo
};

function encMD5(cad:any){
    return window.btoa(unescape(encodeURIComponent(cad)));
}

function decMD5(cad:any){
    return decodeURIComponent(escape(window.atob(cad)));
}