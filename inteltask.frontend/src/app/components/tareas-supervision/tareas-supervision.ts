import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { ServicioTarea } from '../../core/services/servicio-tarea';
import { CommonModule } from '@angular/common';
import { Detalles } from '../detalles/detalles';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint, TuiPopup, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListDropdownManager, TuiDrawer, TuiPagination } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { SuperFormTarea } from '../super-form-tarea/super-form-tarea';

@Component({
  selector: 'app-tareas-supervision',
  imports: [CommonModule, FormsModule, TuiDrawer,
    TuiDropdown, TuiPagination, TuiPopup, TuiTextfield, TuiHint, TuiDataList,
    TuiDataListDropdownManager, TuiButton,
    SuperFormTarea, Detalles
  ],
  templateUrl: './tareas-supervision.html',
  styleUrl: './tareas-supervision.scss'
})


export class TareasSupervision implements OnInit {
  task: Tarea[] = [];
  filteredTasks: Tarea[] = [];

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


  /* drawer */
  drawerOpen = false;
  modoDrawer: 'crear' | 'editar' | 'detalle' = 'crear';
  tareaSeleccionada?: Tarea;

  editarTarea(tarea: Tarea): void {
    this.modoDrawer = 'editar';
    this.tareaSeleccionada = tarea;
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


  onTareaGuardada(): void {
    this.cerrarDrawer(); // cierra el drawer
    this.ngOnInit(); // actualiza la lista de tareas
  }

  generarReporte(): void {
    console.log('Generar reporte');
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

  dialogConfirm() { }




  updateView(): void {
    let result = this.task.filter((t) =>
      t.titulo.toLowerCase().includes(this.filters.titulo.toLowerCase()) &&
      t.nombreAsignado?.toLowerCase().includes(this.filters.asignado.toLowerCase()) &&
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
}
