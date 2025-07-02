import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTareasEspera } from './tabla-tareas-espera';

describe('TablaTareasEspera', () => {
  let component: TablaTareasEspera;
  let fixture: ComponentFixture<TablaTareasEspera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaTareasEspera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaTareasEspera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
