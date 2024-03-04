import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/core/models/User.model";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class UserService {
  usersUpdate$: BehaviorSubject<null> = new BehaviorSubject<null>(null);
constructor(private http: HttpClient) {}

  getAll(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${environment.ApiEndpoint}user/allUsers`, {
      observe: "response",
    });
  }

  saveUser(user:User): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(
      `${environment.ApiEndpoint}user/save`,
      user,
      {
        observe: "response",
      }
    );
  }
  delete(id:number): Observable<HttpResponse<boolean>> {
    return this.http.delete<boolean>(
      `${environment.ApiEndpoint}user/delete/${id}`,
      {
        observe: "response",
      }
    );
  }
}
