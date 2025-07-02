import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit'


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
    }

    //private readonly dialogConfirm = inject(Prompt);
}
