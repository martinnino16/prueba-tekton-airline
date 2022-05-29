import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ControlBase } from 'src/app/core/components/form/shared/modelos/control-base';
import Swal from 'sweetalert2';
import { Pasajero } from '../../shared/models/pasajero';
import { PasajerosService } from '../../shared/services/pasajeros.service';

@Component({
  selector: 'app-registro-pasajeros',
  templateUrl: './registro-pasajeros.component.html',
  styleUrls: ['./registro-pasajeros.component.scss']
})
export class RegistroPasajerosComponent {

  controlsPasajero: Observable<ControlBase<string>[]>;
  public pasajeros: Pasajero[] = [];
  public maxPasajeros: number = 3;

  public swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mr-2',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  

  constructor(
    protected pasajerosServices: PasajerosService,
    private router: Router
  ) {
    this.controlsPasajero = this.pasajerosServices.getControlsPasajeros() ;
  }

  async registrarPasajero  (pasajero: Pasajero): Promise<void> {
   
    this.pasajeros = [...this.pasajeros, pasajero];

    if(this.maxPasajeros > 0) {
      await this.swalWithBootstrapButtons.fire({
        title: 'Deseas registrar un pasajero mas?',
        text: "es posible registrar un pasajero mas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si,Agregar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then( (result) => {
        if (result.isConfirmed) {
          if(this.maxPasajeros > 0) {
            this.swalWithBootstrapButtons.fire(
              'Agrega un pasajero mas!',
              `puedes agregar hasta ${this.maxPasajeros} pasajeros mas.`,
              'success'
            )
            this.maxPasajeros--;
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.pasajerosServices.guardarPasajero(this.pasajeros).subscribe(this.registroExitoso);
        }
      })
    }
    if(this.pasajeros.length === 4) {
      this.pasajerosServices.guardarPasajero(this.pasajeros).subscribe(this.registroExitoso);
    }
  }

  public registroExitoso = async (pasajeros: Pasajero | Pasajero[]): Promise<void> => {


    if(Array.isArray(pasajeros)) {
      for (const pasajero of pasajeros) {
        await this.swalWithBootstrapButtons.fire(
          'Se registraron los siguientes pasajeros:',
          `${pasajero.nombrePasajero} ${pasajero.apellidosPasajero}`,
          'success'
        );
      }
      this.pasajerosServices.enviarPasajeros(pasajeros);
      this.router.navigate(['/listar-pasajeros']);
    } else {
        await this.swalWithBootstrapButtons.fire(
          'Se registraron los siguientes pasajeros:',
          `${pasajeros.nombrePasajero} ${pasajeros.apellidosPasajero}`,
          'success'
        );
      this.pasajerosServices.enviarPasajeros(pasajeros);
      this.router.navigate(['/listar-pasajeros']);
    }

  }

}
