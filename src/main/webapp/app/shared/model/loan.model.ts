import { Moment } from 'moment';
import { IBook } from 'app/shared/model/book.model';

export interface ILoan {
    id?: number;
    startDate?: Moment;
    returned?: boolean;
    initialEndDate?: Moment;
    extendedEndDate?: Moment;
    book?: IBook;
}

export class Loan implements ILoan {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public returned?: boolean,
        public initialEndDate?: Moment,
        public extendedEndDate?: Moment,
        public book?: IBook
    ) {
        this.returned = this.returned || false;
    }
}
