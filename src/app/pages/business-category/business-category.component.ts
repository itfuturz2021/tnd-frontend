import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-category',
  templateUrl: 'business-category.component.html',
  styleUrls: ['./business-category.component.css']
})
export class BusinessCategoryComponent implements OnInit {

  selectedFile:File = null;
  businessform :FormGroup;
  li;
  categoryName;
  categoryImage;
  categoryIcon;
  buscat;
  update = false;
  resData;
  bussid;
  dateTime;
  fd =new FormData();


  constructor(private httpClient : HttpClient,private router: Router, private formbuilder : FormBuilder) {}

  ngOnInit(): void {
    this.businessform = this.formbuilder.group({
      categoryName:[''],
      categoryImage:[''],
      categoryIcon:['']
    });

    this.httpClient.post('http://15.207.46.236/admin/businessCategory',null)
    .subscribe((Response:any)=> {
      // console.log(Response);
      this.li = Response.Data;
      // console.log(this.li);
    });
  }

  onChaa(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('categoryImage',this.selectedFile);
    // this.businessform.get('categoryImage').setValue(this.selectedFile);
  }

  onChaaicon(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('categoryIcon',this.selectedFile);
    // this.businessform.get('categoryImage').setValue(this.selectedFile);
  }

  onsubmitt()  {
    if(this.update == false){
      this.fd.append('categoryName',this.businessform.get('categoryName').value);
      // this.fd.append('categoryImage',this.businessform.get('categoryImage').value);
      this.httpClient.post('http://15.207.46.236/admin/addBusinessCategory',this.fd)
      .subscribe(Response => {
      // location.reload();
      console.log(Response);
    });
    }
    else {
        this.fd.append("categoryId" , this.bussid);
        this.fd.append("categoryName" , this.categoryName);
        // "categoryImage" , this.categoryImage;
        this.fd.append("dateTime" , this.dateTime);
        this.httpClient.post("http://15.207.46.236/admin/updateBusinessCategory",this.fd)
        .subscribe((res:any) => {
          // console.log(res);
          location.reload();
        })
    }
  }

  edit(id){
    this.update = true;
    var bid = {"id" : id};
    this.httpClient.post("http://15.207.46.236/admin/getsinglebuscat",bid)
    .subscribe((Response:any) => {
      this.resData = Response.Data;
      this.bussid = this.resData[0]._id;
      this.categoryName = this.resData[0].categoryName;
      this.categoryImage = this.resData[0].categoryImage;
      this.categoryIcon = this.resData[0].categoryIcon;
      this.dateTime = this.resData[0].dateTime;
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delbuscat(id){
    // console.log(id);
    this.buscat = { "id" : id};
    this.httpClient.post('http://15.207.46.236/admin/delbuscategory',this.buscat)
      .subscribe(Response => {
    // console.log(Response);
    location.reload();
  })
  }

}
