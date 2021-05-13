import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    // moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    li:any; 
    deldata;
    
    lis = [];

    xhr = new XMLHttpRequest();
    
    columns =['Name','Date-of-Birth','Gender','Address','Spouse-Name','Spouse-DOB','No. Child','Company Name','Business Category','Company Address','About Business','Keyword','Experience'];
    
    index =['name','date_of_birth','gender','address','spouse_name','spouse_birth_date','number_of_child','company_name','business_category','address','about_business','keyword','experience'];

    constructor(private httpClient : HttpClient,private router: Router) {}
  
    ngOnInit() {
      this.httpClient.post('http://15.207.46.236/directory/directorylistingV2',null) 
      .subscribe(Response => { 
        this.li=Response;
        // this.lis=this.li.list;
        var res = [];
        for (var x in this.li){
          this.li.hasOwnProperty(x) && res.push(this.li[x])
        }
        this.lis = res[2];
      });

    }
  
    editt(){
      // console.log("asd");
      this.router.navigateByUrl('/forms');
    }

    dellete(id){
      this.deldata = { "id" : id};
      this.httpClient.post('http://15.207.46.236/admin/deleteUser',this.deldata)
        .subscribe(Response => {
      location.reload();
    })
    }

    verifymember(id){
      var x = {"id" : id};
      this.httpClient.post("http://15.207.46.236/admin/verifymember",x)
      .subscribe((Response:any) =>{
        location.reload();
      })
    }
  
  }