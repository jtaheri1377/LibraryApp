import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BookService } from "src/app/modules/explore/services/book.service";
import { NotificationService } from "../../services/notification.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/core/models/User.model";
import { UserService } from "src/app/modules/user/services/user.service";

@Component({
  selector: "app-save-user",
  templateUrl: "./save-user.component.html",
  styleUrls: ["./save-user.component.scss"],
})
export class SaveUserComponent {
  userForm = new FormGroup({
    fullname: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    type: new FormControl(0, Validators.required),
    id: new FormControl(0),
  });
  isEditMode: boolean = false;
  userType: number = 0;

  constructor(
    private service: UserService,
    private notif: NotificationService,
    public dialogRef: MatDialogRef<SaveUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    // this.userForm.get("fullname")?.setValue(data.user.fullname);
    // this.userForm.get("username")?.setValue(data.user.username);
    // this.userForm.get("password")?.setValue(data.user.password);
    this.userForm.patchValue(data.user);
    // this.userType = 1;
    // this.userForm.patchValue(data.user);

    // this.userForm.get("id")?.patchValue(data.user.id);
    console.log(data.user);
    console.log(this.userForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    let user: User = new User("", "", "", 0, 0);
    if (!this.isEditMode) {
      user = {
        username: this.userForm.value.username || "",
        fullname: this.userForm.value.fullname || "",
        password: this.userForm.value.password || "",
        type: this.userForm.value.type || 1,
      };
    } else {
      // if(this.userForm.value!=undefined&& this.userForm.value.fullname)
      user = this.userForm.value as User;
    }
    this.service.saveUser(user).subscribe((res) => {
      if (res.ok) {
        this.service.usersUpdate$.next(null);
        this.notif.showSuccess(
          "کاربر مورد نظر با موفقیت " + this.isEditMode
            ? "ویرایش شد"
            : "افزوده شد",
          "ثبت کاربر"
        );
        this.close();
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
