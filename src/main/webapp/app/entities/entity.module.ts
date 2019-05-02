import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'library',
                loadChildren: './library/library.module#LibraryLibraryModule'
            },
            {
                path: 'book',
                loadChildren: './book/book.module#LibraryBookModule'
            },
            {
                path: 'category',
                loadChildren: './category/category.module#LibraryCategoryModule'
            },
            {
                path: 'author',
                loadChildren: './author/author.module#LibraryAuthorModule'
            },
            {
                path: 'coordinates',
                loadChildren: './coordinates/coordinates.module#LibraryCoordinatesModule'
            },
            {
                path: 'editor',
                loadChildren: './editor/editor.module#LibraryEditorModule'
            },
            {
                path: 'loan',
                loadChildren: './loan/loan.module#LibraryLoanModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEntityModule {}
