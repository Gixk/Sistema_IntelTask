import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/AuthService/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, TuiButton, FormsModule, TuiIcon,
    TuiTextfield, TuiDataList,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class Login {

  user = '';
  password = '';

  constructor(private router: Router, private auth: Auth) { }

  login(): void {
    this.auth.autenticar(this.user, this.password).subscribe({
      next: (resp: any) => {
        this.auth.guardarToken(resp.token);
        this.router.navigate(['/inicio']);
      },
      error: () => alert('Credenciales incorrectas')
    });

  }

  login2(): void {
    this.router.navigate(['inicio']);
  }

  cambiarContraseña(): void { }

  /*
  logout() {
    this.authService.logout();
  }
  
  */

}
