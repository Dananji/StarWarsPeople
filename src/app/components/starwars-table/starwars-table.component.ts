import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {StarwarsTableDataSource, StarwarsTableItem} from './starwars-table-datasource';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-starwars-table',
  templateUrl: './starwars-table.component.html',
  styleUrls: ['./starwars-table.component.css'],
  animations: [
    trigger('detailedExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class StarwarsTableComponent implements OnInit {
  public dataReceived = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: StarwarsTableDataSource;
  expandedCharacter: StarwarsTableItem;
  /* Columns displayed in the table */
  displayedColumns = ['name', 'height', 'mass'];

  constructor(private apiDataService: DataService) {
  }

  ngOnInit() {
    /* Instantiate the dataSource for the data-table */
    this.dataSource = new StarwarsTableDataSource(this.paginator, this.apiDataService);
  }
}
