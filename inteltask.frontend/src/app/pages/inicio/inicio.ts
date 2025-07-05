import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiCalendar, TuiHint, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { ServicioUsuario } from '../../core/services/servicio-usuario';
import { Usuario } from '../../models/usuario';
import { ServicioNotis } from '../../core/services/servicio-notis';
import { Notificacion } from '../../models/notificacion';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, TuiCalendar, TuiIcon, TuiHint, TuiAvatar, TuiBadge, 
    
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Inicio implements OnInit {

  usuario!: Usuario;
  userInfo: Array<{ etiqueta: string, valor: string, icon: string }> = [];
  notificaciones: Notificacion[] = [];

  constructor(
    private usuarioService: ServicioUsuario,
    private notiService: ServicioNotis
  ) { }



  ngOnInit(): void {
    this.cargarUser();
    this.cargarNotis();
  }



  cargarUser(): void {
    this.usuarioService.getUsuario().subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      this.userInfo = [
        {
          etiqueta: 'ID',
          valor: usuario.idUsuario.toString(),
          icon: '@tui.id-card'
        },
        {
          etiqueta: 'Correo electrónico',
          valor: usuario.correo,
          icon: '@tui.at-sign'
        },
        {
          etiqueta: 'Nacimiento',
          valor: new Date(usuario.fechaNac).toLocaleDateString('es-CR'),
          icon: '@tui.baby'
        },
        {
          etiqueta: 'Fecha registro',
          valor: new Date(usuario.fechaCreacion).toLocaleDateString('es-CR'),
          icon: '@tui.folder-input'
        },
        {
          etiqueta: 'Estado cuenta',
          valor: usuario.estadoUsuario ? 'Activo' : 'Inactivo',
          icon: '@tui.contact-round'
        },
        {
          etiqueta: 'Puesto',
          valor: this.getNombreRol(usuario.rolUsuario),
          icon: '@tui.briefcase'
        }
      ];
    });
  }

  cargarNotis(): void {
    this.notiService.getNotificaciones().subscribe((data) => {
      this.notificaciones = data;
    });
  }

  //& Mapear número de rol a texto
  getNombreRol(rol: number): string {
    const roles: { [key: number]: string } = {
      0: 'Administrador',
      1: 'Director',
      2: 'Sub-Director',
      3: 'Jefe',
      4: 'Coordinador',
      5: 'Profesional 3',
      6: 'Profesional 2',
      7: 'Profesional 1',
      8: 'Técnico'
    };
    return roles[rol] || 'Desconocido';
  }


}