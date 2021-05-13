import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { forEachChild } from 'typescript';
import { from } from 'rxjs';
import * as moment from 'moment';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-featured',
  templateUrl: 'featured.component.html',
})

export class FeaturedComponent implements OnInit{

  news;
  lis_news = [];
  headline;
  newsId;
  selectedFile:File = null;
  feaform :FormGroup;

  constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder, private rich : RichTextEditorAllModule) {}
  
  ngOnInit(){
      this.httpClient.post("http://15.207.46.236/admin/getAllNews",null)
      .subscribe(Response => {
          console.log(Response);
          this.news = Response["Data"];
      })

  }

  onChaa(event){
    this.selectedFile = event.target.files[0];
    this.feaform.get('newsImage').setValue(this.selectedFile);
  }

  featured(newsId){
    console.log(newsId);
    this.httpClient.post('http://15.207.46.236/admin/updateToFeatured',newsId)
    .subscribe(Response => {
      console.log(Response);
      location.reload();
    })
  }


  onSubmit()  {
    const fd = new FormData;
      fd.append('headline',this.feaform.get('headline').value);
      fd.append('content',this.feaform.get('content').value);
      fd.append('newsType',this.feaform.get('newsType').value);
      fd.append('newsImage',this.feaform.get('newsImage').value);
      this.httpClient.post('http://15.207.46.236/admin/addnews',fd)
      .subscribe(Response => {
        location.reload();
      });
  }
}