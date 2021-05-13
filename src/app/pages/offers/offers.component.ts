import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.component.html',
  styleUrls: ['offers.component.css']
})
export class OffersComponent implements OnInit {

  lis = ['Sports','Religion','Domestic','International','Politics','Entertainment'];
  type;
  id;
  title;
  dateTime;
  bannerImage;
  details;
  businessCategory;
  offer:any;
  lis_offer ;
  bus_category;
  offerExpire;
  userId;
  faceBook;
  instagram;
  linkedIn;
  twitter;
  mail;
  whatsApp;
  x;
  youTube;
  li;
  deldata;
  city;
  new_data;
  offer_id;
  resdata;
  update = false;
  fd = new FormData();
  li_city;

  selectedFile:File = null;
  offerform :FormGroup;

  constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) { }

  onSubmit() {
    if(this.update == false){
      console.log("1");
      this.fd.append('title',this.offerform.get('title').value);
      this.fd.append('businessCategory',this.offerform.get('businessCategory').value);
      // this.fd.append('bannerImage',this.offerform.get('bannerImage').value);
      this.fd.append('details',this.offerform.get('details').value);
      this.fd.append('dateTime',this.offerform.get('dateTime').value);
      this.fd.append('offerExpire',this.offerform.get('offerExpire').value);
      this.fd.append('userId',this.offerform.get('userId').value);
      this.fd.append('city',this.offerform.get('city').value);
      this.fd.append('faceBook',this.offerform.get('faceBook').value);
      this.fd.append('mail',this.offerform.get('mail').value);
      this.fd.append('instagram',this.offerform.get('instagram').value);
      this.fd.append('whatsApp',this.offerform.get('whatsApp').value);
      this.fd.append('linkedIn',this.offerform.get('linkedIn').value);
      this.fd.append('twitter',this.offerform.get('twitter').value);
      this.fd.append('youTube',this.offerform.get('youTube').value);
      console.log(this.fd);
      this.httpClient.post('http://15.207.46.236/admin/offer',this.fd)
        .subscribe(Response => {
          location.reload();
        });
    }
    else {
      var x={
        "id" : this.offer_id,
        "businessCategory" : this.offerform.get('businessCategory').value,
        "title" : this.offerform.get('title').value,
        "bannerImage" : this.fd.get("bannerImage"),
        "details" : this.offerform.get('details').value,
        "dateTime" : this.offerform.get('dateTime').value,
        "offerExpire" : this.offerform.get('offerExpire').value,
        "userId" : this.offerform.get('userId').value,
        "city": this.offerform.get('city').value,
        "faceBook" : this.offerform.get('faceBook').value,
        "mail" : this.offerform.get('mail').value,
        "instagram" : this.offerform.get('instagram').value,
        "whatsApp" : this.offerform.get('whatsApp').value,
        "linkedIn" : this.offerform.get('linkedIn').value,
        "youTube" : this.offerform.get('youTube').value,
      }

    this.httpClient.post('http://15.207.46.236/admin/updateOffer',x)
    .subscribe((response : any) => {
        location.reload();
    });
    }
    
  }

  onChaa(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('bannerImage',this.selectedFile);
    // this.offerform.get('bannerImage').setValue(this.selectedFile);
  }

  dellete(id){
    console.log(id);
    this.deldata = { "id" : id};
    this.httpClient.post('http://15.207.46.236/admin/deleteOffer',this.deldata)
    .subscribe(Response => {
      location.reload();
    })
  }

  edit(id){
    this.update = true;
    var daata = { "id" : id};
    this.httpClient.post('http://15.207.46.236/admin/getsingleoffer',daata)
    .subscribe((response : any) => {
      this.new_data = response.Data;
      this.title = this.new_data[0].title;
      this.dateTime = this.new_data[0].dateTime;
      this.offer_id = this.new_data[0]._id;
      console.log(this.offer_id);
      this.businessCategory = this.new_data[0].businessCategory;
      this.bannerImage = this.new_data[0].bannerImage;
      this.city = this.new_data[0].city;
      this.details = this.new_data[0].details;
      this.offerExpire = this.new_data[0].offerExpire;
      this.userId = this.new_data[0].userId;
      this.faceBook = this.new_data[0].faceBook;
      this.mail = this.new_data[0].mail;
      this.instagram = this.new_data[0].instagram;
      this.whatsApp = this.new_data[0].whatsApp;
      this.linkedIn = this.new_data[0].linkedIn;
      this.twitter = this.new_data[0].twitter;
      this.youTube = this.new_data[0].youTube;
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    this.httpClient.post('http://15.207.46.236/admin/businessCategory',null)
    .subscribe(data => {
      this.bus_category=data['Data'];
    });

    this.httpClient.post("http://15.207.46.236/admin/getallcity",null)
      .subscribe((Response:any) =>{
        this.li_city = Response.Data;
      })
    
      this.offerform = this.formbuilder.group({
        title:[''],
        businessCategory:[''],
        bannerImage:[''],
        details:[''],
        dateTime:[''],
        offerExpire:[''],
        userId:[],
        city:[],
        faceBook:[''],
        mail:[''],
        instagram : [''],
        linkedIn:[''],
        twitter:[''],
        whatsApp:[''],
        youTube:['']
      });
    
      this.httpClient.get('http://15.207.46.236/api/person/') 
      .subscribe(Response => { 
        this.li=Response['Data'][0];
      });

      this.httpClient.post('http://15.207.46.236/admin/getOffer',"5fa64917d805f94e21b84579")
      .subscribe(Response => {
        this.lis_offer = Response["Data"];
      })
  }

}
