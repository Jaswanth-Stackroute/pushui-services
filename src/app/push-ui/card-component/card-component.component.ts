import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBatch } from '../batch';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

 @Input() batch:IBatch;
 private countParticipants:any;
  constructor( private _messageService: MessageService) { }
  ngOnInit() {
    if(this.batch.hasOwnProperty('participant')){
       this.countParticipants=Object.values(this.batch.participant).length;
    }
    else{
      this.countParticipants=0;
    }
  }
}
