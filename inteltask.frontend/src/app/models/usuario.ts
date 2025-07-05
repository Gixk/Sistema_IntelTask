export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    correo: string;
    fechaNac: Date;
    contra: string;
    estadoUsuario: boolean;
    fechaCreacion: Date;
    fechaModificacion?: Date;
    rolUsuario: number;
}
