import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from 'app/shared';
import {
    LibraryComponent,
    LibraryDetailComponent,
    LibraryUpdateComponent,
    LibraryDeletePopupComponent,
    LibraryDeleteDialogComponent,
    libraryRoute,
    libraryPopupRoute
} from './';

const ENTITY_STATES = [...libraryRoute, ...libraryPopupRoute];

@NgModule({
    imports: [LibrarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LibraryComponent,
        LibraryDetailComponent,
        LibraryUpdateComponent,
        LibraryDeleteDialogComponent,
        LibraryDeletePopupComponent
    ],
    entryComponents: [LibraryComponent, LibraryUpdateComponent, LibraryDeleteDialogComponent, LibraryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryLibraryModule {}
