import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExploreRoutingModule } from "./explore-routing.module";
import { ExploreComponent } from "./explore.component";
import { SharedModule } from "src/app/shared/shared.module";
import { BooksListComponent } from "./components/books-list/books-list.component";
import { BookItemComponent } from "./components/book/book.component";

@NgModule({
  declarations: [ExploreComponent, BooksListComponent, BookItemComponent],
  imports: [CommonModule, ExploreRoutingModule, SharedModule],
})
export class ExploreModule {}
