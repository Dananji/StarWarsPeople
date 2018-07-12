import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {DataService} from '../../services/data.service';

/* Interface to convert API data */
export interface StarwarsTableItem {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: [string];
  species: [string];
  vehicles: [string];
  starships: [string];
  created: any;
  edited: any;
  url: string;
  skin_color: string;
  eye_color: string;
}

/**
 * Data source for the StarwarsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StarwarsTableDataSource extends DataSource<StarwarsTableItem> {
  data: StarwarsTableItem[];

  constructor(private paginator: MatPaginator, private apiDataService: DataService) {
    super();
    /* Load data from the API into the dataSource */
    this.apiDataService.getAPIData().subscribe(_data => this.data = _data['results']);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StarwarsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StarwarsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

}

