import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-epaper',
  templateUrl: 'epaper.component.html',
//   styleUrls: ['./login.component.scss']
})

export class EpaperComponent implements OnInit{

    title;
    image;
    pdfUrl;
  fd = new FormData();
  
  selectedFile:File = null;

  epaperform :FormGroup;

  epaper:any;

  lis_epaper = [];

    constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) {}

    ngOnInit() {
      this.httpClient.post('http://15.207.46.236/admin/getEpaper',null)
        .subscribe(data1 => {
          this.epaper = data1;
        //   console.log(this.epaper);
        //   var res =[];
          this.lis_epaper = this.epaper.Data;
        //   console.log(this.lis_epaper);
        });
      
      this.epaperform = this.formbuilder.group({
        title:[''],
        // image:[''],
        pdfUrl:[''],
      });
    }

    onChaa(event){
      this.selectedFile = event.target.files[0];
      this.fd.append('image',this.selectedFile);
    }

    pdfUpload(event){
        this.selectedFile = event.target.files[0];
      this.fd.append('pdfUrl',this.selectedFile);
    }

    saveEpaper()  {
      this.fd.append('title',this.epaperform.get('title').value);
      this.httpClient.post('http://15.207.46.236/admin/addEpaper',this.fd)
      .subscribe(Response => {
        console.log(Response);
        location.reload();
      });
    }

}