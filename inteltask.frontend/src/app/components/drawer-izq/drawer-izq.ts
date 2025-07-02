import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButton, TuiLink, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { TuiBadge, TuiDrawer, TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'app-drawer-izq',
  imports: [ CommonModule, TuiButton, TuiDrawer, TuiPopup, TuiTabs, TuiTitle,
    RouterModule, TuiPopup
  ],
  templateUrl: './drawer-izq.html',
  styleUrl: './drawer-izq.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class DrawerIzq {

    open = signal(false); // <-- el mismo signal

  toggleDrawer() {
    this.open.set(!this.open());
  }

  closeDrawer() {
    this.open.set(false);
  }
}
