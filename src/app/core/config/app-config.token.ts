import { InjectionToken } from '@angular/core';
import { AppConfig } from './app-config.interface';

/**
 * Injection tokens for accessing runtime application configuration.
 *
 */

export const APP_CONFIG
  = new InjectionToken<AppConfig>('APP_CONFIG');
