import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookSubject } from "src/app/core/models/BookSubject.model";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<HttpResponse<BookSubject[]>> {
    return this.http.get<BookSubject[]>(
      `${environment.ApiEndpoint}Book/allSubjects`,
      {
        observe: "response",
      }
    );
  }

  generateCode(): Observable<HttpResponse<string>> {
    return this.http.get<string>(
      `${environment.ApiEndpoint}Book/newSubject`,
      {
        observe: "response",
      }
    );
  }

  AddSubject(subject: BookSubject): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(
      `${environment.ApiEndpoint}Book/addSubject`,
      subject,
      {
        observe: "response",
      }
    );
  }
}
