import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { NotificationService } from "src/app/shared/services/notification.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const notif = inject(NotificationService);
  const user = JSON.parse(localStorage.getItem("user")!);
  if (!user) {
    router.navigate(["auth", "login"]);
    notif.showWarning("لطفاً وارد حساب کاربری خود شوید", "ورود به حساب کاربری");
    // else if (user.type === UserType.contractor) router.navigate(["contractor"]);
    return false;
  } else return true;
};
