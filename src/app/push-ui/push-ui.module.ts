import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { AppPushUiComponent } from '../push-ui/app-push-ui/app-push-ui.component';
import { CardComponentComponent } from '../push-ui/card-component/card-component.component';
import { CarouselComponent } from '../push-ui/carousel/carousel.component';
import { HeaderComponent } from '../push-ui/header/header.component';
import { StudentListComponent } from '../push-ui/student-list/student-list.component';
import { FooterComponent } from '../push-ui/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import 'hammerjs';
import { ApiInterceptor } from './push.interceptor';
@NgModule({
  declarations: [
    AppPushUiComponent,
    CardComponentComponent,
    CarouselComponent,
    HeaderComponent,
    StudentListComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    Ng2CarouselamosModule,
    HttpClientModule,
    Ng2SearchPipeModule,
  ],
  exports:[
    CardComponentComponent,
    CarouselComponent,
    HeaderComponent,
    StudentListComponent,
    FooterComponent,
    AppPushUiComponent,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: []
})
export class PushUiModule { }
