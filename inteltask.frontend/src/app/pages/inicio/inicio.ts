import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk/date-time';
import { TuiHandler } from '@taiga-ui/cdk/types';
import { TUI_DAY_TYPE_HANDLER, TuiButton, TuiCalendar, TuiHint, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';


	const handler: TuiHandler<TuiDay, string> = (day: TuiDay) => {
    if (day.day === 10) {
        return 'holiday';
    }
 
    return day.isWeekend ? 'weekend' : 'weekday';
};

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, TuiCalendar, TuiIcon, TuiButton, TuiHint, TuiAvatar],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: TUI_DAY_TYPE_HANDLER, useValue: handler}],
})


export class Inicio {
  usuario = {
    idUsuario: 1,
    nombreUsuario: 'Marco Antonio Solis',
    correo: 'jperez@example.com',
    fechaNac: new Date(1990, 5, 15),
    estadoUsuario: "Activo",
    fechaCreacion: new Date(2023, 0, 10),
    rolUsuario: 'Profesional 3'
  };

  notificaciones = [
    {
      titulo: 'Tarea próxima a vencer',
      mensaje: 'Recuerda que tu tarea "Auditoría interna" vence mañana.',
      correoOrigen: 'sistema@intel-task.com',
      fechaEnvio: new Date(2025, 5, 20, 8, 30),
      recordatorio: 'Fin tarea: Auditoría interna'
    },
    {
      titulo: 'Reunión mensual',
      mensaje: 'Tendrás reunión con el equipo el 25 de junio a las 2:00 p.m.',
      correoOrigen: 'equipo@intel-task.com',
      fechaEnvio: new Date(2025, 5, 18, 10, 15),
      recordatorio: 'Recordatorio: Reunión equipo'
    }
  ];

}