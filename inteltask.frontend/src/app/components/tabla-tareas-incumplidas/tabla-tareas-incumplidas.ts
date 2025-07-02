import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint } from '@taiga-ui/core';
import { TuiPagination } from '@taiga-ui/kit';

@Component({
  selector: 'app-tabla-tareas-incumplidas',
  imports: [CommonModule, TuiButton, TuiPagination, TuiDataList, TuiDropdown, FormsModule,
    TuiHint
  ],
  templateUrl: './tabla-tareas-incumplidas.html',
  styleUrl: './tabla-tareas-incumplidas.scss'
})
export class TablaTareasIncumplidas {

  @Input() datos: any[] = [];
  datosFiltrados: any[] = [];
  datosPaginados: any[] = [];

  filtros = {
    titulo: '',
    asignado: '',
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
    .filter(d =>
      d.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()) &&
      d.nombreAsignado.toLowerCase().includes(this.filtros.asignado.toLowerCase())
    );

  this.length = Math.ceil(this.datosFiltrados.length / this.itemsPorPagina) || 1;
  this.actualizarPaginados();
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

  aprobar(item: any): void {
    console.log('Aprobar:', item);
  }

  rechazar(item: any): void {
    console.log('Rechazar:', item);
  }
}
