/**
 * Represents payload used to create a new Category.
 * Mirrors CategoryCreateDto in backend.
 */
export interface CategoryCreateModel {

  name: string;

  description?: string | null;

}
