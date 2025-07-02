import { TestBed } from '@angular/core/testing';

import { Oficina } from './oficina';

describe('Oficina', () => {
  let service: Oficina;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oficina);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
