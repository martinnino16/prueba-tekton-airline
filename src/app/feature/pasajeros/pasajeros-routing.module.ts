import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPasajerosComponent } from './components/listar-pasajeros/listar-pasajeros.component';
import { RegistroPasajerosComponent } from './components/registro-pasajeros/registro-pasajeros.component';

export const routes: Routes = [
    {
        path: '',
        component: RegistroPasajerosComponent,
    },
    { 
        path: 'listar-pasajeros', 
        component: ListarPasajerosComponent 
    },
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PasajerosRoutingModule { }
