/**
 * Represents Category data returned from the API.
 * Mirrors CategoryReadDto in backend.
 */
export interface CategoryReadModel {

  categoryId: number;

  name: string;

  description?: string | null;

  createdAtUtc: string;               // DateTime CONVERTED TO string (ISO)

  modifiedAtUtc?: string | null;      // DateTime CONVERTED TO string (ISO) if it has a value

  /**
   * Base64 encoded row version for optimistic concurrency.
   */
  rowVersion: string;

}
