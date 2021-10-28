import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [UsuarioService]
})
export class FormularioComponent implements OnInit {

  usuario = new Usuario(0,0,'','','','','','');
  public status!: string;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService
  ) {
      this.usuario = new Usuario(0, 0, '','','','','','');
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let cad = separarURL(this._router);
    console.log(cad[2]+' / '+cad[3]);
    if(cad[2]=='supervisores'){
      if(this.usuario.rol == 'usuarios'){
        this._usuarioService.createUser(this.usuario).subscribe(data => {
          console.log('creado '+data);
          this._router.navigate(['/dashboard/'+cad[2]+'/'+cad[3]]);
        });
      }else{
        alert("No tienes permisos para crear ese usuario");
      }
    }else if(cad[2]=='administradores'){
      if(this.usuario.rol == 'supervisores'){
        this._usuarioService.createSupervisor(this.usuario).subscribe(data =>{
          this._router.navigate(['/dashboard/'+cad[2]+'/'+cad[3]]);
        })
      }else if(this.usuario.rol == 'administradores'){
        this._usuarioService.createAdministrador(this.usuario).subscribe(data =>{
          this._router.navigate(['/dashboard/'+cad[2]+'/'+cad[3]]);
        })
      }
    }
    
  }


 

}


function separarURL(_router: Router) {
  let direccion = _router.url;
  let seperar = direccion.split("/");
  return seperar;

}