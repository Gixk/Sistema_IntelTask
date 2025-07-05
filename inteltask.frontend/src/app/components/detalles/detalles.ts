import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-detalles',
  imports: [],
  templateUrl: './detalles.html',
  styleUrl: './detalles.scss'
})
export class Detalles {
@Input() tarea?: Tarea;

@Input() modo: 'crear' | 'editar' = 'crear';
@Output() tareaGuardada = new EventEmitter<void>();
}
