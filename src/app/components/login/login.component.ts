import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UserLog } from 'src/app/models/userLog';
import { UsuarioService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginI } from 'src/app/models/login.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public variable!:any;
  userPadre!: UserLog;
  
  public id!: string;
  public password!: string;
  public role!: string;
  public usuario!: Usuario;

  private router!: Router;
  private fb!: FormBuilder;
  private auth!: AuthService;

  form!: FormGroup;

  userModulo = new UserLog("","","");
  
  constructor(
    private _usuarioService: UsuarioService,
    private _router:Router,
    protected formBuilder: FormBuilder,
    protected authen: AuthService
    
  ) {
      this.router=_router;
      this.fb = formBuilder;
      this.auth = authen;
   }

   get formLogin(){
     return this.form.controls;
   }

  ngOnInit(): void {
    this.initialForm();
  }

  login(){
    console.log("Logueado");
    
    let idU = this.userModulo.id;
    console.log(idU);
    let pU = String(this.userModulo.password);
    let rU = String(this.userModulo.role);
    let user = { "id":idU, "password":pU, "role":rU};
    //let user = { "id":1, "password":"1234", "role":"supervisores"};
    if(rU == "usuarios" || rU == "supervisores" || rU == "administradores"){
      let userJson = JSON.stringify(user);
      var myObj = JSON.parse(userJson);
      console.log(myObj);
      this.auth.login(myObj);
    }else{
      alert("No existe este usuario...");
      this._router.navigate(['/']);
    }
   
  }

  onLogin(form:LoginI){
    this.auth.loginByEmail(form).subscribe(data =>{
      console.log(data);
    })
  }

  initialForm(): void {
    this.form = new FormGroup({
      id: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      role: new FormControl('',Validators.required)
    });
  }
  
    /*if(this.formLogin.id.status === 'INVALID' || this.formLogin.password.status === 'INVALID'){
      return;
    }

    console.log(values);

    this.auth.login(values.id, values.password).pipe(first()).subscribe(
      response => {
        console.log(response);
        if(response){
          localStorage.setItem('token', response);

          this.router.navigate(['/dashboard']);
        }
      }
    )*/
  


  
    
  

}





