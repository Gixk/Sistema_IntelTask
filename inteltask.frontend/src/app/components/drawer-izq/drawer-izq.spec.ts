import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerIzq } from './drawer-izq';

describe('DrawerIzq', () => {
  let component: DrawerIzq;
  let fixture: ComponentFixture<DrawerIzq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerIzq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerIzq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
