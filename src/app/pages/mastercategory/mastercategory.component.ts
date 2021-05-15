import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-mastercategory',
  templateUrl: 'mastercategory.component.html',
//   styleUrls: ['./login.component.scss']
})

export class MastercategoryComponent implements OnInit{
  
    li_subcatdata;

    mastercatform :FormGroup;

    constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) {}

    ngOnInit() {
        this.httpClient.post("http://15.207.46.236/admin/getallMasterCategory",null)
        .subscribe((Response:any) =>{
          this.li_subcatdata = Response.Data;
        //   console.log(Response);
        });
      
        this.mastercatform = this.formbuilder.group({
            CategoryName:[''],
        });
    }

    onsubmitt() {
        let data = {
            "categoryName" : this.mastercatform.get('CategoryName').value,
        };

        this.httpClient.post("http://15.207.46.236/admin/addMastercategory",data)
        .subscribe((Response:any) =>{
            // console.log(Response);
            if(Response.Data.length == 1){
                alert("New Category Added");
                location.reload();
            }
        });
    }
}