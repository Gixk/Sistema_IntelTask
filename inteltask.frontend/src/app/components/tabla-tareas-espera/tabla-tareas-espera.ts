import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, tuiDropdown, TuiHint } from '@taiga-ui/core';
import { TuiPagination } from '@taiga-ui/kit';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tabla-tareas-espera',
  imports: [ CommonModule, TuiPagination, TuiButton, TuiDataList, FormsModule,
    TuiDropdown, TuiHint
   ],
  templateUrl: './tabla-tareas-espera.html',
  styleUrl: './tabla-tareas-espera.scss'
})
export class TablaTareasEspera implements OnInit {

  @Input() datos: any[] = [];

  datosFiltrados: any[] = [];
  datosPaginados: any[] = [];

  filtros = {
    titulo: '',
    gis: '',
  };

  index = 0;
  length = 0;
  itemsPorPagina = 4;

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.index = 0;

    this.datosFiltrados = this.datos
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
