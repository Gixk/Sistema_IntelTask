import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Permisos } from './pages/permisos/permisos';
import { Oficinas } from './pages/oficinas/oficinas';
import { Notificaciones } from './pages/notificaciones/notificaciones';
import { Tareas } from './pages/tareas/tareas';
import { Inicio } from './pages/inicio/inicio';
import { DefaultLayout } from './layout/default-layout/default-layout';
import { AuthGuard } from './core/AuthService/auth.guard';

export const routes: Routes = [
    { path: '', component: Login },
    {
        path: '',
        component: DefaultLayout,
        children: [
            { path: 'inicio', component: Inicio, /* canActivate: [AuthGuard] */ },
            { path: 'tareas', component: Tareas },
            { path: 'permisos', component: Permisos },
            { path: 'oficinas', component: Oficinas },
            { path: 'notis', component: Notificaciones, canActivate: [AuthGuard], data: { roles: [2, 3] } },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ],
    },
];
