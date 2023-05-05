import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./components/inicio/inicio.component";
import {ConsultaComponent} from "./components/consulta/consulta.component";
import {FormularioComponent} from "./components/formulario/formulario.component";
import {RestriccionGuard} from "./restriccion.guard";

const routes: Routes = [
  {path:'', component:InicioComponent},
  {path:'formulario', component:FormularioComponent, canActivate: [RestriccionGuard]},
  {path:'consulta', component:ConsultaComponent, canActivate: [RestriccionGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
