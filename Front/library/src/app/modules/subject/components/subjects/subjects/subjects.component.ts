import { Component } from "@angular/core";
import { SubjectService } from "../../../services/subject.service";
import { BookSubject } from "src/app/core/models/BookSubject.model";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  subjects: BookSubject[] = [];

  constructor(private service: SubjectService) {
    this.dataSource.data = TREE_DATA;
  }

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


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'تاریخ',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'اهلبیت علیهم السلام',
    children: [
      {
        name: 'امام علی',
        children: [{name: 'از ولادت تا امامت'}, {name: 'از امامت تا شهادت'}],
      },
      {
        name: 'حضرت زهرا',
        children: [{name: 'از ولادت تا ..'}, {name: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
