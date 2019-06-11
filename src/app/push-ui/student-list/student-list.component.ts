import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../student.service';
import { IStudent } from '../student';
import { ViewSelectedService } from '../ViewSelected.service';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { IMessage } from '../message';
import { IBatch } from '../batch';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  public students: any = {
    "request": {
      "filters": {
        "userId": []
      }
    }
  };
  _url: string = 'user/v1/search';
  private lstStudent: IStudent[] = [];
  private sltStudent: IStudent[] = [];
  private unsltStudent = [];
  private removedIndex = [];
  private subscription: Subscription;
  constructor(private _studentService: StudentService,
    private _viewSelectedService: ViewSelectedService,
    private messageService: MessageService) { }
    private firstBatch;
  ngOnInit() {
    this._viewSelectedService.defaultBatch
      .subscribe(response => {
        this.firstBatch=response;
        if (response) {
          // console.log("first batch:",this.firstBatch);
          this.startFirstBatch(response);
        }
      });
    this._viewSelectedService.afterdata
      .subscribe(data => { this.lstStudent = data; });
    this.subscription = this.messageService.getMessage().subscribe((payload) => {
     // this.subscribeToApi(payload);
      console.log("payload:",payload.payload);
      if(Object.keys(payload.payload).length!==0)
         this.subscribeToApi(payload);
      else{
         console.log("check first",this.firstBatch);
        // this.sltStudent=null;
        this.viewSelected(payload);
        this.startFirstBatch(this.firstBatch);
      }
    });
  }

  startFirstBatch(data: any) {
    console.log("first batch:", Object.keys(data.participant));
    this.students.request.filters.userId = Object.keys(data.participant);
    this._studentService.getList(this.students, this._url)
      .subscribe(response => {
        this.lstStudent = response.result.response.content;
        // console.log("first students:",response);
      });
  }
  
  // Appending users per Batch to Body for API request
  subscribeToApi(user: IMessage) {
    let userList = [];
    let Body: any = {
      "request": {
        "filters": {
          "userId": []
        }
      }
    };
    let users: any = Object.values(user.payload);
    users.map(x => x.forEach((ele: any) => {
      if (!userList.includes(ele))
        userList.push(ele)
    }));
    Body.request.filters.userId = userList;
    console.log("HttpRequest:",user.payload);
    this._studentService.getList(Body, this._url).subscribe(data => { this.lstStudent = data.result.response.content; this.viewSelected(user); });
  }

  // Changes to StudentList According to different triggers
  viewSelected(data: IMessage) {
    if (data.type === "check") {
      this.sltStudent = this.lstStudent.filter(ele => {
        if (ele.emailVerified != false) {
          ele.isChecked = true;
          return ele;
        }
      });
    }
    else if (data.type === "onlyBatch") {
      this.compareSelection();
    }
    else {
      this.unsltStudent = Object.values(data.type);
      console.log("unSelected:", this.unsltStudent);
      this.sltStudent.forEach((ele, index) => {
        this.unsltStudent.forEach(id => {
          if (id === ele.id) {
            ele.isChecked = false;
            this.removedIndex.push(index);
          }
        })
      });

      this.removedIndex.forEach(i => {
        delete this.sltStudent[i]
      });
      this.sltStudent = this.sltStudent.filter(Boolean);
      this.removedIndex = [];
      this.compareSelection();
    }
    console.log("inside viewSelectedChecked:", this.sltStudent);
    this._viewSelectedService.changeMessage(this.sltStudent);
  }

  //The changed studentList checkBox value is checked with selectedStudents
  compareSelection() {
    this.lstStudent.forEach(ele => {
      this.sltStudent.forEach(x => {
        if (x.id === ele.id)
          ele.isChecked = x.isChecked;
      })
    });
  }


  //Triggered on selecting the studentsList CheckBox
  FieldsChanged(student: IStudent, values: any) {
    if (values.currentTarget.checked) {
      if (this.sltStudent.includes(student) === false) {
        this.sltStudent.push(student);
        student.isChecked = true;
        console.log("sltstudent", this.sltStudent);
        this._viewSelectedService.changeMessage(this.sltStudent);
      }
    }
    else if (!values.currentTarget.checked) {
      student.isChecked = false;
      this.sltStudent.filter((ele, index) => { if (ele.id == student.id) this.sltStudent.splice(index, 1) });
      console.log(this.sltStudent);
      this._viewSelectedService.changeMessage(this.sltStudent);
    }
  }
  // when resetButton is clicked
  resetList() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
