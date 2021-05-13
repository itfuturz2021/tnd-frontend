import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name;
  mobile;
  email;
  company_name;
  referred_by;
  li:any; 
  lis=[];

  constructor(private httpClient : HttpClient,private router: Router) {}
  
  ngOnInit() {
  }

  onsub(data) {
    console.log(data);
    console.log(data.name);
    this.httpClient.post('http://15.207.46.236/api/registration',
      data)
      .subscribe(Response => {
        alert('registration successfull!!');
        // this.router.navigateByUrl('/table');
      // console.log(Response);
      location.reload();
      });
  }
}
