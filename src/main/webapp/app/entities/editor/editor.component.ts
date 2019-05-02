import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEditor } from 'app/shared/model/editor.model';
import { AccountService } from 'app/core';
import { EditorService } from './editor.service';

@Component({
    selector: 'jhi-editor',
    templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit, OnDestroy {
    editors: IEditor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected editorService: EditorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.editorService
            .query()
            .pipe(
                filter((res: HttpResponse<IEditor[]>) => res.ok),
                map((res: HttpResponse<IEditor[]>) => res.body)
            )
            .subscribe(
                (res: IEditor[]) => {
                    this.editors = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEditors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEditor) {
        return item.id;
    }

    registerChangeInEditors() {
        this.eventSubscriber = this.eventManager.subscribe('editorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
