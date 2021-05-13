import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-notify',
  templateUrl: 'notify.component.html',
//   styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  selectedFile:File = null;
  notifyform :FormGroup;
  li;
  Title;
  message;
  dateTime;
  fd =new FormData();


  constructor(private httpClient : HttpClient,private router: Router, private formbuilder : FormBuilder) {}

  ngOnInit(): void {
  }

  onsubmitt(){
    var data = {
      "title" : "New update available, please update your application"
    };
      // this.fd.append('Title',this.notifyform.get('Title').value);
      // this.fd.append('message',this.notifyform.get('message').value);
      // this.fd.append('categoryImage',this.notifyform.get('categoryImage').value);
      this.httpClient.post('http://15.207.46.236/admin/notifyall',data)
      .subscribe(Response => {
      location.reload();
      // console.log(Response);
      });
    }

}