import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StarwarsTableItem} from '../components/starwars-table/starwars-table-datasource';

@Injectable()
export class DataService {
  private results: [StarwarsTableItem];
  private url = 'https://swapi.co/api/people';

  constructor(private http: HttpClient) {
  }

  getAPIData() {
    return this.http.get(this.url);
  }

}
