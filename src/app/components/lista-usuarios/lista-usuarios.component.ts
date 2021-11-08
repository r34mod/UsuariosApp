import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/user.service';
import { ListaUsuarios } from 'src/app/models/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';


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
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    let rolUsuario = getUsuario();
     
      if(rolUsuario=='usuarios'){
        alert('Rol sin visualizacion');
      }else if(rolUsuario== 'supervisores'){
        this._usuarioService.getAllUsers().subscribe(data => {
          this.listaUsuario = data;
          console.log(this.listaUsuario.length);
        });
      }else if(rolUsuario== 'administradores'){
        this._usuarioService.getSupervisores().subscribe(data => {
          this.listaUsuario = data;
        });
      }
  }


  delete(id:any): void{
    var cad = getUsuario();
    let usuarioId = getId();
    switch(cad){
      case 'usuarios':
        alert('No tienes rol autorizado');
        this._router.navigate(['/dashboard']);
        break;
      case 'supervisores':
        this._usuarioService.delete(parseInt(id)).subscribe(
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

  mostrarPerfil(id:any){
    localStorage.setItem('idPerfil', id);
    this._router.navigateByUrl('/perfiles');
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
