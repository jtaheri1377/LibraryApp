import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SubjectRoutingModule } from "./subject-routing.module";
import { SubjectComponent } from "./subject.component";
import { MatTreeModule } from "@angular/material/tree";
import { SubjectsComponent } from "./components/subjects/subjects/subjects.component";
import { SaveSubjectComponent } from "./components/subjects/save-subject/save-subject.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [SubjectComponent, SubjectsComponent, SaveSubjectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SubjectRoutingModule,
    SharedModule,
    MatTreeModule
  ],
})
export class SubjectModule {}
