import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    apiURL = 'http://localhost:9001/auth';
    //apiURL = 'http://apved74862:9000//auth';
    //apiURL = 'http://10.29.66.51:9000//auth';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('current_user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
        let headers = new HttpHeaders();
        headers = headers.set("username", username);
        headers = headers.set("password", password);
        return this.http.get<any>(this.apiURL + '/user/search', { headers:headers }).pipe(
            map((user => {
                localStorage.setItem('current_user', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }),
                catchError(this.handleError)))
    }

    getToken() {
        let user: User = JSON.parse(localStorage.getItem('current_user'));                
        if (user == null)
            return null;
        return user.token;
    }

    isLoggedIn(): boolean {
        let authToken = this.getToken();
        return (authToken !== null && !this.isTokenExpired(authToken)) ? true : false;
    }

    doLogout() {
        localStorage.removeItem('current_user');
    }

    handleError(error: HttpErrorResponse) {alert("=========");
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
            localStorage.removeItem('current_user');
            this.currentUser = null;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
            localStorage.removeItem('current_user');
            this.currentUser = null;
        }
        return throwError(msg);
    }

    isTokenExpired(token: string) {
        try {
            const date = new Date(0);
            const user = JSON.parse(localStorage.getItem('current_user'));
            const decoded = jwt_decode(user.token)
            date.setUTCSeconds(decoded['exp']);
            return date.valueOf() < new Date().valueOf();
        } catch (err) {
            console.log("token expired")
            return false;
        }
    }

}