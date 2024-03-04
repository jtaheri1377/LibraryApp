import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "src/app/core/models/Book.model";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http: HttpClient) {}
  //

  findBook(value: string): Observable<HttpResponse<Book[]>> {
    var body = { searchValue: value };
    return this.http.post<Book[]>(
      `${environment.ApiEndpoint}Book/search`,
      body,
      {
        observe: "response",
      }
    );
  }

  saveBook(book: Book): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(
      `${environment.ApiEndpoint}Book/save`,
      book,
      {
        observe: "response",
      }
    );
  }
  generateBookCode(subject:string): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(
      `${environment.ApiEndpoint}Book/generateBookCode`,
      subject,
      {
        observe: "response",
      }
    );
  }
}
