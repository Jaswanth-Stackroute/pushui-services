import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IMessage } from './message';
@Injectable({
  providedIn: 'root'
})


export class MessageService {



  private handler = new Subject<IMessage>();


  broadcast( type:any, payload: any ) {
    this.handler.next({ type,payload });
  }

  getMessage(): Observable<IMessage> {
    return this.handler.asObservable();
}
  //  private notallhandler = new Subject<any>();

  //    notall( payload: any) {
  //   this.notallhandler.next({ payload });
  //    }

  // notallSelect(): Observable<any> {
  //   return this.notallhandler.asObservable();
  // }
}
