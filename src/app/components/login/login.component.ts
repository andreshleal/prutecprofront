import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../servicios/usuario.service";
import {Observable} from "rxjs";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data$:Observable<boolean>;
  login:any = {
    nombreUsuarioOrEmail:"",
    password:""
  }
  credenciales:any;

  constructor(private _usuarioService:UsuarioService) {
    this.data$ = _usuarioService.getSharingObservable;
  }

  ngOnInit(): void {
  }

  inicioSesion(){
    this._usuarioService.login(this.login).subscribe({
      next:(value) => {
        this.credenciales = value;
        if(this.credenciales.tokenAcceso){
          localStorage.setItem('token', this.credenciales.tipoToken+" "+this.credenciales.tokenAcceso) ;
          localStorage.setItem("usuario",this.login.nombreUsuarioOrEmail);
          this._usuarioService.setSharingObservable = true;
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.credenciales.tipoToken,
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      },error:(err) => console.log(err),
      complete:() => {

      }
    });
  }

}
