import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePermiso } from './informe-permiso';

describe('InformePermiso', () => {
  let component: InformePermiso;
  let fixture: ComponentFixture<InformePermiso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformePermiso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformePermiso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
