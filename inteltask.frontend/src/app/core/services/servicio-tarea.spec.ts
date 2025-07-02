import { TestBed } from '@angular/core/testing';

import { ServicioTarea } from './servicio-tarea';

describe('ServicioTarea', () => {
  let service: ServicioTarea;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTarea);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
