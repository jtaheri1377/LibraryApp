import { Router } from "@angular/router";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { map } from "rxjs/internal/operators/map";
import { NotificationService } from "src/app/shared/services/notification.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notif: NotificationService,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((error: any) => {
        return error;
      }),
      catchError((error: HttpErrorResponse) => {
        let result = "";
        switch (error.status) {
          case 401:
            {
              localStorage.clear();
              this.auth.getUser();
              this.router.navigate(["/auth", "login"]);
              result = "لطفا وارد حساب کاربری خود شوید!";
            }
            break;
          case 500:
            result = "خطایی رخ داد!" + error.message;
            break;
          default:
            result = "خطایی رخ داد!" + error.message;
            break;
        }
        console.log(error);
        this.notif.showError(
          result == "" ? error.message : result,
          "متوجه شدم!"
        );
        return throwError(error);
      })
    );
  }
}
