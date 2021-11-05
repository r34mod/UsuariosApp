import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
  providers: [UsuarioService]
})
export class EditarPerfilComponent implements OnInit {

  url!:'http://localhost:8080/';

  public id!: number;
  public usuario!: Usuario;
  public status!: string;

  usuarioMod = new Usuario("","","","","","","","");

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private authen: AuthService
  ) { 
    
  }

  ngOnInit(): void {
    if(this.authen.logUser===true){
      
    }else{
      alert("No estas logueado");
      this._router.navigateByUrl(this.url);
    }
  }

  onSubmit(): void{
    let usuarioRol = getUsuario();
      let usuarioId = getId();
      if(usuarioRol == 'supervisores'){
        let idU = this.usuarioMod._id;
        let idsU = this.usuarioMod.id_super;
        let name = String(this.usuarioMod.firstname);
        let nameUser = String(this.usuarioMod.username);
        let emailU = String(this.usuarioMod.email);
        let rolU = String(this.usuarioMod.rol);
        let passU = String(this.usuarioMod.password);
        let depU = String(this.usuarioMod.department);
        let user = { 
            "id_super": idU,
            "id": idsU,
            "username": nameUser,
            "firstname": name,
            "rol": rolU,
            "email": emailU,
            "password": passU,
            "departmento": depU
        };
        
        if(rolU == "usuario" || rolU == "supervisores" || rolU == "administradores"){
          let userJson = JSON.stringify(user);
          var myObj = JSON.parse(userJson);
          console.log(myObj);
          this._usuarioService.updateSuper(parseInt(idU), myObj).subscribe(data => {
            this._router.navigate(['/loadUser']);
          });
        }else{
          alert("Error de rol");
        }
        
      }else if(usuarioRol == 'administradores'){
        let idU = this.usuarioMod._id;
        let idsU = this.usuarioMod.id_super;
        let name = String(this.usuarioMod.firstname);
        let nameUser = String(this.usuarioMod.username);
        let emailU = String(this.usuarioMod.email);
        let rolU = String(this.usuarioMod.rol);
        let passU = String(this.usuarioMod.password);
        let depU = String(this.usuarioMod.department);
        let user = { 
            "id_super": idU,
            "id": idsU,
            "username": nameUser,
            "firstname": name,
            "rol": rolU,
            "email": emailU,
            "password": passU,
            "departmento": depU
        };
        
        if(rolU == "usuario" || rolU == "supervisores" || rolU == "administradores"){
          let userJson = JSON.stringify(user);
          var myObj = JSON.parse(userJson);
          console.log(myObj);
          this._usuarioService.updateAdmin(parseInt(idU), myObj).subscribe(data => {
            this._router.navigate(['/loadUser']);
          });
        }else{
          alert("Error de rol");
        }
        
      }
  }

  atras(): void {
    
    this._router.navigate(['/dashboard']);
  }

  

}

function separarURL(_router: Router) {
  let direccion = _router.url;
  let seperar = direccion.split("/");
  return seperar;

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

