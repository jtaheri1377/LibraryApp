import { Component } from "@angular/core";
import { SubjectService } from "../../../services/subject.service";
import { BookSubject } from "src/app/core/models/BookSubject.model";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent {
  subjects: BookSubject[] = [];

  constructor(private service: SubjectService) {}

  ngOnInit(): void {
    this.getSubjectList();
    this.service.subjectsUpdate$.subscribe(() => {
      this.getSubjectList();
    });
  }
  getSubjectList() {
    this.service.getAll().subscribe((res) => {
      if (res.ok) {
        this.subjects = res.body!;
      }
    });
  }
}
