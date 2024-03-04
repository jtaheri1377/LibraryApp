import { TestBed } from '@angular/core/testing';

import { OnlineOrOfflineInterceptor } from './online-or-offline.interceptor';

describe('OnlineOrOfflineInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OnlineOrOfflineInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OnlineOrOfflineInterceptor = TestBed.inject(OnlineOrOfflineInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
