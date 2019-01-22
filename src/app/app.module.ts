import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { AddNewListComponent } from './add-new-list/add-new-list.component';
import { TaskComponent } from './task/task.component';
import { DataManagerService } from './data-manager.service';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { NavbarComponent } from './navbar/navbar.component'
import {ApiService} from './api.service'

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    AddNewListComponent,
    TaskComponent,
    ListComponent,
    LoginViewComponent,
    RegisterViewComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataManagerService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
