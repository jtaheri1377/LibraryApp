import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerService } from "./services/drawer.service";
import { MatDialog } from "@angular/material/dialog";
import { SaveBookComponent } from "src/app/shared/components/save-book/save-book.component";
import { SaveUserComponent } from "src/app/shared/components/save-user/save-user.component";

import { Router } from "@angular/router";
import { SaveSubjectComponent } from "src/app/modules/subject/components/subjects/save-subject/save-subject.component";

@Component({
  selector: "app-site-layout",
  templateUrl: "./site-layout.component.html",
  styleUrls: ["./site-layout.component.scss"],
})
export class SiteLayoutComponent implements OnInit {
  @ViewChild("drawer") drawer: any;
  constructor(
    private service: DrawerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  options = [
    {
      icon: "bi-house-door",
      text: "خانه",
      role: 1,
    },
    {
      icon: "bi-book",
      text: "کتاب",
      role: 2,
    },
    {
      icon: "bi-people",
      text: "لیست کاربران",
      role: 3,
    },
    {
      icon: "bi-person-plus",
      text: "کاربر جدید",
      role: 4,
    },
    {
      icon: "bi-journals",
      text: "لیست موضوعات",
      role: 5,
    },
    {
      icon: "bi-journal-plus",
      text: "موضوع جدید",
      role: 6,
    },
  ];

  ngOnInit(): void {
    this.service.toggle$.subscribe(() => this.drawer.toggle());
  }

  onClickitem(role: number) {
    switch (role) {
      case 1:
        {
          this.router.navigate([""]);
        }
        break;
      case 2:
        {
          this.showBookDialog();
        }
        break;
      case 3:
        {
          this.router.navigate(["user"]);
        }
        break;
      case 4:
        {
          this.showUserDialog();
        }
        break;
      case 5:
        {
          this.router.navigate(["subject"]);
        }
        break;
      case 6:
        {
          this.showJournalDialog();
        }
        break;
    }
  }

  showBookDialog() {
    const dialogRef = this.dialog.open(SaveBookComponent, {
      data: { name: "1", animal: "" },
    });
  }
  showUserDialog() {
    const dialogRef = this.dialog.open(SaveUserComponent, {
      data: { isEditMode: false,  },
    });
  }
  showJournalDialog() {
    const dialogRef = this.dialog.open(SaveSubjectComponent, {
      data: { name: "1", animal: "" },
    });
  }
}
