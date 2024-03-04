import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  searching$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  searchValue$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor() {}
}
