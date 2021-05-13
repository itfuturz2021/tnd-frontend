import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html',
//   styleUrls: ['./login.component.scss']
})

export class CategoryComponent implements OnInit{
  
    newsType;
    categoryImage;
    li;
    li_Date;
    selectedFile:File = null;
    uploadform :FormGroup;
    delcat;
    resdata;
    update = false;
    fd = new FormData();

    constructor(private httpClient : HttpClient,private router: Router, private formbuilder : FormBuilder) {}

    onChaa(event){
      this.selectedFile = event.target.files[0];
    this.fd.append('categoryImage',this.selectedFile);
      // this.uploadform.get('categoryImage').setValue(this.selectedFile);
    }

    ngOnInit(){
      this.httpClient.post('http://15.207.46.236/admin/getNewsCategory',null)
    .subscribe((Response:any)=> {
      console.log(Response);
      this.li = Response.Data;
      console.log(this.li);
    });

    this.uploadform = this.formbuilder.group({
      newsType:[''],
      categoryImage:['']
    });
    }

    dellete(id){
      console.log(id);
      this.delcat = { "id" : id};
      this.httpClient.post('http://15.207.46.236/admin/delcategory',this.delcat)
        .subscribe(Response => {
      console.log(Response);
      location.reload();
    })
    }

    edit(id){
      // this.update = true;
      console.log(id);
      var c = {"id" : id};
      this.httpClient.post("http://15.207.46.236/admin/getsinglecategory",c)
      .subscribe((response:any) => {
        this.resdata = response.Data;
        console.log(this.resdata);
        this.newsType = this.resdata[0].newsType;
        this.categoryImage = this.resdata[0].categoryImage;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    onsubmitt()  {
      if(this.update == false){
      // fd.append('categoryImage',this.selectedFile, this.selectedFile.name);
      this.fd.append('newsType',this.uploadform.get('newsType').value);
      // this.fd.append('categoryImage',this.uploadform.get('categoryImage').value);
        this.httpClient.post('http://15.207.46.236/admin/addNewsCategory',this.fd)
      .subscribe(Response => {
        location.reload();
        console.log(Response);
      });
      }
      else {
        console.log("asd");
      }
      
      // this.router.navigateByUrl('/news');
    }
    
}