import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: 'success.component.html',
  styleUrls: ['success.component.css']
})
export class SuccessComponent implements OnInit {

  success;
  lis_success;
  selectedFile:File = null;
  successform :FormGroup;
  headline;
  storyContent;
  storyImage;
  faceBook;
  instagram;
  linkedIn;
  twitter;
  whatsApp;
  youTube;
  delsucc;
  ressucc;
  sid;
  update = false;
  fd = new FormData();

  constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.httpClient.post('http://15.207.46.236/admin/getSuccessStory',null)
      .subscribe(data1 => {
        this.success = data1;
        console.log(data1);
        var res =[];
        for(var x in this.success){
          this.success.hasOwnProperty(x) && res.push(this.success[x])
        }
        this.lis_success = res[1];
        console.log(this.lis_success);
      });
    
      this.successform = this.formbuilder.group({
        headline:[''],
        storyContent:[''],
        storyImage:[''],
        faceBook:[''],
        instagram : [''],
        linkedIn:[''],
        twitter:[''],
        whatsApp:[''],
        youTube:['']
      });
  }

  delstory(id){
    console.log(id);
    this.delsucc = { "id" : id};
    this.httpClient.post('http://15.207.46.236/admin/delsuccess',this.delsucc)
      .subscribe(Response => {
    console.log(Response);
    location.reload();
  })
  }

  edit(id){
    this.update = true;
    var eid = {"id" : id};
    this.httpClient.post("http://15.207.46.236/admin/getsinglesuccess",eid)
    .subscribe((Response:any) =>{
      console.log(Response);
      this.ressucc = Response.Data;
      this.sid = this.ressucc[0]._id;
      this.headline = this.ressucc[0].headline;
      this.storyContent = this.ressucc[0].storyContent;
      this.storyImage = this.ressucc[0].storyImage;
      this.faceBook = this.ressucc[0].faceBook;
      this.instagram = this.ressucc[0].instagram;
      this.whatsApp = this.ressucc[0].whatsApp;
      this.linkedIn = this.ressucc[0].linkedIn;
      this.twitter = this.ressucc[0].twitter;
      this.youTube = this.ressucc[0].youTube;
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onChaa(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('storyImage',this.selectedFile);
    // this.successform.get('storyImage').setValue(this.selectedFile);
  }

  onSubmit()  {
    if(this.update == false){
      this.fd.append('headline',this.successform.get('headline').value);
      this.fd.append('storyContent',this.successform.get('storyContent').value);
      // this.fd.append('storyImage',this.successform.get('storyImage').value);
      this.fd.append('faceBook',this.successform.get('faceBook').value);
      this.fd.append('instagram',this.successform.get('instagram').value);
      this.fd.append('whatsApp',this.successform.get('whatsApp').value);
      this.fd.append('linkedIn',this.successform.get('linkedIn').value);
      this.fd.append('twitter',this.successform.get('twitter').value);
      this.fd.append('youTube',this.successform.get('youTube').value);
      this.httpClient.post('http://15.207.46.236/admin/addSuccessStory',this.fd)
      .subscribe(Response => {
        location.reload();
        // this.router.navigateByUrl('/dashboard');
        console.log(Response);
      });
    }
    else{
        this.fd.append("storyId" , this.sid);
        this.fd.append("headline", this.successform.get('headline').value);
        this.fd.append("storyContent", this.successform.get('storyContent').value);
        // "storyImage": this.successform.get('storyImage').value,
        this.fd.append("faceBook", this.successform.get('faceBook').value);
        this.fd.append("instagram" , this.successform.get('instagram').value);
        this.fd.append("linkedIn", this.successform.get('linkedIn').value);
        this.fd.append("twitter", this.successform.get('twitter').value);
        this.fd.append("whatsApp", this.successform.get('whatsApp').value);
        this.fd.append("youTube", this.successform.get('youTube').value);
      
      this.httpClient.post("http://15.207.46.236/admin/updateSuccessStory",this.fd)
      .subscribe((res:any) =>{
        console.log(res);
        location.reload();
      })
    }
  };

}
