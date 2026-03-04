/**
 * Represents payload used to update a Category.
 * Includes RowVersion for concurrency validation.
 */
export interface CategoryUpdateModel {

  categoryId: number;

  name: string;

  description?: string | null;

  rowVersion: string;

}
