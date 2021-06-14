import { Component, OnInit, Input } from '@angular/core';
import {HttpService} from 'src/app/services/http.service'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  @Input("data") data:any;

  dataSource:any;
  displayedColumns = ['schools','students','correction','diff'];
  dataSchool:any;
  dataTable:any;
  students:any;

  constructor(
    private http:HttpService
  ) { }

  async ngOnInit() {
    await this.getStudent();
    await this.getSchoolData();
  }

 

  setData(data:any){
    this.dataTable = this.dataTable.map((mp:any)=>{
      return {...mp, correction:data.filter((fl:any)=> fl.school_origin_id._id == mp.school_id && (fl.school_correcting_corrector_id && fl.school_correcting_corrector_id._id) )}
    })

    console.log(this.dataTable, 'sdasdasd')
    this.restartTable();
  }

  async getStudent(){
    this.students = await this.http.getStudentTableList()
  }

  async getSchoolData(){
    this.dataSchool = await this.http.getSchoolList();
    console.log(this.dataSchool)
    this.dataTable = this.dataSchool.map((mp:any)=>{return{ 
      school:mp.school.short_name, 
      school_id:mp.school._id,
      students: this.students.filter((fl:any)=> fl.school_origin_id._id == mp.school._id ),
      correction:[]
    }})
    this.restartTable();
  }

  restartTable(){
    this.dataSource = new MatTableDataSource(this.dataTable);

  }

}
