import { Component,ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder } from '@angular/forms';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-forms',
  templateUrl: 'forms.component.html',
//   styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit{

  data_2 :any;
  id;
  mobile;
  email;
  ismember =false;
  name;
  img;
  date_of_birth;
  gender;
  address;
  referred_by
  spouse_name;
  spouse_birth_date;
  number_of_child=0;
  company_name;
  company_website;
  business_category;
  company_address;
  about_business;
  memberShipName;
  memberOf;
  faceBook;
  instagram;
  linkedIn;
  twitter;
  whatsApp;
  youTube;
  experience:String;
  lis;
  li;
  li_mem;
  bus_category;
  keyword;
  new_data;
  newid;
  li_list;
  update = false;
  flag =0;

  selectedFile:File = null;
  form1 :FormGroup;
  x:any;
  fd = new FormData();
  
  constructor(private httpClient : HttpClient,private router: Router,private formbuilder : FormBuilder) {}

  ngOnInit() {
    this.form1 = this.formbuilder.group({
      id:[''],
      name:[''],
      mobile:[''],
      email:[''],
      company_name:[''],
      company_website:[''],
      referred_by:[''],
      mem_type:[''],
      img:[''],
      date_of_birth:[''],
      gender:[''],
      ismember:[''],
      address:[''],
      spouse_name:[''],
      spouse_birth_date:[''],
      number_of_child:[''],
      business_category:[''],
      company_address:[''],
      about_business:[''],
      memberOf:[''],
      experience:[''],
      keyword:[''],
      faceBook:[''],
      instagram : [''],
      linkedIn:[''],
      twitter:[''],
      whatsApp:[''],
      youTube:[''],
    });

    // this.httpClient.get('http://15.207.46.236/api/person/') 
    //   .subscribe(Response => { 
    //     this.li=Response['Data'][0];
    //     console.log(this.li);
    //   });

      this.httpClient.post('http://15.207.46.236/admin/getAllMemberCategory',null) 
      .subscribe(Response => { 
        this.li_mem=Response['Data'];
        console.log(this.li_mem);
      });

      this.httpClient.post('http://15.207.46.236/directory/directorylistingV2',null) 
      .subscribe((Response : any) => { 
        // console.log(Response);
        this.lis = Response.Data;
        console.log(this.lis);
      });
    
    this.httpClient.post('http://15.207.46.236/admin/businessCategory',null)
    .subscribe(data => {
      this.bus_category=data['Data'];
      console.log(this.bus_category);
    });
  }

  onChaa(event){
    this.selectedFile = event.target.files[0];
    this.fd.append('img',this.selectedFile);
    // this.form1.get('img').setValue(this.selectedFile);
  }

  edit(id){
    this.update = true;
    console.log("1");
    var daata = { "id" : id};
    this.httpClient.post('http://15.207.46.236/admin/getsingleid',daata)
    .subscribe((response : any) => {
      console.log(response);
      this.new_data = response.Data;
      this.id = this.new_data[0]._id;
      this.name = this.new_data[0].name;
      this.mobile = this.new_data[0].mobile;
      this.email = this.new_data[0].email;
      this.company_name = this.new_data[0].company_name;
      this.referred_by = this.new_data[0].referred_by;
      this.ismember = this.new_data[0].ismember;
      // this.img = this.new_data[0].img;
      console.log(this.new_data[0].img);
      this.gender = this.new_data[0].gender;
      this.date_of_birth = this.new_data[0].date_of_birth;
      this.address = this.new_data[0].address;
      this.spouse_name = this.new_data[0].spouse_name;
      this.spouse_birth_date = this.new_data[0].spouse_birth_date;
      this.number_of_child = this.new_data[0].number_of_child;
      this.business_category = this.new_data[0].business_category;
      this.company_address = this.new_data[0].company_address;
      this.about_business = this.new_data[0].about_business;
      this.memberOf = this.new_data[0].memberOf;
      this.experience = this.new_data[0].experience;
      this.faceBook = this.new_data[0].faceBook;
      this.instagram = this.new_data[0].instagram;
      this.whatsApp = this.new_data[0].whatsApp;
      this.linkedIn = this.new_data[0].linkedIn;
      this.twitter = this.new_data[0].twitter;
      this.youTube = this.new_data[0].youTube;
      this.keyword = this.new_data[0].keyword;
      this.company_website = this.new_data[0].company_website;
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onset(){
    this.ismember = true;
    this.flag = 1;
  }


  onsubb()  {
    if(this.update == true && this.flag == 1){
    
      this.fd.append('id',this.id);
      this.fd.append('name',this.form1.get('name').value);
      this.fd.append('mobile',this.form1.get('mobile').value);
      this.fd.append('email',this.form1.get('email').value);
      this.fd.append('company_name',this.form1.get('company_name').value);
      this.fd.append('referred_by',this.form1.get('referred_by').value);
      this.fd.append('ismember',this.form1.get('ismember').value);
      // this.fd.append('mem_type',this.form1.get('mem_type').value);
      // this.fd.append('img',this.form1.get('img').value);
      this.fd.append('gender',this.form1.get('gender').value);
      this.fd.append('date_of_birth',this.form1.get('date_of_birth').value);
      this.fd.append('address',this.form1.get('address').value);
      this.fd.append('spouse_name',this.form1.get('spouse_name').value);
      this.fd.append('spouse_birth_date',this.form1.get('spouse_birth_date').value);
      this.fd.append('number_of_child',this.form1.get('number_of_child').value);
      this.fd.append('business_category',this.form1.get('business_category').value);
      this.fd.append('company_address',this.form1.get('company_address').value);
      this.fd.append('about_business',this.form1.get('about_business').value);
      this.fd.append('memberOf',this.form1.get('memberOf').value);
      this.fd.append('experience',this.form1.get('experience').value);
      this.fd.append('keyword',this.form1.get('keyword').value);
      this.fd.append('company_website',this.form1.get('company_website').value);
      this.fd.append('faceBook',this.form1.get('faceBook').value);
      this.fd.append('instagram',this.form1.get('instagram').value);
      this.fd.append('whatsApp',this.form1.get('whatsApp').value);
      this.fd.append('linkedIn',this.form1.get('linkedIn').value);
      this.fd.append('twitter',this.form1.get('twitter').value);
      this.fd.append('youTube',this.form1.get('youTube').value);
      this.httpClient.post('http://15.207.46.236/api/registration/updatePersonal',this.fd)
      .subscribe(Response => {
        // this.router.navigateByUrl('/dashboard');
        console.log(Response);
        location.reload();
      });
    }
    else{
      console.log("2");
      this.fd.append('id',this.id);
      this.fd.append('name',this.form1.get('name').value);
      this.fd.append('mobile',this.form1.get('mobile').value);
      this.fd.append('email',this.form1.get('email').value);
      this.fd.append('company_name',this.form1.get('company_name').value);
      this.fd.append('referred_by',this.form1.get('referred_by').value);
      // this.fd.append('ismember',this.form1.get('ismember').value);
      // this.fd.append('mem_type',this.form1.get('mem_type').value);
      // this.fd.append('img',this.form1.get('img').value);
      this.fd.append('gender',this.form1.get('gender').value);
      this.fd.append('date_of_birth',this.form1.get('date_of_birth').value);
      this.fd.append('address',this.form1.get('address').value);
      this.fd.append('spouse_name',this.form1.get('spouse_name').value);
      this.fd.append('spouse_birth_date',this.form1.get('spouse_birth_date').value);
      this.fd.append('number_of_child',this.form1.get('number_of_child').value);
      this.fd.append('business_category',this.form1.get('business_category').value);
      this.fd.append('company_address',this.form1.get('company_address').value);
      this.fd.append('about_business',this.form1.get('about_business').value);
      this.fd.append('memberOf',this.form1.get('memberOf').value);
      this.fd.append('experience',this.form1.get('experience').value);
      this.fd.append('keyword',this.form1.get('keyword').value);
      this.fd.append('company_website',this.form1.get('company_website').value);
      this.fd.append('faceBook',this.form1.get('faceBook').value);
      this.fd.append('instagram',this.form1.get('instagram').value);
      this.fd.append('whatsApp',this.form1.get('whatsApp').value);
      this.fd.append('linkedIn',this.form1.get('linkedIn').value);
      this.fd.append('twitter',this.form1.get('twitter').value);
      this.fd.append('youTube',this.form1.get('youTube').value);
      this.httpClient.post('http://15.207.46.236/api/registration/updatePersonal',this.fd)
      .subscribe(Response => {
        // this.router.navigateByUrl('/dashboard');
        console.log(Response);
        location.reload();
      });
    }
  }
}