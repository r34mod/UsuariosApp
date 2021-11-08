import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListaUsuarios } from 'src/app/models/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/user.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css'],
  providers: [UsuarioService]
})
export class PerfilesComponent implements OnInit {

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
      let idPerfil = getPerfil();
      switch(usuarioRol){
        case 'usuarios':
          this._usuarioService.getUserByUsername(parseInt(idPerfil)).subscribe(response =>{
            console.log(response);
            //this.listaUsuario = response;
            this.listaUsuario = Object.values(response);
           
            console.log(this.listaUsuario[3])
           
            });
            break;
        case 'supervisores':
          this._usuarioService.getUserByUsername(parseInt(idPerfil)).subscribe(response =>{
            //this.listaUsuario = response;
            this.listaUsuario = Object.values(response);
            console.log(this.listaUsuario[3])
            });
          break;
        case 'administradores':
          this._usuarioService.getSuperUserByUsername(parseInt(idPerfil)).subscribe(response =>{
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
    this._router.navigate(['/dashboard/lista-usuarios']);
  }

 

 

}


function getUsuario():string{
  return decMD5(String(localStorage.getItem('usuario')));
 }
 
 function getId():string{
   return decMD5(String(localStorage.getItem('idUsuario')));
 }
 
 function getPerfil():string{
   return String(localStorage.getItem('idPerfil'));
 }
 
 function decMD5(cad:any){
   return decodeURIComponent(escape(window.atob(cad)));
 }


