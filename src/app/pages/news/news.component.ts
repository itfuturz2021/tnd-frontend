import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient ,HttpRequest, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { forEachChild } from 'typescript';
import { from } from 'rxjs';
import * as moment from 'moment';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
})

export class NewsComponent implements OnInit{

  newsType;
  content;
  headline;
  newsImage;
  li ;
  newsaddby;
  id;
  news_Date;
  news:any;
  data;
  new_data;
  lis_news = [];
  newstrend;
  news_id;
  newsvideo;
  newsAudio;
  update = false;
  urls ;
  fd = new FormData();

  selectedFile:File = null;
  newsform :FormGroup;

  constructor(private httpClient : HttpClient, private router: Router,private formbuilder : FormBuilder, private rich : RichTextEditorAllModule) {}
  
  ngOnInit(){
    this.httpClient.post('http://15.207.46.236/admin/getNewsCategory',null)
    .subscribe((Response:any)=> {
      this.li = Response.Data;
      console.log(this.li);
    });
    
      this.newsform = this.formbuilder.group({
        newsType:[''],
        content:[''],
        headline:[''],
        newsImage:Array<string>(),
        newsvideo:[''],
        newsAudio:[''],
        newsaddby:['']
      });
    

    this.httpClient.post('http://15.207.46.236/admin/getAllNews',null)
      .subscribe(data1 => {
        this.news = data1;
        // console.log(this.news);
        var res =[];
        for(var x in this.news){
          this.news.hasOwnProperty(x) && res.push(this.news[x])
        }
        this.lis_news = res[1];
        console.log(this.lis_news);
      });
  }

  // onChaa(event){
  //     console.log(event.target.files.length);
  //     this.selectedFile = event.target.files[0];
  //     this.newsform.get('newsImage').setValue(this.selectedFile);
  // }

  // onChaa(event){
  //     let files = event.target.files;
  //     if (files) {
  //       for (let file of files) {
  //         let reader = new FileReader();
  //         reader.onload = (e: any) => {
  //           this.urls.push(e.target.result);
  //         }
  //         reader.readAsDataURL(file);
  //       }
  //     }
  //     console.log(this.urls);

  //   // console.log(event.target.files.length);
  //   // this.selectedFile = event.target.files[0];
  //   // this.newsform.get('newsImage').setValue(this.selectedFile);
  // }

  onChaa(event){
    // const fd = new FormData();
    let files = event.target.files;
    if (files) {
      for(let file of files){
        this.fd.append('newsImage',file);
      }
    }
  }

  onVideo(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('newsvideo',this.selectedFile);
    // this.newsform.get('newsvideo').setValue(this.selectedFile);
  }

  onAudio(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('newsAudio',this.selectedFile);
    // this.newsform.get('newsAudio').setValue(this.selectedFile);
  }

  dell(id:string){
    this.data = {"id" : id};
    this.httpClient.post('http://15.207.46.236/admin/deletenews',this.data)
    .subscribe(Response => {
      // console.log(Response);
      location.reload();
    });
  }

  edit(id){
    var daata = { "id" : id};
    this.update = true;
    console.log(id);
    this.httpClient.post('http://15.207.46.236/admin/getsinglenews',daata)
    .subscribe((response : any) => {
      console.log(response.Data);
      this.new_data = response.Data;
      this.news_id = this.new_data[0]._id;
      this.headline = this.new_data[0].headline;
      this.content = this.new_data[0].content;
      this.newsType = this.new_data[0].newsType;
      this.newsImage = this.new_data[0].newsImage;
      this.news_Date = this.new_data[0].newsDate;
      this.newstrend = this.new_data[0].trending;
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


  onSubmit()  {
    if(this.update == false){
      console.log("1");
      // const fd = new FormData;
    var x = this.newsform.get('content').value;
      this.fd.append('headline',this.newsform.get('headline').value);
      // this.fd.append('trending', this.newstrend);
      this.fd.append('content',x);
      this.fd.append('newsType',this.newsform.get('newsType').value);
      // this.fd.append('newsImage',this.newsform.get('newsImage').value);
      // this.fd.append('newsvideo',this.newsform.get('newsvideo').value);
      // this.fd.append('newsAudio',this.newsform.get('newsAudio').value);
      this.httpClient.post('http://15.207.46.236/admin/addnews',this.fd)
      .subscribe(Response => {
        console.log(Response);
        location.reload();
      });
    }
    else {
      console.log("2");
         x = {
          "headline" : this.headline,
          "id" : this.news_id,
          "content" : this.content,
          "trending" : this.newstrend,
          "newsType" : this.newsType,
          "newsImage" : this.newsImage
        };
        this.httpClient.post('http://15.207.46.236/admin/updatenews',x)
        .subscribe(Response => {
          console.log(Response);
          location.reload();
        });
    }
    
  }
}