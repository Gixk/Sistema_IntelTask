import { TestBed } from '@angular/core/testing';

import { ServicioNotis } from './servicio-notis';

describe('ServicioNotis', () => {
  let service: ServicioNotis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioNotis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
