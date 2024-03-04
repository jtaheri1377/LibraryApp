import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  map,
  mergeMap,
  of,
  switchMap,
} from "rxjs";
import { User } from "../models/User.model";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Token } from "@angular/compiler";
import { Login } from "../models/Login.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  updateUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private http: HttpClient, private router: Router) {}

  getCurrent(): Observable<HttpResponse<User>> {
    return this.http
      .get<User>(environment.ApiEndpoint + "user/getCurrent", {
        observe: "response",
      })
      .pipe(
        mergeMap((res) => {
          if (res.ok) {
            this.saveUser(res.body!);
          }
          return of();
        })
      );
  }

  login(item: Login): Observable<any> {
    return this.http
      .post<Token>(`${environment.ApiEndpoint}user/login`, item, {
        observe: "response",
      })
      .pipe(
        switchMap((res: HttpResponse<Token>) => {
          if (res.ok) {
            this.saveToken(res.body!);

            return this.http.get<User>(
              `${environment.ApiEndpoint}user/getCurrent`,
              {
                observe: "response",
              }
            );
          }
          return of();
        }),
        map((res: any) => {
          if (res.ok) {
            this.saveUser(res.body!);
            this.updateUser$.next(this.getUser());
            return of(true);
          }
          return of(false);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.updateUser$.next(null);
    this.router.navigate(["auth"]);
  }

  getUser(): User | null {
    const user: User | null = JSON.parse(localStorage.getItem("user")!);
    if(!user)
    this.updateUser$.next(null);
    return user;
  }

  saveToken(token: Token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  saveUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
