/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { CoordinatesDeleteDialogComponent } from 'app/entities/coordinates/coordinates-delete-dialog.component';
import { CoordinatesService } from 'app/entities/coordinates/coordinates.service';

describe('Component Tests', () => {
    describe('Coordinates Management Delete Component', () => {
        let comp: CoordinatesDeleteDialogComponent;
        let fixture: ComponentFixture<CoordinatesDeleteDialogComponent>;
        let service: CoordinatesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CoordinatesDeleteDialogComponent]
            })
                .overrideTemplate(CoordinatesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CoordinatesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoordinatesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});