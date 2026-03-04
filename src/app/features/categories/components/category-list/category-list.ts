import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CategoryService } from '../../services/category.service';
import { CategoryReadModel } from '../../models/category-read.model';
import { AppHttpError } from '../../../../core/models/app-http-error.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {

  /** Inject CategoryService using Angular's inject() API */
  private readonly categoryService = inject(CategoryService);

  /** Holds categories returned from API */
  categories: CategoryReadModel[] = [];

  /** Error message shown in UI */
  errorMessage: string | null = null;


  ngOnInit(): void {
    this.loadCategories();
  }


  /**
   * Loads all Categories from the API.
   */
  loadCategories(): void {

    this.categoryService.getAll().subscribe({

      next: (data) => {
        this.categories = data;
      },

      error: (error: AppHttpError) => {

        if (error.detail) {
          this.errorMessage = error.detail;
        } else {
          this.errorMessage = 'Failed to load categories.';
        }

      }

    });

  }


}
