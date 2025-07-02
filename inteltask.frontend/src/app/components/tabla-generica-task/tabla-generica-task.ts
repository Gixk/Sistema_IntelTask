import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint, TuiIcon } from '@taiga-ui/core';
import { TuiChevron, TuiPagination } from '@taiga-ui/kit';

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
  @Input() datos: any[] = [];
  datosFiltrados: any[] = [];
  datosPaginados: any[] = [];

  filtros = {
    titulo: '',
    gis: '',
    orden: 'asc',
  };

  index = 0;
  length = 0;
  itemsPorPagina = 4;

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.index = 0; // Reinicia paginación al aplicar filtros

    this.datosFiltrados = this.datos
      .filter(d =>
        d.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()) &&
        d.numGis.toLowerCase().includes(this.filtros.gis.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.fechaFin).getTime();
        const dateB = new Date(b.fechaFin).getTime();
        return this.filtros.orden === 'asc' ? dateB - dateA : dateA - dateB;
      });

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