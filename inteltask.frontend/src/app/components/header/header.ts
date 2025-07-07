import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit'
import { Auth } from '../../core/AuthService/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, TuiTabs, TuiIcon, TuiDropdown, TuiDataList, 
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
    protected readonly tabs = ['Inicio', 'Tareas', 'Permisos', 'Oficinas', 'Notificaciones'];
    protected activeElement = this.tabs[0];
    nombreUser: string = '';
    rol: string = '';

    constructor(private auth: Auth) {
      const datos = this.auth.obtenerDatosToken();
      if (datos) {
        this.nombreUser = datos.nombre;
        this.rol = this.mapearRol(datos.rol);
      }
    }

    protected get activeItemIndex(): number {
        return this.tabs.indexOf(this.activeElement);
    }

    protected set activeItemIndex(value:number) {
        this.tabs.indexOf(this.activeElement);
    }
    
    protected onClick(activeElement: string): void {
        this.activeElement = activeElement;
    }
    
    onProfileClick(): void {
    console.log('Redirigiendo a Perfil...');
    }
    
    onSettingsClick(): void {
    console.log('ldkfss');
    }
    
    onLogoutClick(): void {
    console.log('Cerrando sesión...');
    this.auth.logout();
    }

    private mapearRol(rol: number): string {
    const roles: { [key: number]: string } = {
      1: 'Director',
      2: 'Subdirector',
      3: 'Jefe',
      4: 'Coordinador',
      5: 'Profesional 3',
      6: 'Profesional 2',
      7: 'Profesional 1',
      8: 'Técnico',
      9: 'Administrador',
    };
    return roles[rol] || 'Desconocido';
  }
}
