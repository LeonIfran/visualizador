import { TestBed } from '@angular/core/testing';

import { AutentificacionService } from './autentificacion.service';

describe('AutentificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutentificacionService = TestBed.get(AutentificacionService);
    expect(service).toBeTruthy();
  });
});
