import { IFormInput } from './form-input.model';

// const TYPE_SECTION : 'room' | 'pc';
export type TYPE_SECTION = 'room' | 'pc' | '';
export type TYPE_MODAL = 'form' | 'notice';
export type LABEL_BUTTON = 'Eliminar' | 'Guardar' | 'Actualizar' | 'Reportar';

export interface IModalData {
    form       : IFormInput[];
    title      : string;
    typeSection: TYPE_SECTION;
    typeModal  : TYPE_MODAL;
    labelButton: LABEL_BUTTON;
    noticeData ?: string;
}
