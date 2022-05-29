import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../shared/modelos/control-base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() controls!: ControlBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.controls.key]?.valid;
  }

}
