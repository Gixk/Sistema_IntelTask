import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDropdown, TuiError, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiChevron, tuiCreateTimePeriods, TuiDataListWrapper, TuiFieldErrorPipe, TuiInputDate, TuiSelect, TuiTextarea } from '@taiga-ui/kit';
import { Tarea } from '../../models/tarea';
import { TuiDay, TuiTime } from '@taiga-ui/cdk/date-time';
import { ServicioTarea } from '../../core/services/servicio-tarea';
import { ServicioUsuario } from '../../core/services/servicio-usuario';
import { Usuario } from '../../models/usuario';

@Component({
  standalone: true,
  selector: 'app-super-form-tarea',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TuiTitle, TuiInputDate, TuiIcon, TuiChevron,
    TuiTextfield, TuiTextarea, TuiDropdown, TuiDataListWrapper, TuiError, TuiSelect, TuiButton
  ],
  templateUrl: './super-form-tarea.html',
  styleUrl: './super-form-tarea.scss'
})



export class SuperFormTarea implements OnInit {
  @Input() tarea?: Tarea;
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Output() tareaGuardada = new EventEmitter<void>();

  private tareaService = inject(ServicioTarea);
  private userService = inject(ServicioUsuario);


  protected levels = ['Muy Alta', 'Alta', 'Media', 'Baja', 'Muy Baja'];
  form!: FormGroup;
  lowUsers: Usuario[] = [];

  /* PREPARACIÓN DEL FORM */
  acceptableValues: TuiTime[] = [
    ...tuiCreateTimePeriods(7, 16, [30, 30]),
    new TuiTime(18, 0),
  ];
  motivoEsperaDeshabilitado: boolean = false;



  ngOnInit(): void {
    this.userService.getLowUsers().subscribe({
      next: (usuarios) => {
        this.lowUsers = usuarios;
      },
      error: (err) => console.error('Error al cargar los usuarios', err),
    });

    if (this.modo === 'editar' && this.tarea) {
      this.motivoEsperaDeshabilitado = this.tarea.estado === 4;
    }

    this.form = new FormGroup({
      gisValue: new FormControl(''),
      tituloValue: new FormControl('', [Validators.required, Validators.minLength(5)]),
      desValue: new FormControl('', [Validators.minLength(10), Validators.maxLength(300)]),
      fechaLimite: new FormControl<TuiDay | null>(null, Validators.required),
      motivoEspera: new FormControl('Sin motivo de espera'),
      compleValue: new FormControl('', Validators.required),
      prioValue: new FormControl('', Validators.required),
      asignado: new FormControl(null, Validators.required),
    });


    this.userService.getLowUsers().subscribe({
      next: (usuarios) => this.lowUsers = usuarios,
      error: (err) => console.error('Error cargando usuarios', err),
    });


    /* & Para actualizar datos */
    if (this.modo === 'editar' && this.tarea) {
      this.form.patchValue({
        gisValue: this.tarea.numGis,
        tituloValue: this.tarea.titulo,
        desValue: this.tarea.Descripcion,
        fechaLimite: this.convertirADia(this.tarea.fechaLimite),
        motivoEspera: this.tarea.MotivoEspera,
        compleValue: this.tarea.complejidad,
        prioValue: this.tarea.prioridad,
        asignado: this.tarea.asignado,
      });
    }

  }

  private convertirADia(date: Date): TuiDay {
    const d = new Date(date);
    return new TuiDay(d.getFullYear(), d.getMonth(), d.getDate());
  }


  guardarTarea(): void {
 /*    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } */

    const complejidad = this.form.get('compleValue')?.value;
    const prioridad = this.form.get('prioValue')?.value;

    const tareaForm: Tarea = {
      ...this.tarea,
      titulo: this.form.get('tituloValue')?.value,
      Descripcion: this.form.get('desValue')?.value,
      MotivoEspera: this.form.get('motivoEspera')?.value,
      complejidad: this.form.get('compleValue')?.value,
      prioridad: this.form.get('prioValue')?.value,
      numGis: this.form.get('gisValue')?.value,
      fechaLimite: this.transformarFecha(this.form.get('fechaLimite')?.value),
      fechaAsignacion: new Date(),
      estado: 1,
      creador: 1,
      asignado: this.form.get('asignado')?.value,
      idTarea: this.tarea?.idTarea || 0,
    };

    const accion = tareaForm.idTarea
      ? this.tareaService.actualizarTarea(tareaForm)
      : this.tareaService.crearTarea(tareaForm);

    accion.subscribe({
      next: () => this.tareaGuardada.emit(),
      error: (err) => alert('Error al guardar: ' + err.message),
    });
  }



  private transformarFecha(dia: TuiDay | null): Date {
    return dia ? new Date(dia.year, dia.month, dia.day) : new Date();
  }




  getErrorMessage(controlName: string): string | null {
    if (!this.form) return null;
    const control = this.form.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    const mensajes: Record<string, string> = {
      required: 'Este campo es obligatorio',
      minlength: 'Debe tener al menos 5 caracteres',
      maxlength: 'Este campo es demasiado largo',
      pattern: 'El formato ingresado no es válido',
    };

    const errorKey = Object.keys(control.errors)[0];
    return mensajes[errorKey] || 'Error no identificado';
  }

  /* MAPEO DE DATOS */
  protected niveles = [
    { label: 'Muy Alta', value: 1 },
    { label: 'Alta', value: 2 },
    { label: 'Media', value: 3 },
    { label: 'Baja', value: 4 },
    { label: 'Muy Baja', value: 5 },
  ];

  roleMap: { [key: number]: string } = {
    1: 'Director',
    2: 'Subdirector',
    3: 'Jefe',
    4: 'Coordinador',
    5: 'Profesional 3',
    6: 'Profesional 2',
    7: 'Profesional 1',
    8: 'Técnico',
  };
}
