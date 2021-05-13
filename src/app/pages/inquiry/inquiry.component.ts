import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-inquiry',
    // moduleId: module.id,
    templateUrl: 'inquiry.component.html'
})

export class InquiryComponent implements OnInit{
    li; 
    deldata;
    
    lis = [];

    xhr = new XMLHttpRequest();

    constructor(private httpClient : HttpClient,private router: Router) {}
  
    ngOnInit() {
      this.httpClient.post('http://15.207.46.236/admin/getinquiry',null) 
      .subscribe((Response :any) => { 
        this.li=Response.Data;
        for(var i=0; i < this.li.length; i++){
          if(Response.Data[i].status == false){
            this.lis.push(Response.Data[i]);
          }
        }
        // console.log(this.lis);
      });

    }

    accpet(id){
      var x  = { "id" : id};
      this.httpClient.post('http://15.207.46.236/admin/acceptinquiry',x)
      .subscribe((Response:any) =>{
        console.log(Response);
        location.reload();
      })
    }

  }