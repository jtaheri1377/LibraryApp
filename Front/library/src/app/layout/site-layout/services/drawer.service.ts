import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DrawerService {
  toggle$: Subject<void> = new Subject<void>;
  // toggle$: Subject<void> = new Subject<void>();

  constructor() {}
}
