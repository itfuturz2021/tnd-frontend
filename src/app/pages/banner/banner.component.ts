import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-banner',
  templateUrl: 'banner.component.html',
//   styleUrls: ['./login.component.scss']
})

export class BannerComponent implements OnInit{

    title;
    type;
    img_1;
    image;
  lis= ['TOP','BOTTOM','OFFER'];
  fd = new FormData();
  
  selectedFile:File = null;

  bannerform :FormGroup;

  banner:any;
  delbanner;

  lis_banner = [];

  colu_banner = ['Title','Type',"Image"];

  index_banner =["title","type","image"];

    constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) {}

    ngOnInit() {
      this.httpClient.post('http://15.207.46.236/admin/getAllBanner',null)
        .subscribe(data1 => {
          this.banner = data1;
          var res =[];
          for(var x in this.banner){
            this.banner.hasOwnProperty(x) && res.push(this.banner[x])
          }
          this.lis_banner = res[1];
          console.log(this.lis_banner);
        });
      
      this.bannerform = this.formbuilder.group({
        title:[''],
        type:[''],
        image:['']
      });
    }

    onChaa(event){
      this.selectedFile = event.target.files[0];
      this.fd.append('image',this.selectedFile);
      // this.bannerform.get('image').setValue(this.selectedFile);
    }

      saveBanner()  {
      this.fd.append('title',this.bannerform.get('title').value);
      this.fd.append('type',this.bannerform.get('type').value);
      // fd.append('image',this.bannerform.get('image').value);
      this.httpClient.post('http://15.207.46.236/admin/addBanner',this.fd)
      .subscribe(Response => {
            // this.router.navigateByUrl('/dashboard');
        console.log(Response);
        location.reload();
      });
    }

    delban(id){
      console.log(id);
      this.delbanner = { "id" : id};
      this.httpClient.post('http://15.207.46.236/admin/delbanner',this.delbanner)
        .subscribe(Response => {
      console.log(Response);
      location.reload();
    })
    }

}