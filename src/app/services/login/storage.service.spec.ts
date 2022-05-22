import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  //Arrange
  let storageService: StorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        RouterTestingModule],
      providers:[StorageService]
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });
});
