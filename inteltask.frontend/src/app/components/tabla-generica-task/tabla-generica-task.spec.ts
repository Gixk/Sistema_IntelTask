import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGenericaTask } from './tabla-generica-task';

describe('TablaGenericaTask', () => {
  let component: TablaGenericaTask;
  let fixture: ComponentFixture<TablaGenericaTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaGenericaTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaGenericaTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
