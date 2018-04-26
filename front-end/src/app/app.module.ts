import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SinginComponent } from './landing/singin/singin.component';
import { SingupComponent } from './landing/singup/singup.component';
import {FormsModule} from '@angular/forms';

const appRoutes : Routes = [
  {path : 'signup' , component : SingupComponent}
  {path : 'signin' , component : SinginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
