import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import{shareReplay,tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(private webRequestService:WebRequestService,private router:Router) { }

  login(email:string,password:string){
    return this.webRequestService.login(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        this.setSession(res.body.data._id,res.body.token)
        console.log("hi")
      })
    )

  }
  signup(email:string,password:string){
    
    return this.webRequestService.signup(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        
        this.setSession(res.body.data._id,res.body.token)
        console.log("hi")
      })
    )

  }

  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }


  getAccessToken(){
    return localStorage.getItem('token')
  }
  private setSession(userId:string,token:string){
    localStorage.setItem('userId',userId)
    localStorage.setItem('token',token)
  }

  private removeSession() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
   
  }

}
