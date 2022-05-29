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

    if (controls) {
      controls.forEach((control) => {
        group[control.key] = control.key === 'nombrePasajero' ? new FormControl(control.value || '',
          [
            Validators.required,
            Validators.pattern("^[ A-Za-z_@./#&+-ñ,`']*$")
          ]) : new FormControl(control.value || '');

        group[control.key] = control.key === 'apellidosPasajeros' ? new FormControl(control.value || '',
          [
            Validators.required,
            Validators.pattern("^[ A-Za-z_@./#&+-ñ,`']*$")
          ]) : new FormControl(control.value || '');

        group[control.key] = control.key === 'nacionalidadPasajero' ? new FormControl(control.value || '',
          [
            Validators.required,
            Validators.pattern("^[ A-Za-z]*$")
          ]) : new FormControl(control.value || '');

        // switch (control.key) {
        //   case 'dni':
        //     group[control.key] = control.key === 'dni' ? new FormControl(control.value || '',
        //       [
        //         Validators.required,
        //         Validators.maxLength(8),
        //         Validators.pattern("^[0-9]*$")
        //       ]) : new FormControl(control.value || '');
        //     break;
        //   case 'ce':
        //     group[control.key] = control.key === 'ce' ? new FormControl(control.value || '',
        //       [
        //         Validators.required,
        //         Validators.maxLength(9),
        //         Validators.pattern("^[a-zA-Z0-9]*$")
        //       ]) : new FormControl(control.value || '');
        //     break;
        //   case 'pasaporte':
        //     group[control.key] = control.key === 'pasaporte' ? new FormControl(control.value || '',
        //       [
        //         Validators.required,
        //         Validators.maxLength(9),
        //         Validators.pattern("^[0-9]*$")
        //       ]) : new FormControl(control.value || '');
        //     break;

        //   default:
        //     group[control.key] = new FormControl(control.value || '')
        //     break;
        // }
      });
      return new FormGroup(group);
    }

    return new FormGroup(group);
  }
}
