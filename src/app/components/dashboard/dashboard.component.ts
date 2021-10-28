import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { UserLog } from 'src/app/models/userLog';
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UsuarioService]
})
export class DashboardComponent implements OnInit {

  //@Input() userLog!: UserLog;

  
  @Input() usuarios!: Usuario;
  public variable!:any;
  
  public myArr!:any[];
  //public usuarios?: Usuario;
  public users?: User[];
  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 

    //Tenemos la informacion de la url
        console.log(this._router.url);
        var cad = separarURL(_router);
        console.log(cad[1]);
     
  }
  
  
  
  ngOnInit(): void {
   
    //this.getUsuarioLog();
   
    var cad = separarURL(this._router);
    //cad[0] => id 
    //cad[1] => rol
    console.log(cad[0]);
    switch (cad[1]) {
      case 'usuarios':
        this._usuarioService.getUserByUsername(parseInt(cad[0])).subscribe(response => {
          this.usuarios = response.usuarios;
          this.variable = response;
          
          let datos = separarComas(JSON.stringify(this.variable));
          console.log(this.variable);
          console.log(datos[0]);
          console.log(devuelvoDatos(datos[0]));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
        });
        break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(parseInt(cad[0])).subscribe(response =>{
          this.usuarios = response.usuarios;
          this.variable = response;
          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
          console.log(response);
        })
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(parseInt(cad[0])).subscribe(response =>{
          this.usuarios = response.usuarios;
          this.variable = response;
          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
        })
        break;
    }
     
    


    
  }


  agregarUsuarios(){
    var cad = separarURL(this._router);
    switch(cad[1]){
      case 'usuarios':
        alert("no tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]);
        break;
      case 'supervisores':
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]+'/formulario');
        break;
      case 'administradores':
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]+'/formulario');
        break;
    }
  }


  editarPerfil(){
    var cad = separarURL(this._router);
    switch (cad[1]){
      case 'usuarios':
        alert("No tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]);
        break;
      case 'supervisores':
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]+'/perfil/editar-perfil');
        break;
      case 'administradores':
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]+'/perfil/editar-perfil');
        break;
    }
  }
  

  verListaUsuarios(){
    var cad = separarURL(this._router);
    switch (cad[1]){
      case 'usuarios':
        alert("No tienes un rol autorizado");
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]);
        break;
      case 'supervisores':
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]+'/lista-usuarios');
        break;
      case 'administradores':
        this._router.navigateByUrl('/dashboard/'+cad[1]+'/'+cad[0]+'/lista-usuarios');
        break;
    }
  }

  

  getUsuarioLog(): void {
    var cad = separarURL(this._router);
    switch (cad[1]){
      case 'usuarios':
        this._usuarioService.getUserByUsername(parseInt(cad[0])).subscribe(response => {
          this.usuarios = response.usuarios;
        });
        break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(parseInt(cad[0])).subscribe(response =>{
          this.usuarios = response.usuarios;
        });
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(parseInt(cad[0])).subscribe(response =>{
          this.usuarios = response.usuarios;
        });
        break;
    }
  }


  getDatosUser(){
    var cad = separarURL(this._router);
    //cad[0] => id 
    //cad[1] => rol
    console.log(cad[0]);
    switch (cad[1]) {
      case 'usuarios':
        this._usuarioService.getUserByUsername(parseInt(cad[0])).subscribe(response => {
          this.usuarios = response.usuarios;
          this.variable = response;
          
          let datos = separarComas(JSON.stringify(this.variable));
          console.log(this.variable);
          console.log(datos[0]);
          console.log(devuelvoDatos(datos[0]));
          let misDatos = devuelvoDatos(datos[0]);
          this.usuarios.firstname = misDatos[0];
        });
        break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(parseInt(cad[0])).subscribe(response =>{
          this.usuarios = response.usuarios;
         
          console.log(response);
        })
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(parseInt(cad[0])).subscribe(response =>{
          this.usuarios = response.usuarios;
        })
        break;
    }
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

