import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UserLog } from 'src/app/models/userLog';
import { UsuarioService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public variable!:any;
  userPadre!: UserLog;
  user = new UserLog(0,"","");
  public id!: string;
  public password!: string;
  public role!: string;
  public usuario!: Usuario;
  
  constructor(
    private _usuarioService: UsuarioService,
    private _router:Router
    
  ) {
    
   }

  ngOnInit(): void {
   
  }


  login():void{
    console.log("entra");
    
    console.log(this.user.role);
    switch(this.user.role){
      
      case 'usuarios':
        this._usuarioService.getUserByUsername(this.user.id).subscribe(response => {
          this.variable = response;

          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          console.log(misDatos);
          if(misDatos.length > 1){
            this._usuarioService.login(this.user.role, this.user.id).subscribe(data=>{
              console.log(data);
              this._usuarioService.setToken(data.token);
              this._router.navigateByUrl('/dashboard/'+this.user.role+'/'+this.user.id);
            });
          }else{
            alert("Error");
          }
        });
        
          
           
         
        break;
      case 'supervisores':
        this._usuarioService.getSuperUserByUsername(this.user.id).subscribe(response=>{
          this.variable = response;
          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          if(misDatos.length > 1){
            this._usuarioService.login(this.user.role, this.user.id).subscribe(data=>{
              console.log(data);
              this._usuarioService.setToken(data.token);
              this._router.navigateByUrl('/dashboard/'+this.user.role+'/'+this.user.id);
            });
          }
        });
        
        break;
      case 'administradores':
        this._usuarioService.getAdminByUsername(this.user.id).subscribe(response=>{
          this.variable = response;
          let datos = separarComas(JSON.stringify(this.variable));
          let misDatos = devuelvoDatos(datos[0]);
          if(misDatos.length > 1){
            this._usuarioService.login(this.user.role, this.user.id).subscribe(data=>{
              console.log(data);
              this._usuarioService.setToken(data.token);
              this._router.navigateByUrl('/dashboard/'+this.user.role+'/'+this.user.id);
            });
          }
        })
       
        break;

    }
    
  }

}


function separarComas(cadena: any) {
  let separar = cadena.split("/");
  return separar;
}


function devuelvoDatos(datos: Array<any>){
  let nombre = datos.slice(42);
  let cadena = (<any>nombre).split(",");
  return cadena;
}

