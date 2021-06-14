import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  @ViewChild("school") school:any;

  sendData:any;
  constructor() { }

  ngOnInit(): void {
  }

  setData(data:any){
    this.school.setData(data);
  }

}
