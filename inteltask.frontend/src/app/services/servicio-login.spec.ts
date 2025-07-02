import { TestBed } from '@angular/core/testing';

import { ServicioLogin } from './servicio-login';

describe('ServicioLogin', () => {
  let service: ServicioLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
