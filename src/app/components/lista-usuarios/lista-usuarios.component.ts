import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/user.service';
import { ListaUsuarios } from 'src/app/models/usuario.interface';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
  providers: [UsuarioService]
  
})
export class ListaUsuariosComponent implements OnInit {

  public variable!:any;
  listaUsuario!: ListaUsuarios[];

  @Input() usuario!: Usuario;

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    let rolUsuario = getUsuario();
     
      if(rolUsuario=='usuarios'){
        alert('Rol sin visualizacion');
      }else if(rolUsuario== 'supervisores'){
        this._usuarioService.getAllUsers().subscribe(data => {
          this.listaUsuario = data;
        });
      }else if(rolUsuario== 'administradores'){
        this._usuarioService.getSupervisores().subscribe(data => {
          this.listaUsuario = data;
        });
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
