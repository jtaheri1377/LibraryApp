import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { NotificationService } from "src/app/shared/services/notification.service";

@Injectable()
export class OnlineOrOfflineInterceptor implements HttpInterceptor {
  constructor(private notif: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      this.notif.showWarning(
        "آفلاین هستید، لطفا به اینترنت متصل شوید.",
        "قطع اتصال اینترنت"
      );
      return EMPTY;
    }
    return next.handle(request);
  }
}
