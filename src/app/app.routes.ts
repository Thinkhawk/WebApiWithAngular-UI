import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/components/category-list/category-list')
        .then(m => m.CategoryListComponent)
  }
];
