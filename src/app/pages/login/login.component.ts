import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:UserauthService,private router:Router) { }
  showError=false
  ngOnInit(): void {
  }
  login(email:string,password:string){
    this.authservice.login(email,password).subscribe((res:HttpResponse<any>)=>{
      if(res.status===200){
        this.showError=false
        this.router.navigate(['/lists'])
      }else{
        this.showError=true
      }
    })
  }
}
