import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ControlBase } from 'src/app/core/components/form/shared/modelos/control-base';
import { SelectControl } from 'src/app/core/components/form/shared/modelos/select';
import { TextBoxControl } from 'src/app/core/components/form/shared/modelos/textbox';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { Pasajero } from '../models/pasajero';

@Injectable({
  providedIn: 'root'
})
export class PasajerosService {

  private pasajerosObservable$: BehaviorSubject<Pasajero[] | Pasajero> = new BehaviorSubject<Pasajero[] | Pasajero>([]);
  pasajerosActuales = this.pasajerosObservable$.asObservable();

  constructor(private http: HttpService) { }

  enviarPasajeros(pasajeros: Pasajero[] | Pasajero) {
    this.pasajerosObservable$.next(pasajeros);
  }

  public getPasajeros() {
    return this.http.doGet<Pasajero[]>(`${environment.apiUrl}/pasajeros`);
  }

  public guardarPasajero(pasajero: Pasajero | Pasajero[]) {
    return this.http.doPost<Pasajero | Pasajero[], Pasajero | Pasajero[]>(`${environment.apiUrl}/pasajeros`, pasajero );
  }

  public eliminarPasajeros(pasajeroId: number) {
    return this.http.doDelete<boolean>(`${environment.apiUrl}/pasajeros/${pasajeroId}`);
  }

  public getControlsPasajeros() {
    const controls: ControlBase<string>[] = [
      new TextBoxControl({
        key: 'nombrePasajero',
        label: 'Nombre',
        required: true,
        type: 'text',
        order: 1
      }),
      new TextBoxControl({
        key: 'apellidosPasajero',
        label: 'Apellidos',
        required: true,
        type: 'text',
        order: 2
      }),
      new TextBoxControl({
        key: 'nacionalidadPasajero',
        label: 'Nacionalidad',
        required: true,
        type: 'text',
        order: 3
      }),
      new SelectControl({
        key: 'tipoDocumentoPasajero',
        label: 'Tipo Documento',
        required: true,
        order: 4,
        options: [
          {key: 'dni', value: 'DNI'},
          {key: 'ce', value: 'CE'},
          {key: 'pasaporte', value: 'Pasaporte'},
        ]
      }),
      new TextBoxControl({
        key: 'numeroDocumentoPasajero',
        label: 'Numero Documento',
        required: true,
        type: 'text',
        order: 5
      }),
    ];

    controls.sort();
    return of(controls);
  }
}
