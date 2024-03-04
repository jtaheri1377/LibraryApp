import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubjectService } from "../../../services/subject.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BookSubject } from "src/app/core/models/BookSubject.model";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: "app-save-subject",
  templateUrl: "./save-subject.component.html",
  styleUrls: ["./save-subject.component.scss"],
})
export class SaveSubjectComponent {
  isEditMode: boolean = false;
  subjectForm = new FormGroup({
    code: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    id: new FormControl(),
  });

  constructor(
    private service: SubjectService,
    private notif: NotificationService,
    public dialogRef: MatDialogRef<SaveSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
  }

  close(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.service.generateCode().subscribe((res) => {
        if (res.ok) {
          this.subjectForm.get("code")?.setValue(res.body);
        }
      });
    }, 300);
  }

  save() {
    if (!this.isEditMode) {
      const item: BookSubject = {
        name: this.subjectForm.value.name || "",
        code: this.subjectForm.value.code?.toString() || "",
      };

      this.service.AddSubject(item).subscribe((res) => {
        if (res.ok) this.service.subjectsUpdate$.next(null);
        this.notif.showSuccess("موضوع با موفقیت افزوده شد", "ثبت موضوع");
        this.close();
      });
    }
  }
}
