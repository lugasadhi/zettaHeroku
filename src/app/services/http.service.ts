import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http:HttpClient,
  ) { }

  httpGet(url:string){
    return new Promise((resolve)=>{
      this.http.get(url)
      .subscribe(
        (resp:any)=>{resolve(resp)}
      )
    });
  }


  getSchoolList(){
    return this.httpGet("./assets/json/school-list.json")
  }
  getCorrectrorList(){
    return this.httpGet("./assets/json/corrector-list.json")
  }
  getSchoolCorrectorList(){
    return this.httpGet("./assets/json/school-corrector-list.json")
  }
  getSchoolTableList(){
    return this.httpGet("./assets/json/school-table-list.json")
  }
  getStudentTableList(){
    return this.httpGet("./assets/json/students-table-list.json")
  }
}
