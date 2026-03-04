/**
 * Represents the RFC 7807 ProblemDetails response from ASP.NET Core API.
 */
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}



/**
 * Represents ValidationProblemDetails returned by ASP.NET Core.
 */
export interface ValidationProblemDetails extends ProblemDetails {
  errors: Record<string, string[]>;
}
