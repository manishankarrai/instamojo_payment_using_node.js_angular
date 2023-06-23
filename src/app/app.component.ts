import { Component } from '@angular/core';
import { TestService } from './service/test.service';
import { Responsedata, User } from './models/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';
   message: any  ;
   res_data: any;
   alluser: any;
   payment = new FormGroup({
      purpose: new FormControl(''),
      amount: new FormControl('')
   });
  constructor(private api_: TestService) {
    
  }
  reqpayment(){
   let senddata = this.payment.value ;
    console.log(senddata);

    this.api_.getpayment(senddata).subscribe((data:any)=>{
        window.location.href = data.link;
    });


  }

  getname(){
    console.log("req.send for data get name");
   this.api_.getname_api().subscribe((data: any)=>{
    console.log("getname api data back ",data);
    this.message =  data.message ;
    this.res_data = data.data ;
   });
  }
  postdata() {
    console.log("post req send to backend  for post name");
     this.api_.postname_api({name: "pankaj " , age: "32"}).subscribe((data: any)=>{
      console.log(data);
      this.message =  data.message ;
       this.res_data = data.data ;
     });
  }
  postdata2() {
    console.log("post req send to backend  for post name");
     this.api_.postname_api({name: "dinesh " , age: "45"}).subscribe((data:any)=>{
      console.log(data);
      this.message =  data.message ;
    this.res_data = data.data ;
     });
  }
  getalluser(){
    console.log("req goes for get all user") ;
    this.api_.getalluserdata().subscribe((data: any)=>{
      console.log("all user data come form backend");
      console.log(data.message);
      console.log(data.data);
      this.message =  data.message ;
    this.res_data = '' ;
    this.alluser = data.data ;

    });
  }
  reset() {
    this.alluser = null;
    this.message = null;
    this.res_data = null;

    this.api_.resetall().subscribe((data: any)=>{
      if(data.value == true) {
        this.message = data.message ;
      }
    });
  }
}
