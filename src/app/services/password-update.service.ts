import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class PasswordUpdateService {
  apiURL = 'http://localhost:9001';

  private readonly headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8 '});
   httpOptions = {
     headers: this.headers
   };
  constructor(private http: HttpClient) { }

  appPasswordUpdate(appForm: NgForm, urgency: string, dataCenter: string) {
    alert("appPasswordUpdate==");        
    return this.http.get<any>(this.apiURL+`/application/${urgency}/${dataCenter}/${appForm.value.applicationAccountName}/${appForm.value.environment}/${appForm.value.email}`, {headers:this.headers})
    .pipe(catchError(this.handleError))
}

domainPasswordUpdate(domainForm: NgForm, urgency: string, dataCenter: string) {
  alert("domainPasswordUpdate==");    
  return this.http.get<any>(this.apiURL+`/domain/${urgency}/${dataCenter}/${domainForm.value.domainFormAccountName}/${domainForm.value.email}`, {headers:this.headers})
  .pipe(catchError(this.handleError))
}

dbPasswordUpdate(dbForm: NgForm, urgency: string, dataCenter: string) {
  //alert("dbPasswordUpdate==");   
  return this.http.get<any>(this.apiURL+`/database/${urgency}/${dataCenter}/${dbForm.value.databaseAccountName}/${dbForm.value.environment}/${dbForm.value.email}`, {headers:this.headers})
  .pipe(catchError(this.handleError))
}

 private handleError(error: HttpErrorResponse) {   
   return throwError(error.message);
 }

}