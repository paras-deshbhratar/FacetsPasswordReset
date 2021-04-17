import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authenticationService.getToken();
        if (authToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            });
        }
        return next.handle(req);
    }
}