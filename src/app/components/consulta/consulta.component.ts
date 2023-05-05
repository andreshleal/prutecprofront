import { Component, OnInit } from '@angular/core';
import {EncuestaService} from "../../servicios/encuesta.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  listaEncuestas:any = [];
  constructor(private encuestaService: EncuestaService) { }

  ngOnInit(): void {
    this.encuestas;
  }

    get encuestas(){
        return this.encuestaService.cargarEncuestas().subscribe({
          next : (data) => {
            this.listaEncuestas = data;
          }, error : (err) => {
            console.log(err);
          }, complete : () => {

          }
        });
    }

    eliminar(id:any){
      Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir estos cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok, Eliminado!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.encuestaService.eliminarEncuesta(id).subscribe({
            next : (data) => {
              this.encuestas;
            }, error : (err) => {
              console.log(err);
            }, complete : () => {

            }
          });
          Swal.fire(
            'Eliminado!',
            'eliminado correctamente.',
            'success'
          )
        }
      })

        // return this.encuestaService.eliminarEncuesta(id).subscribe({
        //     next : (data) => {
        //         this.encuestas;
        //     }, error : (err) => {
        //         console.log(err);
        //     }, complete : () => {
        //
        //     }
        // });
    }


}
