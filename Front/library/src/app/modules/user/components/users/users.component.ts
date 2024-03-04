import { MatDialog } from "@angular/material/dialog";
import { Component } from "@angular/core";
import { User } from "src/app/core/models/User.model";
import { UserService } from "../../services/user.service";
import { HttpResponse } from "@angular/common/http";
import { SaveUserComponent } from "src/app/shared/components/save-user/save-user.component";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  users: User[] = [];

  constructor(
    private service: UserService,
    private notif: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsersList();
    this.service.usersUpdate$.subscribe(() => {
      this.getUsersList();
    });
  }
  getUsersList() {
    this.service.getAll().subscribe((res: HttpResponse<User[]>) => {
      if (res.ok) {
        this.users = res.body!;
      }
    });
  }
  showUserDialog(user: User) {
    const dialogRef = this.dialog.open(SaveUserComponent, {
      data: { isEditMode: true, user: user },
    });
  }

  showDeleteDialog(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: "آیا می خواهید " + user.fullname + " از لیست کاربران حذف شود؟",
        title: "حذف کاربر",
      },
    });

    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.service
          .delete(user.id!)
          .subscribe((res: HttpResponse<boolean>) => {
            if (res.ok) {
              this.notif.showSuccess("کاربر با موفقیت حذف شد", "حذف کاربر");
              this.service.usersUpdate$.next(null);
            }
          });
      }
    });
  }
}
