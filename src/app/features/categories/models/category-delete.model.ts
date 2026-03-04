/**
 * Represents payload used to delete a Category.
 * Requires RowVersion for optimistic concurrency.
 */
export interface CategoryDeleteModel {

  categoryId: number;

  rowVersion: string;

}
