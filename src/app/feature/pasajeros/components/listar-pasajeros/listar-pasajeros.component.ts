import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/components/form/shared/modelos/control-base';
import Swal from 'sweetalert2';
import { Pasajero } from '../../shared/models/pasajero';
import { PasajerosService } from '../../shared/services/pasajeros.service';

@Component({
  selector: 'app-listar-pasajeros',
  templateUrl: './listar-pasajeros.component.html',
  styleUrls: ['./listar-pasajeros.component.scss']
})
export class ListarPasajerosComponent implements OnInit {

  pasajeros: any | Pasajero[] = [];
  public isVisible: boolean = false;
  controlsPasajero: Observable<ControlBase<string>[]>;

  constructor(private pasajerosService: PasajerosService) { 
    this.controlsPasajero = this.pasajerosService.getControlsPasajeros() ;
  }

  ngOnInit(): void {
    this.pasajerosService.pasajerosActuales.subscribe((pasajeros: any | Pasajero[]) => {
      this.pasajeros = pasajeros;
    });
  }

  eliminarPasajero(numeroDocumentoPasajeroSeleccionado: string) {
    console.log(typeof numeroDocumentoPasajeroSeleccionado)
    debugger
    if(this.pasajeros.length-1 >= 0 && this.pasajeros.length-1 <= 3 ) {
      if(this.pasajeros.length !== 1) {
        this.pasajeros = this.pasajeros.filter((pasajero: Pasajero) => {
          console.log(pasajero)
          if(pasajero.numeroDocumentoPasajero !== numeroDocumentoPasajeroSeleccionado){
            return true;
          } else {
            return false
          }
        });
        Swal.fire({
          title: 'Eliminación exitosa',
          text: `Se elimino el pasajero con el numero de documento: ${numeroDocumentoPasajeroSeleccionado}`,
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Limite de pasajeros',
          text: `Debe existir por lo menos un pasajero`,
          icon: 'warning'
        })
      }
    }
  }

  agregarPasajero() {
    this.isVisible = !this.isVisible;
    if(this.pasajeros.length-1 >= 0 && this.pasajeros.length-1 <= 3 ) {
      if(this.pasajeros.length >= 4) {
        Swal.fire({
          title: 'Limite de pasajeros',
          text: `Debe existir maximo 4 pasajeros`,
          icon: 'warning'
        })
      }
    }
  }

  registrarPasajero(pasajero: Pasajero) {
    this.pasajeros = [...this.pasajeros, pasajero];
  }



}
