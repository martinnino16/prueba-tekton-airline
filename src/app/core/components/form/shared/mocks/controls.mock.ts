import { ControlBase } from "../modelos/control-base";

export const controlMock: ControlBase<string> = {
    value: undefined,
    key: "nombrePasajero",
    label: "Nombre",
    required: false,
    order: 1,
    controlType: "textbox",
    type: "text",
    options: []
}