import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { IStudent } from './student';
import { IBatch } from './batch';
@Injectable({
  providedIn: 'root'
})
export class ViewSelectedService {
  private initial :IStudent[] = [];
  private afterclick : IStudent[]=[];
  private firstBatch:IBatch;
  private messsageSource = new BehaviorSubject<IStudent[]>(this.initial); //for initial
  currentdata= this.messsageSource.asObservable();
  private after = new BehaviorSubject<IStudent[]>(this.afterclick); //after selecting student checkbox
  afterdata= this.after.asObservable();
  private initialBatch = new BehaviorSubject<IBatch>(this.firstBatch);
    defaultBatch = this.initialBatch.asObservable();

  constructor() { 
  }
  changeMessage(data: IStudent[]=[])
  {
    this.messsageSource.next(data);
  }
  afterSelected(data:IStudent[]=[])
  {
    this.after.next(data);
  }
  defaultFirstBatch(data:IBatch)
  {
      this.initialBatch.next(data);
  }
}
