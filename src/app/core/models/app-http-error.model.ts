/**
 * Normalized HTTP error used across the Angular application.
 * This abstracts HttpErrorResponse and RFC 7807 details into a clean, predictable structure.
 */
export interface AppHttpError {

  status: number;

  title?: string;

  detail?: string;


  /**
   * Validation errors mapped by property name.
   */
  validationErrors?: Record<string, string[]>;


  /**
   * True if this is a concurrency conflict (409).
   */
  isConcurrencyError?: boolean;


  /**
   * True if unauthorized (401).
   */
  isUnauthorized?: boolean;


  /**
   * True if forbidden (403).
   */
  isForbidden?: boolean;

}
