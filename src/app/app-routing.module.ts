import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/regitro-pasajeros', pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./feature/pasajeros/pasajeros.module').then(mod => mod.PasajerosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
