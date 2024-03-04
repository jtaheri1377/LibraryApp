import { Injectable } from "@angular/core";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class ConvertorService {
  private fields: InputField[] = [];

  constructor() {}

 private _findIndexes(value: string) {
    let indexes: any = [];
    this.fields.forEach((item) => {
      if (value.includes(item.title)) indexes.push(value.indexOf(item.title));
    });
    return _.sortBy(indexes);
  }

 private _recognizeField(value: string, indexes: number[]) {
    let output: OutputField[] = [];
    indexes.forEach((item: any, index) => {
      var slice = value.substring(indexes[index], indexes[index + 1]);
      this.fields.forEach((item) => {
        if (slice.includes(item.title)) {
          var field = {
            name: item.name,
            text: slice.substring(item.title.length, slice.length).trim(),
          };
          output.push(field);
        }
      });
    });
    return output;
  }

 private _makeObject(items: OutputField[]) {
    let result: any = {};
    items.forEach((item) => {
      result[item.name] = item.text;
    });
    return result;
  }

  ToObject(value: string, fields: InputField[]) {
    this.fields = fields;
    var indexes = this._findIndexes(value);
    var resultfields = this._recognizeField(value, indexes);
    var output = this._makeObject(resultfields);
    return output;
  }
}

interface InputField {
  name: string;
  title: string;
}

interface OutputField {
  name: string;
  text: string;
}
