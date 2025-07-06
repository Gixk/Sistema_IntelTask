import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint, TuiIcon } from '@taiga-ui/core';
import { TuiChevron, TuiPagination } from '@taiga-ui/kit';
import { ServicioTarea } from '../../core/services/servicio-tarea';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tabla-generica-task',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiButton, TuiPagination,
    TuiDropdown, TuiDataList, TuiHint
  ],
  templateUrl: './tabla-generica-task.html',
  styleUrl: './tabla-generica-task.scss',
})
export class TablaGenericaTask implements OnInit {
  datosFiltrados: Tarea[] = [];
  datosPaginados: Tarea[] = [];
  tareas: Tarea[] = [];

  filtros = {
    titulo: '',
    gis: '',
    orden: 'asc',
  };

  index = 0;
  length = 0;
  itemsPorPagina = 4;

  constructor(private tareaService: ServicioTarea, private detector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe((tareas: Tarea[]) => {
      this.tareas = tareas.map(t => ({
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
    this.index = 0; // Reinicia paginación al aplicar filtros

    this.datosFiltrados = this.tareas
      .filter(d =>
        d.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()) &&
        d.numGis.toLowerCase().includes(this.filtros.gis.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = a.fechaFin ? new Date(a.fechaFin).getTime() : 0;
        const dateB = b.fechaFin ? new Date(b.fechaFin).getTime() : 0;
        return this.filtros.orden === 'asc' ? dateA - dateB : dateB - dateA;
      });

    this.length = Math.ceil(this.datosFiltrados.length / this.itemsPorPagina) || 1;
    this.actualizarPaginados();
  }

  setOrden(valor: 'asc' | 'desc') {
    this.filtros.orden = valor;
    this.aplicarFiltros();
  }




  actualizarPaginados(): void {
    const start = this.index * this.itemsPorPagina;
    const end = start + this.itemsPorPagina;
    this.datosPaginados = this.datosFiltrados.slice(start, end);
  }

  cambiarPagina(index: number): void {
    this.index = index;
    this.actualizarPaginados();
  }



  aprobar(item: Tarea): void {
    console.log('Aprobar:', item.idTarea);
  }

  rechazar(item: Tarea): void {
    console.log('Rechazar:', item.idTarea);
  }
}