import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTareasIncumplidas } from './tabla-tareas-incumplidas';

describe('TablaTareasIncumplidas', () => {
  let component: TablaTareasIncumplidas;
  let fixture: ComponentFixture<TablaTareasIncumplidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaTareasIncumplidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaTareasIncumplidas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
