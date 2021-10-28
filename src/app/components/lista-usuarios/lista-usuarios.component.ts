import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
  providers: [UsuarioService]
})
export class ListaUsuariosComponent implements OnInit {

  public usuarios!: Usuario[];

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this._usuarioService.getAllUsers().subscribe(
      response => {
        if(response.usuarios){
          this.usuarios = response.usuarios;
          console.log(this.usuarios);
        }else{
          
        }
      }
    )
  }

}
