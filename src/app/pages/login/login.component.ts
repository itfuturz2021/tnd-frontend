import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  // styleUrls: ['login.component.scss']
})

export class LoginComponent {
  li:any; 
  lis=[];
  succ: any;
  data_1 :any;
  loggedin = false;
  res_data;
  mobile;

  constructor(private httpClient : HttpClient,private router: Router) {}

  onpost(da) {
      this.httpClient.post('http://15.207.46.236/api/login',da)
      .subscribe(responsedata => {
        console.log(responsedata);
      this.data_1=responsedata;
      this.res_data = responsedata["Data"];
      if(this.res_data == 0){
        alert('Enter valid number to Login');
      }
      else{
        alert('Login Successfull!!');
        this.router.navigateByUrl('/dashboard');
        }
    });
  }

}
