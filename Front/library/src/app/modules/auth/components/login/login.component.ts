import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Login } from "src/app/core/models/Login.model";
import { AuthService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private auth: AuthService,
    private notif: NotificationService,
    private router: Router
  ) {}

  toast() {
    this.notif.showSuccess("به سامانه خوش آمدید", "درود");
  }
  login() {
    const value: Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.auth.login(value).subscribe((res: any) => {
      if (res) {
        this.notif.showSuccess("به سامانه خوش آمدید", "درود");
        this.router.navigate(["home"]);
      }
    });
  }
}
