import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasSupervision } from './tareas-supervision';

describe('TareasSupervision', () => {
  let component: TareasSupervision;
  let fixture: ComponentFixture<TareasSupervision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasSupervision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasSupervision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
