import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {

  public variable!:any;
  @Input() usuarios!: Usuario;
  //public user!: Usuario;
  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    /*this._usuarioService.getUserByUsername(1).subscribe(
      response => {
        if(response.user){
          this.user = response.user;
        }else{
          
        }
      }
    )*/
  }

  return(){
    var cad = separarURL(this._router);
    console.log(cad);
    this._router.navigate(['/dashboard'+'/'+cad[2]+'/'+cad[3]]);
  }

  getUsuarioLog(){
    var cad = separarURL(this._router);
    switch(cad[2]){
      case 'usuarios':
        this._usuarioService.getUserByUsername(parseInt(cad[3])).subscribe(response =>{
          this.usuarios = response;
          this.variable = response;

          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
          });
          break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(parseInt(cad[3])).subscribe(response =>{
          this.usuarios = response.usuarios;
          this.variable = response;

          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
        });
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(parseInt(cad[3])).subscribe(response =>{
          this.usuarios = response.usuarios;
          this.variable = response;

          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
        });
        break;
    }
  }

  delete(): void{
    var cad = separarURL(this._router);
    switch(cad[2]){
      case 'usuarios':
        alert('No tienes rol autorizado');
        this._router.navigate(['/dashboard'+'/'+cad[2]+'/'+cad[3]]);
        break;
      case 'supervisores':
        this._usuarioService.delete(parseInt(cad[3])).subscribe(
          response => {
          
            this._router.navigate(['/dashboard'+'/'+cad[2]+'/'+cad[3]]);
            alert('Usuario eliminado');
          }, error => {
    
          }
        );
        break;
      case 'administradores':
        this._usuarioService.delete(parseInt(cad[3])).subscribe(response =>{
          this._router.navigate(['/dashboard'+'/'+cad[2]+'/'+cad[3]]);
          alert('Usuario eliminado');
        }, error => {

        })
    }
    
  }

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