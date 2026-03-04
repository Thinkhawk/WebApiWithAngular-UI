import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ProblemDetails, ValidationProblemDetails } from '../models/problem-details.model';
import { AppHttpError } from '../models/app-http-error.model';

/**
 * Global HTTP error interceptor.
 * - Centralizes error handling, using RxJS CatchError interceptor.
 * - Handles RFC 7807 ProblemDetails responses.
 * - Centralizes Error Handling, so Controllers no longer need to handle errors individually.
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      const appError: AppHttpError = {
        status: error.status
      };

      if (error.error) {

        const problem = error.error as ProblemDetails;

        appError.title = problem.title;
        appError.detail = problem.detail;

        // (400) Validation errors 
        if (problem.status === 400 && (problem as ValidationProblemDetails).errors) {
          appError.validationErrors = (problem as ValidationProblemDetails).errors;
          console.warn('Validation errors:', (problem as ValidationProblemDetails).errors);
        }

        // (409) Concurrency Conflict 
        if (problem.status === 409) {
          appError.isConcurrencyError = true;
          console.warn('Concurrency conflict detected.');
        }

        // (401) Unauthorized
        if (problem.status === 401) {
          appError.isUnauthorized = true;
          console.warn('Unauthorized access.');
        }

        // (403) Forbidden
        if (problem.status === 403) {
          appError.isForbidden = true;
          console.warn('Unauthenticated access.  Access is forbidden');
        }
      }

      return throwError(() => appError);
    })
  );

};
