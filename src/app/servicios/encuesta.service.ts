import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  URL:string = 'http://localhost:8080';
  constructor(private _http:HttpClient) { }



  cargarMarcas(){
    return this._http.get(this.URL+'/pc');
  }

  guardarEncuesta(encuesta:any) {
    let token =  localStorage.getItem('token') || '' ;
    let headers = new HttpHeaders()
      .set('token', token);
    headers.set('Content-Type','application/json');
    return this._http.post(this.URL+'/encuesta', encuesta,  { headers:headers });
  }

  cargarEncuestas(){
    let token =  localStorage.getItem('token') || '' ;
    let headers = new HttpHeaders()
      .set('token', token);
    headers.set('Content-Type','application/json');
    return this._http.get(this.URL+'/encuesta', { headers:headers });
  }

  eliminarEncuesta(id:number){
    let token =  localStorage.getItem('token') || '' ;
    let headers = new HttpHeaders()
      .set('token', token);
    headers.set('Content-Type','application/json');
    return this._http.delete(this.URL+'/encuesta/'+id, { headers:headers });
  }

}
