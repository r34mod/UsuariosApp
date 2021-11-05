import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url!:'http://localhost:8080/';

  constructor( private router: Router,
    private route: ActivatedRoute,
     private auth: AuthService) { }

  ngOnInit(): void {
    this.logueado();
  }


  logOut(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('idUsuario');
    this.router.navigateByUrl(this.url);
  }

  logueado(): boolean {
    var si = false;
    if(localStorage.getItem('auth_token')!==null){
      si = true;
    } 
    return si;
  }
}
