import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {HttpService} from 'src/app/services/http.service'
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['student', 'school_ori', 'school_correcting', 'cross_corrector'];
  dataSource:any;
  data:any=[];
  dataAll:any;
  selectedSimpleItem:any;

  studentFilter:string="";
  allSchoolCorrecting:any;
  correctorList:any;
  sch:any;
  cr:any;

  scCrt:any=[];

  filter={
    student_full_name:"",
    school_name:"",
    school_id:"",
  }

  @Output() correctorData = new EventEmitter();
  @ViewChild(MatSort) sort:any;
  @ViewChild(MatPaginator) paginator:any;

  constructor(
    private http:HttpService
  ) { }

  async ngOnInit(){
    await this.getCorrector();
    await this.getCrossCorrector();
    await this.getSchoolList();
    await this.getSchoolCorrecting();
    await this.getStudentData();
  }

  async getStudentData(){
    this.data = await this.http.getStudentTableList();
    this.data = this.data.map((mp:any) => {
      let d= this.allSchoolCorrecting.find((fd:any)=>  fd.school._id == mp.school_origin_id._id)
      return {...mp , 
        otherSchool: this.sch.filter((fl:any) => fl.school._id !==  mp.school_origin_id._id).map((ms:any)=>{return {value:ms.school, label:ms.school.short_name}}),
        correctorList: undefined,
        student_full_name:mp.student_id.last_name+" "+mp.student_id.first_name,
        school_name:mp.school_origin_id.short_name,
      }
    })
    this.restartTable();

  }

  async getSchoolCorrecting(){
    this.allSchoolCorrecting = await this.http.getSchoolCorrectorList();
    this.scCrt = this.allSchoolCorrecting.map((mp:any)=>{ return {value:mp.cross_correctors, label:mp.school.short_name}})
  }

  async getCrossCorrector(){
    this.correctorList = await this.http.getSchoolCorrectorList();
  }

  async getSchoolList(){
    this.sch = await this.http.getSchoolList();
  }

  async getCorrector(){
    this.cr = await this.http.getCorrectrorList();
    console.log(this.cr)
  }

  restartTable(){
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.student_full_name.toLowerCase().indexOf(searchTerms.student_full_name) !== -1
        && data.school_name.toLowerCase().indexOf(searchTerms.school_name) !== -1
        // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;school_name
    }
    return filterFunction;
  }


  changeSchool(event:any, index:number){
    this.data[index].school_correcting_corrector_id = undefined;

    if(event){
      let dt= this.correctorList.filter((fl:any)=> fl.school._id === event._id);
      if(dt.length > 0){
        this.data[index].correctorList = dt[0].cross_correctors.map((mp:any)=>{return {value:mp, label:mp.full_name}});
      }else{
        this.data[index].correctorList = [{value:"", label:""}];
      }
    }
    this.sendData();
  }

  sendData(){
    this.correctorData.emit(this.data)
  }

  countToBeAssign(){
    let d = this.data.filter((fl:any)=> fl.school_correcting_corrector_id && fl.school_correcting_corrector_id._id );
    return d.length;
  }

  filterTable(){
    this.dataSource.filter = JSON.stringify(this.filter);
  }

}
