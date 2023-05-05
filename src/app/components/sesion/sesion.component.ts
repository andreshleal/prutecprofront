import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UsuarioService} from "../../servicios/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  usuario:string | null = "";
  logeado: boolean = false;
  data$:Observable<boolean>;
  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ) {
    this.data$ = usuarioService.getSharingObservable;
    this.data$.subscribe(res => this.logeado = res);

  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    try {
      if(localStorage.getItem('token')){
        this.logeado = true;
        this.usuario = localStorage.getItem('usuario');
      }
    }catch (e) {
      console.log(e)
    }
  }

  cerrarSesion(){
    try{
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.usuario = "";
      this.logeado = false;
      this.usuarioService.setSharingObservable = false;
      this.router.navigate(['']);
    }catch (e) {
      console.log(e)
    }
  }
}
