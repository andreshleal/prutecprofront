import { Component, OnInit } from '@angular/core';
import {EncuestaService} from "../../servicios/encuesta.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  datos: any = {
    documento:0,
    email:"",
    comentarios:"",
    marcaFavorita:""
  };

  marcas:any = [];

  constructor(private encuestaService:EncuestaService) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas(){
    this.encuestaService.cargarMarcas().subscribe({
      next: (value) => {
        this.marcas = value;
      },
      error: (err) => console.log(err),
      complete: () => {

      }
    });
  }


  asignarMarca(event:any){
      this.datos.marcaFavorita = event.target.value;
  }

  enviarCuestionario() {
    console.log(this.datos)
    this.encuestaService.guardarEncuesta(this.datos).subscribe({
      next: (value) => {
          // console.log(value)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      }, error: (error) => console.log(error),
      complete: () => {
        this.datos.documento=0;
        this.datos.email="";
        this.datos.comentarios="";
        this.datos.marcaFavorita="";
        this.datos.marcaFavorita = "";

      }
    });
  }

}
