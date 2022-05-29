import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { controlMock } from '../shared/mocks/controls.mock';
import { ControlBase } from '../shared/modelos/control-base';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    const expectedControls = new ControlBase({
      value: 'texto',
      key: 'id',
      label: 'Id',
      required: true,
      order: 1,
      controlType: 'textbox',
      type: 'text',
      options: []
    });
    component.controls = expectedControls;
    component.form = new FormGroup({
      id: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Determinar si el formulario es valido', () => {

    expect(component.form.controls[component.controls.key]).toBeDefined();

    const isValid = component.isValid;
    expect(isValid).toBeFalsy();
  });
});
