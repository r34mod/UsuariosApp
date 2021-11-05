import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { UserLog } from 'src/app/models/userLog';
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ListaUsuarios } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UsuarioService]
})
export class DashboardComponent implements OnInit {

  //@Input() userLog!: UserLog;

  url!:'http://localhost:8080/';
  
  @Input() usuarios!: Usuario;
  public variable!:any;
  
  listaUsuario!:ListaUsuarios[];
  public myArr!:any[];
  //public usuarios?: Usuario;
  public users?: User[];
  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private authen: AuthService
  ) { 

    //Tenemos la informacion de la url
        console.log(this._router.url);
        var cad = separarURL(_router);
        console.log(cad[1]);
     
  }
  
  
  
  ngOnInit(): void {
    if(localStorage.getItem('auth_token')===null){
      this._router.navigateByUrl(this.url);
    }
    console.log('djdj');
    if(this.authen.logUser===true){
      let rolUsuario = getUsuario();
      this.getInfoUser();
      if(rolUsuario=='usuarios'){
        this._usuarioService.getAllUsers().subscribe(data => {
          this.listaUsuario = data;
        });
      }else if(rolUsuario== 'administradores'){
        this._usuarioService.getAdministrador().subscribe(data => {
          this.listaUsuario = data;
        });
      }else if(rolUsuario== 'supervisores'){
        this._usuarioService.getSupervisores().subscribe(data => {
          this.listaUsuario = data;
        });
      }
      
    }else{
      alert("No estas logueado");
      this._router.navigateByUrl(this.url);
    }
   

  }

  getInfoUser():void  {
    let rolUsuario = getUsuario();
      let idUsuario = getId();
      switch(rolUsuario){
        case 'usuarios':
          this._usuarioService.getUserByUsername(parseInt(idUsuario)).subscribe(response => {
            this.listaUsuario = Object.values(response);
            console.log(this.listaUsuario[3]);
          });
          break;
        case 'supervisores':
          this._usuarioService.getSuperUserByUsername(parseInt(idUsuario)).subscribe(response => {
            this.listaUsuario = Object.values(response);
          });
          break;
        case 'administradores':
          this._usuarioService.getAdminByUsername(parseInt(idUsuario)).subscribe(response => {
            this.listaUsuario = Object.values(response);
          });
          break;
      }
      
  }


  agregarUsuarios(){
    var cad = getUsuario();
    switch(cad){
      case 'usuarios':
        alert("no tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard');
        break;
      case 'supervisores':
        this._router.navigateByUrl('/dashboard/'+'formulario');
        break;
      case 'administradores':
        this._router.navigateByUrl('/dashboard/'+'formulario');
        break;
    }
  }


  editarPerfil(){
    var cad = getUsuario();
    switch (cad){
      case 'usuarios':
        alert("No tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard');
        break;
      case 'supervisores':
        this._router.navigateByUrl('/editar-perfil');
        break;
      case 'administradores':
        this._router.navigateByUrl('/editar-perfil');
        break;
    }
  }
  

  verListaUsuarios(){
    var cad = getUsuario();
    switch (cad){
      case 'usuarios':
        alert("No tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard');
        break;
      case 'supervisores':
        this._router.navigateByUrl('/dashboard'+'/lista-usuarios');
        break;
      case 'administradores':
        this._router.navigateByUrl('/dashboard'+'/lista-usuarios');
        break;
    }
  }

  verEditarPerfil(){
    var cad = getUsuario();
    switch (cad){
      case 'usuarios':
        alert("No tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard');
        break;
      case 'supervisores':
        this._router.navigateByUrl('/editar-perfil');
        break;
      case 'administradores':
        this._router.navigateByUrl('/editar-perfil');
        break;
    }
  }

  getRolUser(): String { 
    return getUsuario();
  }

  getName(): String {
    let rolUsuario = getUsuario();
    let idUsuario = getId();
    var name = '';
    switch(rolUsuario){
      case 'usuarios':
        this._usuarioService.getUserByUsername(parseInt(idUsuario)).subscribe(response => {
          this.listaUsuario = Object.values(response);
           name = String(this.listaUsuario[3]);
        });
        break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(parseInt(idUsuario)).subscribe(response => {
          this.listaUsuario = Object.values(response);
          name =  String(this.listaUsuario[3]);
        });
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(parseInt(idUsuario)).subscribe(response => {
          this.listaUsuario = Object.values(response);
          name =  String(this.listaUsuario[3]);
        });
        break;
    }

    return name;
  }

  

  rutaUser(): boolean{
    let isUser: boolean = false;
    var cad = separarURL(this._router);
    if(cad[1]=="usuarios"){
      isUser = true;
    }
    return isUser;
  }

}

function getUsuario():string{
 return decMD5(String(localStorage.getItem('usuario')));
}

function getId():string{
  return decMD5(String(localStorage.getItem('idUsuario')));
}


function decMD5(cad:any){
  return decodeURIComponent(escape(window.atob(cad)));
}

function separarURL(_router: Router) {
    let direccion = _router.url;
    let seperar = direccion.split("/").reverse();
    return seperar;

}

function separarComas(cadena: any) {
  let separar = cadena.split("/");
  return separar;
}


function devuelvoDatos(datos: Array<any>){
  let nombre = datos.slice(42);
  let cadena = (<any>nombre).split(',');
  return cadena;
}

