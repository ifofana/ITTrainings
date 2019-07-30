import { TestBed } from '@angular/core/testing';

import { CourseDataService } from './course-data.service';

describe('CourseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseDataService = TestBed.get(CourseDataService);
    expect(service).toBeTruthy();
  });
});
