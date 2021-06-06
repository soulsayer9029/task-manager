import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { request } from 'http';
import { Observable, throwError } from 'rxjs';
import { UserauthService } from './userauth.service';
import{catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

  constructor(private authService:UserauthService) { }
  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<any>{
    request=this.addAuthHeader(request)
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        
        if(error.status===401){
          this.authService.logout()
        }
        return throwError(error)
      })
    )
  }
  addAuthHeader(request:HttpRequest<any>){
    const token=this.authService.getAccessToken()
    if(token){
      return request.clone({
        setHeaders:{
          'auth-token':token
        }
      })
    }
    return request
  }
}
