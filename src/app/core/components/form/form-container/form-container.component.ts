import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pasajero } from 'src/app/feature/pasajeros/shared/models/pasajero';
import { ControlBase } from '../shared/modelos/control-base';
import { FormService } from '../shared/service/form.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  @Input() controls: ControlBase<string>[] | null = [];
  @Output() formValue: EventEmitter<Pasajero> = new EventEmitter<Pasajero>();
  form!: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.form = this.formService.createFormGroup(this.controls);
  }

  

  onSubmit() {
    this.formValue.emit(this.form.value);
    
  }

}
