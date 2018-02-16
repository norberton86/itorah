import { TestBed, inject } from '@angular/core/testing';

import { CkEditorService } from './ck-editor.service';

describe('CkEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CkEditorService]
    });
  });

  it('should be created', inject([CkEditorService], (service: CkEditorService) => {
    expect(service).toBeTruthy();
  }));
});
