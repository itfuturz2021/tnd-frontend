import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { setConstantValue } from 'typescript';

@Component({
  selector: 'app-membership',
  templateUrl: 'membership.component.html',
//   styleUrls: ['./login.component.scss']
})

export class MembershipComponent implements OnInit{
  
    logo;
    memberShipName;
    selectedFile:File = null;
    memberform :FormGroup;
    li;
    delmem;
    update = false;
    newmem;
    resdata;
    fd = new FormData();

    constructor(private httpClient : HttpClient,private router: Router, private formbuilder : FormBuilder) {}

    onChaa(event){
      this.selectedFile = event.target.files[0];
      this.fd.append('logo',this.selectedFile);
      // this.memberform.get('logo').setValue(this.selectedFile);
    }

    ngOnInit(){
      this.httpClient.post('http://15.207.46.236/admin/getAllMemberCategory',null)
    .subscribe((Response:any)=> {
      console.log(Response);
      this.li = Response.Data;
      console.log(this.li);
    });

    this.memberform = this.formbuilder.group({
        memberShipName:[''],
        logo:['']
    });
    }

    delmembership(id){
      console.log(id);
      this.delmem = { "id" : id};
      this.httpClient.post('http://15.207.46.236/admin/delmembership',this.delmem)
        .subscribe(Response => {
      console.log(Response);
      location.reload();
    })
    }

    edit(id){
      this.update = true;
      var v = { "id" : id};
      this.httpClient.post("http://15.207.46.236/admin/getsinglemembership",v)
      .subscribe((Response :any) => {
        console.log(Response);
        this.newmem = Response.Data;
        this.memberShipName = this.newmem[0].memberShipName;
        this.logo = this.newmem[0].logo;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    onsubmitt()  {
      if(this.update == false){
      this.fd.append('memberShipName',this.memberform.get('memberShipName').value);
      // this.fd.append('logo',this.memberform.get('logo').value);
        this.httpClient.post('http://15.207.46.236/admin/addMemberShip',this.fd)
      .subscribe(Response => {
        location.reload();
        console.log(Response);
      });
      }
      else {
          this.fd.append("memberShipId" ,this.newmem[0]._id);
          this.fd.append("memberShipName" , this.memberform.get('memberShipName').value);
        this.httpClient.post("http://15.207.46.236/admin/updateMemberShip",this.fd)
        .subscribe((Response:any) => {
          console.log(Response);
        location.reload();
        })
      }
    }
    
}