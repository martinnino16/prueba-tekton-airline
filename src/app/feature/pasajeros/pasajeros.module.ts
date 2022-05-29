import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroPasajerosComponent } from './components/registro-pasajeros/registro-pasajeros.component';
import { ListarPasajerosComponent } from './components/listar-pasajeros/listar-pasajeros.component';
import { PasajerosRoutingModule } from './pasajeros-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    RegistroPasajerosComponent,
    ListarPasajerosComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    PasajerosRoutingModule
  ],
  exports: [
    RegistroPasajerosComponent,
    ListarPasajerosComponent
  ]
})
export class PasajerosModule { }
