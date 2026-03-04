import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../../../core/config/app-config.token';
import { AppConfig } from '../../../core/config/app-config.interface';

import { CategoryReadModel } from '../models/category-read.model';
import { CategoryCreateModel } from '../models/category-create.model';
import { CategoryUpdateModel } from '../models/category-update.model';
import { CategoryDeleteModel } from '../models/category-delete.model';


/**
 * Service responsible for communicating with Category API endpoints.
 * Encapsulates all HTTP operations related to Category management.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly http = inject(HttpClient);
  private readonly config = inject<AppConfig>(APP_CONFIG);
  private readonly baseUrl = `${this.config.apiBaseUrl}/categories`;


  /**
   * Retrieves all categories.
   */
  getAll(): Observable<CategoryReadModel[]> {
    return this.http.get<CategoryReadModel[]>(this.baseUrl);
  }


  /**
   * Retrieves a category by id.
   */
  getById(id: number): Observable<CategoryReadModel> {
    return this.http.get<CategoryReadModel>(`${this.baseUrl}/${id}`);
  }


  /**
   * Creates a new category.
   */
  create(payload: CategoryCreateModel): Observable<CategoryReadModel> {
    return this.http.post<CategoryReadModel>(this.baseUrl, payload);
  }


  /**
   * Updates an existing category.
   * Includes RowVersion for optimistic concurrency.
   */
  update(payload: CategoryUpdateModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${payload.categoryId}`, payload);
  }


  /**
   * Deletes a category.
   * Requires RowVersion for concurrency validation.
   */
  delete(payload: CategoryDeleteModel): Observable<void> {
    return this.http.request<void>('delete', `${this.baseUrl}/${payload.categoryId}`, {
      body: payload
    });
  }

}
