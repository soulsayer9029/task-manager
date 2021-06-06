import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/userauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authservice:UserauthService,private router:Router) { }

  ngOnInit(): void {
  }
  signup(email:string,password:string){
    this.authservice.signup(email,password).subscribe((res:HttpResponse<any>)=>{
      this.router.navigate(['/lists'])
    })
  }
}
