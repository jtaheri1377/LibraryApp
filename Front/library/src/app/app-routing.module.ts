import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";
import { noAuthGuard } from "./core/guards/no-auth.guard";

const routes: Routes = [
  {
    path: "auth",
     canActivate: [noAuthGuard],
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",

    pathMatch: "full",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "e",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./modules/explore/explore.module").then((m) => m.ExploreModule),
  },
  {
    path: "user",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "home",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "subject",
    canActivate:[authGuard],
    loadChildren: () =>
      import("./modules/subject/subject.module").then((m) => m.SubjectModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
