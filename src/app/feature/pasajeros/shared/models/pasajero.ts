export class Pasajero {
    id: number;
    nombrePasajero: string;
    apellidosPasajero: string;
    nacionalidadPasajero:string;
    tipoDocumentoPasajero: string;
    numeroDocumentoPasajero: string;

    constructor(
        id: number,
        nombrePasajero: string,
        apellidosPasajero: string,
        nacionalidadPasajero: string,
        tipoDocumentoPasajero: string,
        numeroDocumentoPasajero: string
    ) {
        this.id = id;
        this.nombrePasajero = nombrePasajero;
        this.apellidosPasajero = apellidosPasajero;
        this.nacionalidadPasajero = nacionalidadPasajero;
        this.tipoDocumentoPasajero = tipoDocumentoPasajero;
        this.numeroDocumentoPasajero = numeroDocumentoPasajero;
    }
}
