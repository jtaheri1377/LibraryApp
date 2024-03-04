import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { NotificationService } from "src/app/shared/services/notification.service";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const notif = inject(NotificationService);
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    router.navigate([""]);
    notif.showWarning(
      "برای ورود مجدد باید از حساب کاربری خود خارج شوید",
      "خروج از حساب کاربری"
    );
    // else if (user.type === UserType.contractor) router.navigate(["contractor"]);
    return false;
  } else return true;
};
