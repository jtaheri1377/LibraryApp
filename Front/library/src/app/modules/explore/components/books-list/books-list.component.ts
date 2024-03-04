import { BookService } from "./../../services/book.service";
import { Component } from "@angular/core";
import { Book } from "src/app/core/models/Book.model";
import { SearchService } from "src/app/shared/services/search.service";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.scss"],
})
export class BooksListComponent {
  items = [1, 2, 3334, 3, 3, 3, 3, 3, 3, 3];

  books: Book[] = [];
  constructor(
    private searchService: SearchService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.searchService.searching$.subscribe((res) => this.search(res!));


  }

  search(value: string) {
    this.bookService.findBook(value).subscribe((res) => {
      if (res.ok) {
        this.books = res.body!;
      }
    });
  }

}
