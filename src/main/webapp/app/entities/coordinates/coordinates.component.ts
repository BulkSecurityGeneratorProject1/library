import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICoordinates } from 'app/shared/model/coordinates.model';
import { AccountService } from 'app/core';
import { CoordinatesService } from './coordinates.service';

@Component({
    selector: 'jhi-coordinates',
    templateUrl: './coordinates.component.html'
})
export class CoordinatesComponent implements OnInit, OnDestroy {
    coordinates: ICoordinates[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected coordinatesService: CoordinatesService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.coordinatesService
            .query()
            .pipe(
                filter((res: HttpResponse<ICoordinates[]>) => res.ok),
                map((res: HttpResponse<ICoordinates[]>) => res.body)
            )
            .subscribe(
                (res: ICoordinates[]) => {
                    this.coordinates = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCoordinates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICoordinates) {
        return item.id;
    }

    registerChangeInCoordinates() {
        this.eventSubscriber = this.eventManager.subscribe('coordinatesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
