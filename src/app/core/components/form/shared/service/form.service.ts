import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBase } from '../modelos/control-base';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  createFormGroup(controls: ControlBase<string>[] | null) {
    const group: any = [];
    let tipoDocumento: string = '';

    controls?.forEach((control: ControlBase<string>) => {
      switch (control.key) {
        case 'nombrePasajero':
          group[control.key] = new FormControl(control.value || '', [
            Validators.required,
            Validators.pattern("^[a-zA-z_@.ñ#`,~+-]+$")
          ])
          break;
        case 'apellidosPasajero':
          group[control.key] = new FormControl(control.value || '', [
            Validators.required,
            Validators.pattern("^[a-zA-z_@.ñ#`,~+-]+$")
          ])
          break;
        case 'nacionalidadPasajero':
          group[control.key] = new FormControl(control.value || '', [
            Validators.required,
            Validators.pattern("^[a-zA-z]+$")
          ])
          break;
        case 'tipoDocumentoPasajero':
          tipoDocumento = this.validarTipoDocumento(control.value);
          group[control.key] = new FormControl(control.value || '', Validators.required);
          break;
        case 'numeroDocumentoPasajero':
          group[control.key] = this.validarNumeroDocumento(tipoDocumento);
          break;
        default:
          group[control.key] = new FormControl(control.value || '');
          break;
      }
      // group[control.key] = control.required ? new FormControl(control.value || '', Validators.required): new FormControl(control.value || '');
    })


    return new FormGroup(group);
  }


  validarTipoDocumento(tipoDocumento: string | undefined = 'DNI'): string {
    switch (tipoDocumento) {
      case 'DNI':
        return 'DNI'
      case 'CE':
        return 'CE'
      case 'Pasaporte':
        return 'Pasaporte'
      default:
        return '';
    }
  }


  validarNumeroDocumento(tipoDocumento: string = 'DNI'): FormControl {

    switch (tipoDocumento) {
      case 'DNI':
        return new FormControl('', [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern("^[0-9]+$")
        ]);
      case 'CE':
        return new FormControl('', [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern("^[A-Za-z0-9]+$")
        ]);
      case 'Pasaporte':
        return new FormControl('', [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern("^[0-9]+$")
        ]);
      default:
        return new FormControl('');
    }
  }

}
