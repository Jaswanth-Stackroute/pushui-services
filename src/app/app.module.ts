import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {PushUiModule} from './push-ui/push-ui.module';


@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    PushUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
