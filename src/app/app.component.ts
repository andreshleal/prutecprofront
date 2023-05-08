import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UsuarioService} from "./servicios/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prutecpro';
  data$:Observable<boolean>;
  constructor(
    private _router: Router,
    private usuarioService: UsuarioService
  ){
    this.data$ = usuarioService.getSharingObservable;
  }

  ngOnInit(): void {
    this.registrarInactividad();
  }

  registrarInactividad = () => {
    var t: string | number | NodeJS.Timeout | undefined;
    window.onload = reiniciarTiempo;
    // Eventos del DOM
    document.onmousemove = reiniciarTiempo;
    document.onkeypress = reiniciarTiempo;
    document.onload = reiniciarTiempo;
    document.onmousemove = reiniciarTiempo;
    document.onmousedown = reiniciarTiempo; // aplica para una pantalla touch
    document.ontouchstart = reiniciarTiempo;
    document.onclick = reiniciarTiempo;     // aplica para un clic del touchpad
    document.onscroll = reiniciarTiempo;    // navegando con flechas del teclado
    document.onkeypress = reiniciarTiempo;

    const tiempoExcedido = () => {

      if(localStorage.getItem('token')!= null){

        localStorage.removeItem('token');
        this.usuarioService.setSharingObservable = false;
        this._router.navigate(['']);
        Swal.fire('La sesion a terminado por inactividad.');
      }
    }

    function reiniciarTiempo() {
      clearTimeout(t);
      t = setTimeout(tiempoExcedido, 30000)
      // 1000 milisegundos = 1 segundo
    }
  };


}
