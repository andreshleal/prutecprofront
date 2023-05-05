import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../servicios/usuario.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  correoError:string = "";
  usuario:any = {
    nombre:"",
    nombreUsuario:"",
    email:"",
    password:""
  }
  constructor(private _usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  registrar() {
    this.validarCorreo(this.usuario.email);
    console.log(this.usuario)
    this._usuarioService.registrar(this.usuario).subscribe({
      next:(value) => {
        console.log(value)
        this.usuario.nombre = "";
        this.usuario.nombreUsuario = "";
        this.usuario.email = "";
        this.usuario.password = "";


      },error:(error) => {
        console.log(error)
        this.usuario.nombre = "";
        this.usuario.nombreUsuario = "";
        this.usuario.email = "";
        this.usuario.password = "";
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
      ,complete:() => {
      }
    });
  }

  validarCorreo(correo:string){
    this._usuarioService.validarCorreo(correo).subscribe({
      next:(value) => {
            this.correoError = "El correo ya existe";
            return
      },error:(error) => {
        console.log(error.ok)
        this.correoError = "";
      },complete:() => {

      }
    });
  }


}
