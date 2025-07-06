import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { ServicioTarea } from '../../core/services/servicio-tarea';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint, TuiPopup, TuiTextfield } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiDataListDropdownManager, TuiDrawer, TuiPagination, } from '@taiga-ui/kit';
import { TablaGenericaTask } from '../../components/tabla-generica-task/tabla-generica-task';
import { TablaTareasIncumplidas } from '../../components/tabla-tareas-incumplidas/tabla-tareas-incumplidas';
import { TablaTareasEspera } from "../../components/tabla-tareas-espera/tabla-tareas-espera";
import { RouterModule } from '@angular/router';
import { SuperFormTarea } from '../../components/super-form-tarea/super-form-tarea';
import { Detalles } from '../../components/detalles/detalles';
import { TareasSupervision } from '../../components/tareas-supervision/tareas-supervision';


@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    CommonModule, TuiDropdown, TuiHint, TuiPopup,
    TuiDataList, TuiDataListDropdownManager, TuiButton, FormsModule,
    TuiTextfield, TuiPagination, TablaGenericaTask, TablaTareasIncumplidas,
    TablaTareasEspera, RouterModule, TuiDrawer, SuperFormTarea, Detalles,
    TareasSupervision,
  ],
  templateUrl: './tareas.html',
  styleUrls: ['./tareas.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ServicioTarea],
})


export class Tareas implements OnInit {
  task: Tarea[] = [];
  filteredTasks: Tarea[] = [];

  index = 0;
  length = 0;
  itemsPorPag = 4;
  sortDirection: 'asc' | 'desc' = 'asc';
  openFilters = false;


  filters = {
    titulo: '',
    asignado: '',
    estado: null as number | null,
  };


  constructor(private tareaService: ServicioTarea, private detector: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.tareaService.getTareas().subscribe((tareas: Tarea[]) => {
      this.task = tareas.map(t => ({
        ...t,
        fechaAsignacion: new Date(t.fechaAsignacion),
        fechaLimite: new Date(t.fechaLimite),
        fechaFin: t.fechaFin ? new Date(t.fechaFin) : null
      }));
      this.updateView();
      this.detector.detectChanges();
    });
  }


  /* drawer */
  drawerOpen = false;
  modoDrawer: 'crear' | 'editar' | 'detalle' = 'detalle';
  tareaSeleccionada?: Tarea;

  nuevaTarea(): void {
    this.modoDrawer = 'crear';
    this.tareaSeleccionada = undefined;
    this.drawerOpen = true;
  }

  verDetallesTarea(tarea: Tarea): void {
    this.modoDrawer = 'detalle';
    this.tareaSeleccionada = tarea;
    this.drawerOpen = true;
  }

  cerrarDrawer(): void {
    this.drawerOpen = false;
  }


  cambiarEstado(num: number) {
    switch (num) {
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 7:
        break;
    }
  }

  generarReporte(): void {
    console.log('Generar reporte');
  }


  updateView(): void {
    let result = this.task.filter((t) =>
      (t.titulo?.toLowerCase() ?? '').includes(this.filters.titulo.toLowerCase()) &&
      (t.nombreAsignado?.toLowerCase() ?? '').includes(this.filters.asignado.toLowerCase()) &&
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
}
