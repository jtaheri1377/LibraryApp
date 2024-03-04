import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { SaveBookComponent } from "./components/save-book/save-book.component";
import { SaveUserComponent } from "./components/save-user/save-user.component";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { EmptyComponent } from "./components/empty/empty.component";

const matModules = [
  MatSidenavModule,
  MatIconModule,
  MatRippleModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    SearchBoxComponent,
    EmptyComponent,
    ConfirmDialogComponent,
    SaveBookComponent,
    SaveUserComponent,
  ],
  imports: [CommonModule, matModules, ReactiveFormsModule, FormsModule],
  exports: [matModules, SaveBookComponent, EmptyComponent, SearchBoxComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class SharedModule {}
