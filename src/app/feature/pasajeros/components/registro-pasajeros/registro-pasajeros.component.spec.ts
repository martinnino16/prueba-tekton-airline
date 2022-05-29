import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import Swal from 'sweetalert2';
import { Pasajero } from '../../shared/models/pasajero';
import { PasajerosService } from '../../shared/services/pasajeros.service';

import { RegistroPasajerosComponent } from './registro-pasajeros.component';
const routerSpy = { navigate: jasmine.createSpy('navigate') };

describe('RegistroPasajerosComponent', () => {

  let component: RegistroPasajerosComponent;
  let fixture: ComponentFixture<RegistroPasajerosComponent>;
  let pasajeroService: PasajerosService;

  const mockPasajero: Pasajero = {
    id: 1,
    nombrePasajero: "Daniel",
    apellidosPasajero: "Martin",
    nacionalidadPasajero: "Colombiano",
    tipoDocumentoPasajero: "dni",
    numeroDocumentoPasajero: "10102344"
  }

  const mockPasajeros: Pasajero[] = [
    {
      id: 1,
      nombrePasajero: "Daniel",
      apellidosPasajero: "Martin",
      nacionalidadPasajero: "Colombiano",
      tipoDocumentoPasajero: "dni",
      numeroDocumentoPasajero: "10102342"
    },
    {
      id: 2,
      nombrePasajero: "Daniela",
      apellidosPasajero: "pineda",
      nacionalidadPasajero: "Colombiana",
      tipoDocumentoPasajero: "dni",
      numeroDocumentoPasajero: "10102323"
    },
    {
      id: 3,
      nombrePasajero: "Camila",
      apellidosPasajero: "Fuentes",
      nacionalidadPasajero: "Colombiana",
      tipoDocumentoPasajero: "dni",
      numeroDocumentoPasajero: "10102320"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [RegistroPasajerosComponent],
      providers: [
        PasajerosService,
        HttpService,
        {
          provide: Router,
          useValue: routerSpy,
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    pasajeroService = TestBed.inject(PasajerosService)
    fixture = TestBed.createComponent(RegistroPasajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Metodo guardarPasajero es llamado', () => {

    // Arrange
    let mockMaxPasajeros = 3;
    const crearSpy = spyOn(pasajeroService, 'guardarPasajero').and.returnValue(
      new Observable<Pasajero | Pasajero[]>()
    );

    // Act
    component.registrarPasajero(mockPasajero);
    component.maxPasajeros = mockMaxPasajeros;
    component.swalWithBootstrapButtons.fire({
      title: 'Deseas registrar un pasajero mas?',
      text: "es posible registrar un pasajero mas!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si,Agregar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        mockMaxPasajeros--;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Assert
        expect(crearSpy).toHaveBeenCalled();
      }
    });
    // Assert
    expect(mockMaxPasajeros).toEqual(3);

  });

  it('Debe almacenar un arreglo de pasajeros', (done) => {

    // Arrange
    component.pasajeros = mockPasajeros;

    // Act
    component.registrarPasajero(mockPasajero);
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toEqual('Deseas registrar un pasajero mas?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(Swal.isVisible()).toBeTruthy();
      expect(Swal.getTitle()?.textContent).toEqual('Agrega un pasajero mas!');
      done();
    });
  });

  it('Debe almacenar un arreglo de pasajeros click cancelar',  (done) => {

    // Arrange
    const pasajeroSpy = spyOn(pasajeroService, 'guardarPasajero').and.returnValue(
      new Observable<Pasajero | Pasajero[]>()
    )
    component.pasajeros = mockPasajeros;

    // Act
    component.registrarPasajero(mockPasajero);

    // Assert
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toEqual('Deseas registrar un pasajero mas?');
    Swal.clickCancel();
    setTimeout(() => {
      pasajeroService.guardarPasajero(mockPasajeros).subscribe((resp) => {
        expect(resp).toBeDefined();
        expect(Swal.isVisible()).toBeTruthy();
        expect(Swal.getTitle()?.textContent).toEqual('Se registraron los siguientes pasajeros:');
      })
      expect(pasajeroSpy).toHaveBeenCalled();
      done();
    });

  });

  it('Debe ejecutarte la función registro exitoso', (done) => {
    // Arrange
    const pasajeroSpy = spyOn(pasajeroService, 'guardarPasajero').and.returnValue(
      new Observable<Pasajero | Pasajero[]>()
    )
    // act
    component.pasajeros = mockPasajeros;
    component.registrarPasajero(mockPasajero);
    Swal.clickConfirm();
    setTimeout(() => {

      component.registroExitoso(mockPasajeros);
      routerSpy.navigate('/listar-pasajeros');
      expect(routerSpy.navigate).toHaveBeenCalledWith('/listar-pasajeros');
    });
    
    // Assert
    expect(component.pasajeros.length).toEqual(4);
    done();



  })


});
