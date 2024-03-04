import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Book } from "src/app/core/models/Book.model";
import { BookService } from "src/app/modules/explore/services/book.service";
import { NotificationService } from "../../services/notification.service";
import { Observable } from "rxjs";
import { ConvertorService } from "../../services/convertor.service";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-save-book",
  templateUrl: "./save-book.component.html",
  styleUrls: ["./save-book.component.scss"],
})
export class SaveBookComponent {
  bookForm = new FormGroup({
    name: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    subject: new FormControl("", Validators.required),
    language: new FormControl("", Validators.required),
    volumeAmount: new FormControl(0, Validators.required),
    code: new FormControl(""),
  });
  @ViewChild("STTInput", { static: true }) sttInput!: ElementRef<any>;
  boo = false;
  speech!: string;
  subjectInput!: string;
  voice = "";
  isEditMode: boolean = false;
  continueRecord: boolean = false;
  recording: boolean = false;
  atmomentSpeeched = "";
  bookCode:string=""

  constructor(
    private service: BookService,
    private _ngZone: NgZone,
    private convertor: ConvertorService,
    private notif: NotificationService,
    public dialogRef: MatDialogRef<SaveBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save() {
    if (!this.isEditMode) {
      const book: Book = {
        name: this.bookForm.value.name || "",
        author: this.bookForm.value.author || "",
        subject: this.bookForm.value.subject || "",
        language: this.bookForm.value.language || "",
        code: this.bookForm.value.code || "",
        volumeAmount: this.bookForm.value.volumeAmount || 0,
      };

      this.service.saveBook(book).subscribe((res) => {
        if (res.ok)
          this.notif.showSuccess(
            "کتاب مورد نظر با موفقیت افزوده شد",
            "ثبت کتاب"
          );
        this.close();
      });
    }
  }

  getTranscript({ locale = "fa" }: { locale?: string } = {}): Observable<
    string
  > {
    return new Observable((observer: any) => {
      const SpeechRecognition = (window as any)["webkitSpeechRecognition"];
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = this.continueRecord;
      speechRecognition.interimResults = false;
      speechRecognition.lang = locale;
      speechRecognition.onresult = (speechRecognitionEvent: any) => {
        var interim_transcript = "";
        for (
          var i = speechRecognitionEvent.resultIndex;
          i < speechRecognitionEvent.results.length;
          ++i
        ) {
          if (speechRecognitionEvent.results[i].isFinal) {
            this.boo = true;
            this._ngZone.run(() =>
              observer.next(
                speechRecognitionEvent.results[i][0].transcript.trim()
              )
            );
          } else {
            this.boo = false;
            interim_transcript +=
              speechRecognitionEvent.results[i][0].transcript;
            this._ngZone.run(() => observer.next(interim_transcript.trim()));
          }
        }
      };
      speechRecognition.start();

      return () => speechRecognition.abort();
    });
  }
  recognize() {
    this.recording = true;
    this.sttInput.nativeElement.focus();
    // this.continueRecord = !this.continueRecord;
    this.getTranscript().subscribe((transcript: any) => {
      if (transcript !== "" && this.boo) {
        this.atmomentSpeeched = transcript;
        this.voice = this.voice + " " + transcript;
        console.log("voice: ", this.voice);
        console.log("transcript: ", transcript);
        console.log("speech: ", this.speech);
        console.log("sst: ", this.sttInput);

        // this.sttInput.nativeElement.value = this.voice;
        this.addToSTTInput(transcript);
        this.recording = false;
      } else {
        this.speech = transcript;
      }
    });
  }

  generateBookCode() {
    // var subject = this.subjectInput;
    // this.service.generateBookCode.subscribe((res:HttpResponse<string>)=>{

    // })

  }

  addToSTTInput(word: string) {
    const inputElement = this.sttInput.nativeElement;
    const selectionStart = inputElement.selectionStart;
    const selectionEnd = inputElement.selectionEnd;
    const currentValue = inputElement.value;
    const beforeText: string = currentValue
      .substring(0, selectionStart!)
      .trim();
    const afterText: string = currentValue.substring(selectionEnd!).trim();
    const newValue = beforeText + " " + word + " " + afterText;
    inputElement.value = newValue;
  }

  putInFields(value: string) {
    if (value.trim() == "") {
      this.notif.showError("هیچ یک از مشخصات کتاب وارد نشده است", "خطا");
      return;
    }
    const fields = [
      {
        name: "name",
        title: "نام کتاب",
      },
      {
        name: "author",
        title: "نویسنده کتاب",
      },
      {
        name: "subject",
        title: "موضوع کتاب",
      },
      {
        name: "volumeAmount",
        title: "تعداد جلد",
      },
      {
        name: "language",
        title: "زبان کتاب",
      },
    ];

    var result = this.convertor.ToObject(value, fields);
    console.log(result);
    let englishNumberVolume;
    if (result.volumeAmount)
      englishNumberVolume = Number(
        result.volumeAmount.replace(/[۰-۹]/g, function (d: any) {
          return d.charCodeAt(0) - "۰".charCodeAt(0);
        })
      ).toLocaleString("en-US");
    // console.log(englishNumber);

    this.bookForm.patchValue({
      name: result?.name,
      subject: result?.subject,
      author: result?.author,
      language: result?.language,
      volumeAmount: +englishNumberVolume!,
    });
  }
}
