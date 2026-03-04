import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';

import { LoadingService } from '../services/loading.service';


/**
 * Interceptor that manages global loading state.
 *
 * NOTE:
 *    finalize offers guaranteed cleanup.  It runs:
 *    - on success
 *    - on error
 *    - on cancellation
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);

  loadingService.start();

  return next(req).pipe(
    finalize(() => loadingService.stop())
  );

};
