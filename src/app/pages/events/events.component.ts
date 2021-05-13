import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-events',
  templateUrl: 'events.component.html',
//   styleUrls: ['./login.component.scss']
})

export class EventsComponent implements OnInit{
  
    eventOrganiseBy;
    startDate;
    endDate;
    eventName;
    description;
    eventImage;
    startTime;
    endTime;
    faceBook;
    instagram;
    linkedIn;
    twitter;
    whatsApp;
    youTube;
    eventdata;
    evedata;
    eid;
    city;
    li_city;
    update = false;
    fd = new FormData();

  selectedFile:File = null;

  eventform :FormGroup;

  resevedata;
  events:any;

  lis_events = [];

  colu_events = ["Event-Name","Organized By","Start-Date","End-Date"];

  index_events =["eventName","eventOrganiseBy","startDte","endDate"];

    constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) {}

    onChaa(event){
      this.selectedFile = event.target.files[0];
      this.fd.append('eventImage',this.selectedFile);
      // this.eventform.get('eventImage').setValue(this.selectedFile);
    }

    onsubmitt()  {
      if(this.update == false){
      this.fd.append('eventName',this.eventform.get('eventName').value);
      this.fd.append('eventOrganiseBy',this.eventform.get('eventOrganiseBy').value);
      // this.fd.append('eventImage',this.eventform.get('eventImage').value);
      this.fd.append('description',this.eventform.get('description').value);
      this.fd.append('startDate',this.eventform.get('startDate').value);
      this.fd.append('endDate',this.eventform.get('endDate').value);
      this.fd.append('startTime',this.eventform.get('startTime').value);
      this.fd.append('endTime',this.eventform.get('endTime').value);
      this.fd.append('city',this.eventform.get('city').value);
      this.fd.append('faceBook',this.eventform.get('faceBook').value);
      this.fd.append('instagram',this.eventform.get('instagram').value);
      this.fd.append('whatsApp',this.eventform.get('whatsApp').value);
      this.fd.append('linkedIn',this.eventform.get('linkedIn').value);
      this.fd.append('twitter',this.eventform.get('twitter').value);
      this.fd.append('youTube',this.eventform.get('youTube').value);
        this.httpClient.post('http://15.207.46.236/admin/addEvent',this.fd)
      .subscribe(Response => {
        location.reload();
      });
      }
      else{
          this.fd.append("eventId" , this.eid);
          this.fd.append("eventName" , this.eventform.get('eventName').value);
          // this.fd.append("eventImage" , this.fd.get('eventImage'));
          this.fd.append("eventOrganiseBy" , this.eventform.get('eventOrganiseBy').value);
          this.fd.append("description" , this.eventform.get('description').value);
          this.fd.append("startDate" , this.eventform.get('startDate').value);
          this.fd.append("endDate" , this.eventform.get('endDate').value);
          this.fd.append('city',this.eventform.get('city').value);
          this.fd.append("startTime" , this.eventform.get('startTime').value);
          this.fd.append("endTime" , this.eventform.get('endTime').value);
          this.fd.append("faceBook" , this.eventform.get('faceBook').value);
          this.fd.append("instagram"  , this.eventform.get('instagram').value);
          this.fd.append("linkedIn" , this.eventform.get('linkedIn').value);
          this.fd.append("twitter" , this.eventform.get('twitter').value);
          this.fd.append("whatsApp" , this.eventform.get('whatsApp').value);
          this.fd.append("youTube" , this.eventform.get('youTube').value);

        this.httpClient.post("http://15.207.46.236/admin/updateEvent",this.fd)
        .subscribe((Response:any) =>{
        location.reload();
        })
      }
    }

    delevent(id){
      this.eventdata = { "id" : id};
      this.httpClient.post('http://15.207.46.236/admin/delevent',this.eventdata)
        .subscribe(Response => {
      location.reload();
    })
    }

    edit(id){
      this.update = true;
      var c = {"id" : id};
      this.httpClient.post("http://15.207.46.236/admin/getsingleevent",c)
      .subscribe((response:any) => {
        console.log(response);
        this.evedata = response.Data;
        this.eid = this.evedata[0]._id;
        this.eventName = this.evedata[0].eventName;
        this.eventOrganiseBy = this.evedata[0].eventOrganiseBy;
        this.eventImage = this.evedata[0].eventImage;
        this.description = this.evedata[0].description;
        this.startDate = this.evedata[0].startDate;
        this.endDate = this.evedata[0].endDate;
        this.startTime = this.evedata[0].startTime;
        this.endTime = this.evedata[0].endTime;
        this.city = this.evedata[0].city;
        this.faceBook = this.evedata[0].faceBook;
        this.instagram = this.evedata[0].instagram;
        this.whatsApp = this.evedata[0].whatsApp;
        this.linkedIn = this.evedata[0].linkedIn;
        this.twitter = this.evedata[0].twitter;
        this.youTube = this.evedata[0].youTube;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    ngOnInit() {
      this.httpClient.post('http://15.207.46.236/admin/getEvents',null)
        .subscribe(data1 => {
          this.events = data1;
          var res =[];
          for(var x in this.events){
            this.events.hasOwnProperty(x) && res.push(this.events[x])
          }
          this.lis_events = res[1];
        });

        this.httpClient.post("http://15.207.46.236/admin/getallcity",null)
        .subscribe((Response:any) =>{
          this.li_city = Response.Data;
          console.log(Response);
        })
      
        this.eventform = this.formbuilder.group({
          eventName:[''],
          eventImage:[''],
          eventOrganiseBy:[''],
          description:[''],
          startDate:[''],
          endDate:[''],
          startTime:[''],
          endTime:[''],
          city: [''],
          faceBook:[''],
          instagram : [''],
          linkedIn:[''],
          twitter:[''],
          whatsApp:[''],
          youTube:['']
        });
    }
}