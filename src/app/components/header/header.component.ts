import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../servicios/usuario.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario:string | null = "";
  estado:string = 'registro';
  logeado: boolean = false;
  data$:Observable<boolean>;
  constructor(private usuarioService:UsuarioService) {
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


}
