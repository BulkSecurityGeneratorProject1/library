import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ILoan } from 'app/shared/model/loan.model';
import { LoanService } from './loan.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book';

@Component({
    selector: 'jhi-loan-update',
    templateUrl: './loan-update.component.html'
})
export class LoanUpdateComponent implements OnInit {
    loan: ILoan;
    isSaving: boolean;

    books: IBook[];
    startDateDp: any;
    initialEndDateDp: any;
    extendedEndDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected loanService: LoanService,
        protected bookService: BookService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loan }) => {
            this.loan = loan;
        });
        this.bookService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBook[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBook[]>) => response.body)
            )
            .subscribe((res: IBook[]) => (this.books = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.loan.id !== undefined) {
            this.subscribeToSaveResponse(this.loanService.update(this.loan));
        } else {
            this.subscribeToSaveResponse(this.loanService.create(this.loan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoan>>) {
        result.subscribe((res: HttpResponse<ILoan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBookById(index: number, item: IBook) {
        return item.id;
    }
}
