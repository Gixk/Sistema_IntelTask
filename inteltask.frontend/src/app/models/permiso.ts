export interface Permiso {
    idPermiso: number;
    tituloPermiso?: string; // nullable
    descripcionPermiso?: string;
    estadoPermiso: number;
    motivoRechazo?: string;
    fechaRegistro: Date;
    fechaInicioPermiso: Date;
    fechaFinPermiso: Date;
    idCreador: number;
}
