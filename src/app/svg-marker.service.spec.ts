import { TestBed } from '@angular/core/testing';

import { SvgMarkerService } from './svg-marker.service';

describe('SvgMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgMarkerService = TestBed.get(SvgMarkerService);
    expect(service).toBeTruthy();
  });
});
