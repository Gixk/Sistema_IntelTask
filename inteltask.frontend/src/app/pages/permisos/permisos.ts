import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/AuthService/auth';

@Component({
  standalone: true,
  selector: 'app-permisos',
  imports: [ CommonModule, TuiTextfield, TuiButton ],
  templateUrl: './permisos.html',
  styleUrl: './permisos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Permisos {

  constructor(public auth: Auth) {}

  crearPermiso() {}
}
