import { Component, OnInit } from "@angular/core";
import { DrawerService } from "../../services/drawer.service";
import { AuthService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/User.model";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  user: User | null = null;
  userRole: string = "";
  constructor(
    private service: DrawerService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.updateUser$.subscribe((res: User | null) => {
      this.user = res;
      console.log(this.user);
      if (res) {
        this.user = this.auth.getUser();
        if (this.user)
          this.userRole = this.user.type === 0 ? "مدیر کتابخانه" : "کاربر سایت";
        this.isAuthorized = true;
      } else this.isAuthorized = false;
    });

    this.user = this.auth.getUser();
    if (this.user)
      this.userRole = this.user.type === 0 ? "مدیر کتابخانه" : "کاربر سایت";
    this.isAuthorized = this.auth.getUser() ? true : false;
  }

  showHomeIco() {
    if ((this.route as any)["_routerState"]["snapshot"]["url"].length == 1)
      return false;
    else return true;
  }

  toggleDrawer() {
    this.service.toggle$.next();
  }

  logout() {
    var config: MatDialogConfig = {
      data: {
        title: "خروج از حساب کاربری",
        message: "آیا می خواهید از حساب کاربری خود خارج شوید؟",
      },
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) this.auth.logout();
    });
  }
}
