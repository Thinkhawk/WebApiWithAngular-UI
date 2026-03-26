import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CategoryCreateForm } from './category-create.form';
import { CategoryService } from '../../services/category.service';
import { CategoryCreateModel } from '../../models/category-create.model';
import { ValidationProblemDetails } from '../../../../core/models/problem-details.model';

/**
 * Component responsible for creating a new Category.
 */
@Component({
    selector: 'app-category-create',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './category-create.component.html',
    styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {

    /** Typed Reactive Form */
    categoryForm: FormGroup<CategoryCreateForm>;

    /** Server-side validation errors. */
    validationErrors: Record<string, string[]> = {};

    /** General API error. */
    apiError: string | null = null;


    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private router: Router
    ) {

        // attach the validators to the form controls.
        // NOTE: Validators cannot be attached to the typed form interface (CategoryCreateForm)
        //       because the interface only describes types, not runtime behavior.  Validators are runtime behaviour.
        this.categoryForm = this.fb.group({

            name: this.fb.nonNullable.control('', {
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100)
                ]
            }),

            description: this.fb.control<string | null>(null, {
                validators: [
                    Validators.maxLength(4000)
                ]
            })

        });

    }



    /**
     * Submit Handler for the form.
     */
    onSubmit(): void {

        this.validationErrors = {};
        this.apiError = null;

        if (this.categoryForm.invalid) {
            // Mark all controls as touched to trigger validation messages in the UI.
            this.categoryForm.markAllAsTouched();

            // Do not proceed to the API call, if the form is invalid.
            return;
        }

        // Map the form values to the API model.
        const model: CategoryCreateModel = {
            name: this.categoryForm.controls.name.value,
            description: this.categoryForm.controls.description.value
        };


        this.categoryService.create(model).subscribe({

            next: () => {
                // On success, navigate back to the category list component.
                this.router.navigate(['/categories']);
            },

            /**
             * Error handler, if the interceptor for error handling did not exist
             */
            // error: (error) => {
            //    if (error.error?.errors) {
            //        const problem = error.error as ValidationProblemDetails;
            //        this.validationErrors = problem.errors;
            //        return;
            //    }
            //    this.apiError = error.error?.detail ?? 'An Unexpected error occurred calling the API.';
            //}


            /**
             * Error handler, leveraging the error handling interceptor - which offers the AppHttpError object.
             */
            error: (error) => {
                if (error.validationErrors) {
                    this.validationErrors = error.validationErrors;
                    return;
                }
                this.apiError = error.detail;
            }

        });

    }

}
