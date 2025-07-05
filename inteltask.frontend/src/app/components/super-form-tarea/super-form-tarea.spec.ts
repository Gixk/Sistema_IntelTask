import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFormTarea } from './super-form-tarea';

describe('SuperFormTarea', () => {
  let component: SuperFormTarea;
  let fixture: ComponentFixture<SuperFormTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperFormTarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperFormTarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
