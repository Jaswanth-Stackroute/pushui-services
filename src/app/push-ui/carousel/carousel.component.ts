import { Component, OnInit, HostListener, Input } from "@angular/core";
import { IBatch } from '../batch';
import { IStudent } from '../student';
import { StudentService } from '../student.service';
import { ViewSelectedService } from '../ViewSelected.service';
import { MessageService } from '../message.service';


@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent implements OnInit {

  @Input() ngSwitch: any;
  private lstBatch: IBatch[] = [];
  private selBatches = {};
  private selectedStudents: IStudent[] = [];
  private id: any;
  CAROUSEL_BREAKPOINT1 = 1086;
  CAROUSEL_BREAKPOINT2 = 880;
  CAROUSEL_BREAKPOINT3 = 680;
  CAROUSEL_BREAKPOINT4 = 467;
  carouselDisplayMode = 'five';

  public request: any = {
    "request":
    {
      "filters":
      {
        "createdBy": "6f324db7-32a5-4437-a451-35cf53269aaf",
        "courseId": "do_2127173869113180161668"
      }
    }
  };
  public _url: string = 'course/v1/batch/list';
  constructor(private _studentService: StudentService,
    private _viewSelectedService: ViewSelectedService,
    private _messageService: MessageService) {

  }

  ngOnInit() {
    // service to get batches data
    this._studentService.getList(this.request, this._url)
      .subscribe(data => {
        this.push(data);
      });
    //service to get data from the selected students in student list
    this._viewSelectedService.currentdata
      .subscribe(data => { this.selectedStudents = data; this.selection() });

  }
  //method to sort and store batches data
  push(data: any) {
    this.lstBatch = data.result.response.content;
    this.lstBatch.sort((a, b) => {
      let aLength: number, bLength: number;
      if (a.hasOwnProperty('participant'))
        aLength = Object.keys(a.participant).length;
      else
        aLength = 0;
      if (b.hasOwnProperty('participant'))
        bLength = Object.keys(b.participant).length;
      else
        bLength = 0;

      return aLength - bLength;

    }).reverse();
    this._viewSelectedService.defaultFirstBatch(this.lstBatch[0]);
    this.id=this.lstBatch[0].id;
    this._viewSelectedService.currentdata
      .subscribe(data => { this.selectedStudents = data; this.selection() });
  }

  //method to generate count for selected students for a batch
  selection() {
    this.lstBatch.forEach(ele => ele.count = 0);
    this.selectedStudents.forEach(ele => this.lstBatch.forEach(x => { if (x.participant != null) { Object.keys(x.participant).forEach(y => { if (ele.id === y) x.count++; }) } }));
  }

  // on clicking checkbox in card this function is called
  selectedBatches(batch: IBatch, values: any) {
    if (values.currentTarget.checked && batch.participant != null) {
      this.id = batch.id;
      // console.log(Object.keys(batch.participant));
      this.selBatches[batch.id] = Object.keys(batch.participant);
      batch.isChecked = true;
      // console.log("participents",this.selBatches);
      this._messageService.broadcast("check", this.selBatches);
      //console.log( "selected batch:",this.selBatch);
    }
    else if (!values.currentTarget.checked && batch.participant != null) {
      this.id=this.lstBatch[0].id;
      batch.isChecked = false;
      // if (Object.keys(this.selBatches).length > 1)
      delete this.selBatches[batch.id];
      this._messageService.broadcast(Object.keys(batch.participant), this.selBatches);
      this._viewSelectedService.currentdata
        .subscribe(data => { this.selectedStudents = data; this.selection() });
    }
  }

  //on clicking view selected button this method is called
  showSelected() {
    this._viewSelectedService.afterSelected(this.selectedStudents);
    //console.log(this.temp);
  }

  //on clicking on card this method is called
  displayStudentList(event: any, batch: IBatch) {
    if (event.currentTarget || batch.participant != null) {
      this.id = batch.id;
      let selectedCards = {};
      selectedCards[batch.id] = Object.keys(batch.participant);
      console.log("participants in id:", selectedCards);
      this._messageService.broadcast("onlyBatch", selectedCards);
      selectedCards = {};
      //console.log( "selected batch based on id:",this.selBatches);
    }
  }
  // to get number of students in each batch
  batchStudentCount(batch: IBatch): any {
    if (batch.hasOwnProperty('participant')) {
      return Object.values(batch.participant).length;
    }
    else {
      return 0;
    }
  }

  //spliting the cards based on window size
  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT1 && window.innerWidth >= this.CAROUSEL_BREAKPOINT2) {
      this.carouselDisplayMode = 'four';
    }
    else if (window.innerWidth <= this.CAROUSEL_BREAKPOINT2 && window.innerWidth >= this.CAROUSEL_BREAKPOINT3) {
      this.carouselDisplayMode = 'three';
    }
    else if (window.innerWidth >= this.CAROUSEL_BREAKPOINT4 && window.innerWidth <= this.CAROUSEL_BREAKPOINT3) {
      this.carouselDisplayMode = 'two';
    }
    else if (window.innerWidth <= this.CAROUSEL_BREAKPOINT4) {
      this.carouselDisplayMode = 'one';
    }
    else {
      this.carouselDisplayMode = 'five';
    }
  }
}
