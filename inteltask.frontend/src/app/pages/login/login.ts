import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/AuthService/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TuiIcon,
    TuiTextfield, TuiDataList, TuiButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class Login {

  user = '';
  password = '';

  constructor(private router: Router, private auth: Auth) { }

  form = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });


  login(): void {
    if (this.form.invalid) return;

    const { user, password } = this.form.value;
     console.log('Login con:', user, password);

    this.auth.autenticar(user!, password!).subscribe({
      next: (resp: any) => {
        this.auth.guardarToken(resp.token);
        this.router.navigate(['/inicio']);
      },
      error: () => alert('Credenciales incorrectas')
    });
  }

  
  login2(){
    this.router.navigate(['/inicio']);
  }

  cambiarContraseña(): void { }

}
