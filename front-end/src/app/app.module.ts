import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './landing/signup/signup.component';
import {SigninComponent} from './landing/signin/signin.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { SurveyComponent } from './survey/survey.component';
import { NotFoundComponent } from './landing/not-found/not-found.component';
import {AppRouting} from './app-routing.module';

import { QueShortAnswerComponent } from './survey/create-survey/que-short-answer/que-short-answer.component';
import { QueSingleOptionSelectTextComponent } from './survey/create-survey/que-single-option-select-text/que-single-option-select-text.component';
import { QueSingleOptionSelectImageComponent } from './survey/create-survey/que-single-option-select-image/que-single-option-select-image.component';
import { QueMultipleOptionSelectImageComponent } from './survey/create-survey/que-multiple-option-select-image/que-multiple-option-select-image.component';
import { QueMultipleOptionSelectTextComponent } from './survey/create-survey/que-multiple-option-select-text/que-multiple-option-select-text.component';
import { QueDropdownSelectTextComponent } from './survey/create-survey/que-dropdown-select-text/que-dropdown-select-text.component';
import { QueDropdownSelectImageComponent } from './survey/create-survey/que-dropdown-select-image/que-dropdown-select-image.component';
import { QueYesNoComponent } from './survey/create-survey/que-yes-no/que-yes-no.component';
import { QueDatetimeComponent } from './survey/create-survey/que-datetime/que-datetime.component';
import { QueStarRatingQuestionComponent } from './survey/create-survey/que-star-rating-question/que-star-rating-question.component';
import {HttpModule} from '@angular/http';
import {SurveyService} from './survey/create-survey/survey-service.service';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CreateSurveyComponent,
    SurveyComponent,
    NotFoundComponent,
    QueShortAnswerComponent,
    QueSingleOptionSelectTextComponent,
    QueSingleOptionSelectImageComponent,
    QueMultipleOptionSelectImageComponent,
    QueMultipleOptionSelectTextComponent,
    QueDropdownSelectTextComponent,
    QueDropdownSelectImageComponent,
    QueYesNoComponent,
    QueDatetimeComponent,
    QueStarRatingQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpModule,
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
