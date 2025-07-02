import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { ServicioTarea } from '../../core/services/servicio-tarea';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint, TuiNotification, TuiPopup, TuiTextfield } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiBadge, TuiChip, TuiDataListDropdownManager, TuiPagination, } from '@taiga-ui/kit';
import { TablaGenericaTask } from '../../components/tabla-generica-task/tabla-generica-task';
import { TablaTareasIncumplidas } from '../../components/tabla-tareas-incumplidas/tabla-tareas-incumplidas';
import { TablaTareasEspera } from "../../components/tabla-tareas-espera/tabla-tareas-espera";
import { RouterModule } from '@angular/router';
import { DrawerIzq } from '../../components/drawer-izq/drawer-izq';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    CommonModule, TuiDropdown, TuiHint, TuiBadge, TuiNotification, TuiChip,
    TuiDataList,
    TuiDataListDropdownManager, 
    TuiButton,
    FormsModule,
    TuiTextfield,
    TuiPagination,
    TablaGenericaTask,
    TablaTareasIncumplidas,
    TablaTareasEspera, RouterModule, DrawerIzq
  ],
  templateUrl: './tareas.html',
  styleUrls: ['./tareas.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ServicioTarea],
})
export class Tareas implements OnInit {
  task: Tarea[] = [];
  filteredTasks: Tarea[] = [];

  filters = {
    titulo: '',
    asignado: '',
    estado: null as number | null,
  };

  estados = [
    { label: 'Registrada', value: 1 },
    { label: 'Asignada', value: 2 },
    { label: 'En proceso', value: 3 },
    { label: 'En espera', value: 4 },
    { label: 'En revisión', value: 5 },
    { label: 'Rechazada', value: 6 },
    { label: 'Terminada', value: 7 },
    { label: 'Incumplida', value: 8 },
  ];

  index = 0;
  length = 0;
  itemsPorPag = 4;
  sortDirection: 'asc' | 'desc' = 'asc';
  openFilters = false;

  constructor(private tareaService: ServicioTarea) { }

  ngOnInit(): void {
    this.task = this.tareaService.getTareas();
    this.updateView();
  }

  updateView(): void {
    let result = this.task.filter((t) =>
      t.titulo.toLowerCase().includes(this.filters.titulo.toLowerCase()) &&
      t.nombreAsignado.toLowerCase().includes(this.filters.asignado.toLowerCase()) &&
      (this.filters.estado === null || t.estado === this.filters.estado)
    );

    result = result.sort((a, b) => {
      const dateA = a.fechaLimite.getTime();
      const dateB = b.fechaLimite.getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.length = Math.ceil(result.length / this.itemsPorPag) || 1;

    const start = this.index * this.itemsPorPag;
    const end = start + this.itemsPorPag;
    this.filteredTasks = result.slice(start, end);
  }

  goToPage(index: number): void {
    this.index = index;
    this.updateView();
  }

  applyFilters(): void {
    this.index = 0;
    this.updateView();
  }

  clearFilters(): void {
    this.filters = { titulo: '', asignado: '', estado: null };
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updateView();
  }

  getEstadoTexto(estado: number): string {
    switch (estado) {
      case 1: return 'Registrada';
      case 2: return 'Asignada';
      case 3: return 'En proceso';
      case 4: return 'En espera';
      case 5: return 'En revisión';
      case 6: return 'Rechazada';
      case 7: return 'Finalizada';
      case 8: return 'Incumplida';
      default: return 'None';
    }
  }

  getPriorityText(prioridad: number): string {
    switch (prioridad) {
      case 1: return 'Muy Alta';
      case 2: return 'Alta';
      case 3: return 'Media';
      case 4: return 'Baja';
      case 5: return 'Muy baja';
      default: return 'none';
    }
  }

  getTimeLeft(fecha: Date): string {
    const hoy = new Date();
    const tiempoFaltante = fecha.getTime() - hoy.getTime();
    const cantDías = Math.ceil(tiempoFaltante / (1000 * 60 * 60 * 24));
    if (cantDías < 0) return 'Vencida';
    if (cantDías === 0) return 'Hoy';
    if (cantDías === 1) return '1 día';
    return `${cantDías} días`;
  }

  isDateClose(fecha: Date): boolean {
    const hoy = new Date();
    const diffTime = fecha.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }

  verTareaCompleta(): void {
    alert("infor tarea");
  }

  nuevaTarea(): void {
    console.log('Nueva tarea');
  }

  editarTarea(): void {
    alert('Editar tarea:');
  }

  eliminarTarea(): void {
    alert('Tarea eliminada');
  }

  generarReporte(): void {
    console.log('Generar reporte');
  }

  /* DRAWER */
  @ViewChild(DrawerIzq)
  drawerComp!: DrawerIzq;

  abrirDrawerDesdeBoton() {
    this.drawerComp.toggleDrawer();
  }
}
