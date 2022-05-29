import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPasajerosComponent } from './listar-pasajeros.component';

describe('ListarPasajerosComponent', () => {
  let component: ListarPasajerosComponent;
  let fixture: ComponentFixture<ListarPasajerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPasajerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPasajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
