import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Permisos } from './pages/permisos/permisos';
import { Oficinas } from './pages/oficinas/oficinas';
import { Notificaciones } from './pages/notificaciones/notificaciones';
import { Tareas } from './pages/tareas/tareas';
import { Header } from './components/header/header';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: Inicio },
    { path:'tareas', component: Tareas },
    { path:'permisos', component: Permisos },
    { path:'oficinas', component: Oficinas },
    { path:'notis', component: Notificaciones },
    { path:'**', redirectTo: '' }
];
