import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingService } from '../../../core/services/loading.service';

/**
 * Displays a global loading spinner when HTTP requests are active.
 */
@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.css'
})
export class GlobalSpinnerComponent {


  private readonly loadingService = inject(LoadingService);

  readonly isLoading$ = this.loadingService.isLoading$;

}
