import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPasajerosComponent } from './registro-pasajeros.component';

describe('RegistroPasajerosComponent', () => {
  let component: RegistroPasajerosComponent;
  let fixture: ComponentFixture<RegistroPasajerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPasajerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPasajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
