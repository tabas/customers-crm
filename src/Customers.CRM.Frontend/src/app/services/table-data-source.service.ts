import {Observable, merge, BehaviorSubject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SearchUtils} from '../../common/helpers/searchUtils';
import {DataSource} from '@angular/cdk/table';
import {map} from 'rxjs/operators';

export class TableDataSourceService extends DataSource<any> {
    private filterChange = new BehaviorSubject('');
    private filteredDataChange = new BehaviorSubject('');

    constructor(
        private data: any[],
        public displayedColumns: string[],
        private matPaginator: MatPaginator,
        private matSort: MatSort
    ) {
        super();
        this.filteredData = data;
    }

    connect(): Observable<any> {
        const displayDataChanges = [this.matPaginator.page, this.filterChange, this.matSort.sortChange];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this.data.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                const startIndex = this.matPaginator.pageIndex * this.matPaginator.pageSize;
                return data.splice(startIndex, this.matPaginator.pageSize);
            })
        );
    }

    get filteredData(): any {
        return this.filteredDataChange.value;
    }

    set filteredData(value: any) {
        this.filteredDataChange.next(value);
    }

    get filter(): string {
        return this.filterChange.value;
    }

    set filter(filter: string) {
        this.filterChange.next(filter);
    }

    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return SearchUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[] {
        if (!this.matSort.active || this.matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            
            const propName = this.displayedColumns.find(d => d === this.matSort.active);

            [propertyA, propertyB] = [a[`${propName}`], b[`${propName}`]];

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.matSort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect(): void {}
}
