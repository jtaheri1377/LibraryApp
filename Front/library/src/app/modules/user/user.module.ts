import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UsersComponent } from "./components/users/users.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [UserComponent, UsersComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
