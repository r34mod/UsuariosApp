import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListaUsuarios } from 'src/app/models/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {

  url!:'http://localhost:8080/';
  public variable!:any;
  listaUsuario!: ListaUsuarios[];
  @Input() usuarios!: Usuario;
  //public user!: Usuario;
  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private authen: AuthService
  ) { }

  ngOnInit(): void {
    

    if(this.authen.logUser===true){
      let usuarioRol = getUsuario();
      let usuarioId = getId();

      switch(usuarioRol){
        case 'usuarios':
          this._usuarioService.getUserByUsername(parseInt(usuarioId)).subscribe(response =>{
            console.log(response);
            //this.listaUsuario = response;
            this.listaUsuario = Object.values(response);
           
            console.log(this.listaUsuario[3])
           
            });
            break;
        case 'supervisores':
          this._usuarioService.getSuperUserByUsername(parseInt(usuarioId)).subscribe(response =>{
            //this.listaUsuario = response;
            this.listaUsuario = Object.values(response);
            console.log(this.listaUsuario[3])
            });
          break;
        case 'administradores':
          this._usuarioService.getAdminByUsername(parseInt(usuarioId)).subscribe(response =>{
            this.listaUsuario = Object.values(response);
            });
          break;
      }
    }else{
      alert("Not token valid");
      this._router.navigateByUrl(this.url);
    }
  }

  return(){
    this._router.navigate(['/dashboard']);
  }

  getUsuarioLog(){
    let usuarioRol = getUsuario();
    let usuarioId = getId();
    switch(usuarioRol){
      case 'usuarios':
        this._usuarioService.getUserByUsername(parseInt(usuarioId)).subscribe(response =>{
          this.listaUsuario = response;
          console.log('lista'+this.listaUsuario)
          let result = [];
          //console.log(this.listaUsuario);
          for(var i in this.listaUsuario) {
            result.push([i, this.listaUsuario[i]]);
          }
          console.log('lol'+result);
          });
          break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(parseInt(usuarioId)).subscribe(response =>{
          this.listaUsuario = response;
          let result = [];
          //console.log(this.listaUsuario);
          for(var i in this.listaUsuario) {
            result.push([i, this.listaUsuario[i]]);
          }
          console.log(result);
          });
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(parseInt(usuarioId)).subscribe(response =>{
          this.listaUsuario = response;
          let result = [];
          //console.log(this.listaUsuario);
          for(var i in this.listaUsuario) {
            result.push([i, this.listaUsuario[i]]);
          }
          console.log(result);
          });
        break;
    }
  }

  delete(): void{
    var cad = getUsuario();
    let usuarioId = getId();
    switch(cad){
      case 'usuarios':
        alert('No tienes rol autorizado');
        this._router.navigate(['/dashboard']);
        break;
      case 'supervisores':
        this._usuarioService.delete(parseInt(usuarioId)).subscribe(
          response => {
          
            this._router.navigate(['/loader']);
            
            
          }, error => {
    
          }
        );
        break;
      case 'administradores':
        this._usuarioService.delete(parseInt(usuarioId)).subscribe(response =>{
          this._router.navigate(['/loader']);
          
            
        }, error => {

        })
    }
    
  }

  verEditarPerfil(){
    var cad = getUsuario();
    switch (cad){
      case 'usuarios':
        alert("No tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard/perfil');
        break;
      case 'supervisores':
        this._router.navigateByUrl('/editar-perfil');
        break;
      case 'administradores':
        this._router.navigateByUrl('/editar-perfil');
        break;
    }
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
  let seperar = direccion.split("/");
  return seperar;

}


function separarComas(cadena: any){
  let separar = cadena.split("/");
  return separar;
}

function devuelvoDatos(datos: Array<any>){
  let nombre = datos.slice(42);
  let cadena = (<any>nombre).split(',');
  return cadena;
}