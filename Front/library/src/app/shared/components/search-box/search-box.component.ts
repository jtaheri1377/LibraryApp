import { SearchService } from "./../../services/search.service";
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit {
  @ViewChild("searchInput") searchInput: any;
  @ViewChild("htmlForm") htmlForm: any;
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(""),
  });
  suggestionBox: boolean = false;
  suggestedItems = [
    {
      id: 2,
      text: "نهج البلاغه",
    },
    {
      id: 12,
      text: "قرآن",
    },
    {
      id: 5,
      text: "شیخ بهایی",
    },
    {
      id: 6,
      text: "امیرالمؤمنین",
    },
  ];

  constructor(
    private service: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.searchValue$.subscribe((res) => {
      this.searchForm.get("search")!.setValue(res);
    });
    var thisRoute = (this.route as any)["_routerState"]["snapshot"]["url"];
    if (thisRoute != "/e") {
      this.service.searchValue$.next(null);
    }
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    if (!this.suggestionBox) return;
    this.suggestionBox = false;
  }

  onClickInside() {
    this.suggestionBox = true;
    this.searchInput.nativeElement.focus();
  }

  search() {
    var thisRoute = (this.route as any)["_routerState"]["snapshot"]["url"];
    if (thisRoute != "/e") {
      this.router.navigate(["e"]);
      this.service.searchValue$.next(this.searchForm.value.search);
    }
    this.suggestionBox = false;
    this.service.searching$.next(this.searchForm.value.search);
  }

  searchSuggestedItem(value: string) {
    this.searchForm.get("search")!.setValue(value);
    this.search();
  }
}
