import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private sharingObservable:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get getSharingObservable(){
    return this.sharingObservable.asObservable();
  }

  set setSharingObservable(data:boolean){
    this.sharingObservable.next(data);
  }


  //URL:string = 'http://localhost:8080'
  URL:string = 'http://168.138.233.89:8080'

  constructor(private _http:HttpClient) { }


  registrar(usuario:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.URL+'/api/auth/registro',JSON.stringify(usuario),{headers:headers});
  }

  login(usuario:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.URL+'/api/auth/login', JSON.stringify(usuario), {headers:headers});
  }

  validarCorreo(correo:string){
    return this._http.get(this.URL+'/api/auth/correo?correo='+correo);
  }
}
