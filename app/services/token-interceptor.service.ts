import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router,private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from the auth service
    const accessToken = this.authService.getAccessToken();

    // Clone the request and attach the access token to the Authorization header
    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the authenticated request to the next handler
    return next.handle(authenticatedRequest).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
        // Check for 401 Unauthorized error
        if (error.status === 401) {
          // Handle token refresh using the refresh token
          const refresh = this.authService.refreshToken();

    // Clone the request and attach the access token to the Authorization header
    const updatedRequest = request.clone({
      setHeaders: {
        auth: `${this.authService.getAccessToken()}`
      }
    });
    return next.handle(updatedRequest);
        }
        
        catchError(refreshError => {
          // Handle refresh token error (e.g., redirect to login)
          return throwError(refreshError);
        })
        // For other errors, just pass the error along
        return throwError(error);
      })
    );
  }
}