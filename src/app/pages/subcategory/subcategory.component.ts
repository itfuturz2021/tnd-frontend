import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-subcategory',
  templateUrl: 'subcategory.component.html',
//   styleUrls: ['./login.component.scss']
})

export class SubcategoryComponent implements OnInit{
  
    li_master;
    li_subcatdata;
    CategoryName;
    MastercategoryId;

    subcatform :FormGroup;

    constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) {}

    ngOnInit() {
        this.httpClient.post("http://15.207.46.236/admin/getallMasterCategory",null)
        .subscribe((Response:any) =>{
          this.li_master = Response.Data;
        //   console.log(Response);
        });

        this.httpClient.post("http://15.207.46.236/admin/getallSubcategory",null)
        .subscribe((Response:any) =>{
          this.li_subcatdata = Response.Data;
        //   console.log(Response);
        });
      
        this.subcatform = this.formbuilder.group({
            CategoryName:[''],
            MastercategoryId:[''],
        });
    }

    onsubmitt() {
        let data = {
            "CategoryName" : this.subcatform.get('CategoryName').value,
            "MastercategoryId" : this.subcatform.get('MastercategoryId').value
        };

        this.httpClient.post("http://15.207.46.236/admin/addsubcategory",data)
        .subscribe((Response:any) =>{
            // console.log(Response);
            if(Response.Data.length == 1){
                alert("New Category Added");
                location.reload();
            }
        });
    }
}