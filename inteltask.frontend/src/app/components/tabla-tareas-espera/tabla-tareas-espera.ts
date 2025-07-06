import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, tuiDropdown, TuiHint } from '@taiga-ui/core';
import { TuiPagination } from '@taiga-ui/kit';
import { Tarea } from '../../models/tarea';
import { ServicioTarea } from '../../core/services/servicio-tarea';

@Component({
  selector: 'app-tabla-tareas-espera',
  imports: [ CommonModule, TuiPagination, TuiButton, TuiDataList, FormsModule,
    TuiDropdown, TuiHint
   ],
  templateUrl: './tabla-tareas-espera.html',
  styleUrl: './tabla-tareas-espera.scss'
})
export class TablaTareasEspera implements OnInit {
  datosFiltrados: any[] = [];
  datosPaginados: any[] = [];
  tareas: Tarea[] = [];

  filtros = {
    titulo: '',
    gis: '',
  };

  index = 0;
  length = 0;
  itemsPorPagina = 4;

  constructor(private tareaService: ServicioTarea, private detector: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.tareaService.getTareas().subscribe((tareas: Tarea[]) => {
      this.tareas = tareas
      .filter(t => t.estado === 4)
      .map(t => ({
        ...t,
        fechaAsignacion: new Date(t.fechaAsignacion),
        fechaLimite: new Date(t.fechaLimite),
        fechaFin: t.fechaFin ? new Date(t.fechaFin) : null
      }));
      this.aplicarFiltros();
      this.detector.detectChanges();
    });
  }

  aplicarFiltros(): void {
    this.index = 0;

    this.datosFiltrados = this.tareas
      .filter(item =>
        item.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()) &&
        item.numGis.toLowerCase().includes(this.filtros.gis.toLowerCase())
      );

    this.length = Math.ceil(this.datosFiltrados.length / this.itemsPorPagina) || 1;
    this.actualizarPaginados();
  }

  actualizarPaginados(): void {
    const inicio = this.index * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.datosPaginados = this.datosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(index: number): void {
    this.index = index;
    this.actualizarPaginados();
  }

  verDetalles(tarea: any): void {
    console.log('Ver detalles:', tarea);
    // Aquí podrías emitir un evento, abrir un modal, etc.
  }

  enviarRecordatorio(tarea: any): void {
    console.log('Enviar recordatorio a:', tarea.nombreAsignado);
    // Aquí podrías invocar un servicio o mostrar una notificación
  }
}
