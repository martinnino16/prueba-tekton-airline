import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { FormContainerComponent } from './components/form/form-container/form-container.component';
import { FormComponent } from './components/form/form/form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormContainerComponent,
    FormComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpService
  ],
  exports: [
    FormComponent,
    FormContainerComponent,
    NavbarComponent,
  ]
})
export class CoreModule { }
