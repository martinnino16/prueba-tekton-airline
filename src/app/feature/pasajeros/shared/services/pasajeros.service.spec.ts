import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PasajerosService } from './pasajeros.service';
import { Pasajero } from '../models/pasajero';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';

describe('PasajerosService', () => {
  let httpMock: HttpTestingController;
  let service: PasajerosService;
  const apiEndpointPasajero= `${environment.apiUrl}/pasajeros`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PasajerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe listar los Pasajeros', () => {
    const dummyPasajeros = [
      new Pasajero(
        1,
        'William',
        'Osler',
        '1997-04-23',
        'medicina general',
        '30023452323'
      ),
      new Pasajero(
        2,
        'Jenner',
        'Rico',
        '1997-04-25',
        'medicina general',
        '3002345232'
      )
    ];
    service.getPasajeros().subscribe(Pasajeros => {
      expect(Pasajeros.length).toBe(2);
      expect(Pasajeros).toEqual(dummyPasajeros);
    });
    const req = httpMock.expectOne(apiEndpointPasajero);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPasajeros);
  });

  it('deberia crear un pasajero', () => {
    const dummyPasajero = new Pasajero(1,
      'William',
      'Osler',
      'colombiano',
      'DNI',
      '3002345'
    );
    service.guardarPasajero(dummyPasajero).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyPasajero);
    });
    const req = httpMock.expectOne(apiEndpointPasajero);
    expect(req.request.method).toBe('POST');
  });

  it('deberia eliminar un medico', () => {
    const dummyPasajero = new Pasajero(1,
      'William',
      'Osler',
      'colombiano',
      'DNI',
      '3002345'
    );
    service.eliminarPasajeros(dummyPasajero.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointPasajero}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
