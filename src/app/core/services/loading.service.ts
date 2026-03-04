import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


/**
 * Manages global loading state across the application.
 * 
 * Tracks active HTTP requests and exposes loading status as observable.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private activeRequests = 0;

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);


  /**
   * Observable indicating whether any HTTP request is active.
   */
  readonly isLoading$: Observable<boolean> = this.loadingSubject.asObservable();


  /**
   * Called when a request starts.
   */
  start(): void {
    this.activeRequests++;
    this.loadingSubject.next(true);
  }


  /**
   * Called when a request ends.
   */
  stop(): void {
    this.activeRequests--;

    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.loadingSubject.next(false);
    }
  }

}
