import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogService, TuiDropdown, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiCheckbox, TuiChevron, TuiDataListWrapper, TuiInputDate, TuiTooltip } from '@taiga-ui/kit';
import { Tarea } from '../../models/tarea';
import { TuiDay } from '@taiga-ui/cdk/date-time';
import { ServicioTarea } from '../../core/services/servicio-tarea';

@Component({
  selector: 'app-super-form-tarea',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TuiButton, TuiIcon, TuiCheckbox, TuiChevron,
    TuiTextfield, TuiDropdown, TuiDataListWrapper, TuiInputDate,
  ],
  templateUrl: './super-form-tarea.html',
  styleUrl: './super-form-tarea.scss'
})



export class SuperFormTarea implements OnInit {
  @Input() tarea?: Tarea;
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Output() tareaGuardada = new EventEmitter<void>();

  private tareaService = inject(ServicioTarea);
  protected persons = ['Persona 1', 'persona 2', 'persona 3'];
  form!: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      idTarea: new FormControl(this.tarea?.idTarea ?? 0),
      titulo: new FormControl(this.tarea?.titulo ?? '', Validators.required),
      Descripcion: new FormControl(this.tarea?.Descripcion ?? '', Validators.required),
      MotivoEspera: new FormControl(this.tarea?.MotivoEspera ?? 'Sin motivo de espera'),
      complejidad: new FormControl(this.tarea?.complejidad ?? 1),
      estado: new FormControl(this.tarea?.estado ?? 1),
      prioridad: new FormControl(this.tarea?.prioridad ?? 1),
      numGis: new FormControl(this.tarea?.numGis ?? '', Validators.required),
      fechaAsignacion: new FormControl(this.tarea?.fechaAsignacion ?? new Date()),
      fechaLimite: new FormControl(this.tarea?.fechaLimite ?? new Date()),
      fechaFin: new FormControl(this.tarea?.fechaFin ?? null),
      creador: new FormControl(this.tarea?.creador ?? 0),
      asignado: new FormControl(this.tarea?.asignado ?? 0),
    });
  }



  guardarTarea(): void {
    if (this.form.invalid) return;

    const tareaForm = { ...this.tarea, ...this.form.value } as Tarea;

    const accion = tareaForm.idTarea
      ? this.tareaService.actualizarTarea(tareaForm)
      : this.tareaService.crearTarea(tareaForm);

    accion.subscribe({
      next: () => this.tareaGuardada.emit(),
      error: (err) => alert('Error al guardar: ' + err.message),
    });
  }
}
