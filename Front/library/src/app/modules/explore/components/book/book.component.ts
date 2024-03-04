import { AuthService } from "src/app/core/services/auth.service";
import { Book } from "../../../../core/models/Book.model";
import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/core/models/User.model";

@Component({
  selector: "app-book-item",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookItemComponent implements OnInit {
  @Input() item: Book | null = null;
  img: string = "";
  user!: User;
  bookImgPaths: string[] = [
    "./../../../../../assets/images/book-tr.png",
    "./../../../../../assets/images/yellow_book.png",
    "./../../../../../assets/images/pink_book.png",
  ];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.updateUser$.subscribe((res: User | null) => {
      this.user = res!;
      if (res) this.user = this.auth.getUser()!;
    });
    this.user = this.auth.getUser()!;
    this.img = this.getImg();
  }

  getImg(): string {
    const randomIndex = Math.floor(Math.random() * this.bookImgPaths.length);
    return this.bookImgPaths[randomIndex];
  }
}
