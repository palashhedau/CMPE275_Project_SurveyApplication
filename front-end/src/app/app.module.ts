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
import {SurveyService} from './survey/survey-service.service';
import {AuthService} from './landing/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {CreateSurveySuccessfulComponent} from './survey/create-survey-successful/create-survey-successful.component';
import { CreateSurveyFailureComponent } from './survey/create-survey-failure/create-survey-failure.component';
import { MySurveysComponent } from './survey/my-surveys/my-surveys.component';
import { TakeSurveyComponent } from './survey/take-survey/take-survey.component';
import { SingleOptionTextComponent } from './survey/take-survey/single-option-text/single-option-text.component';
import { SingleOptionImageComponent } from './survey/take-survey/single-option-image/single-option-image.component';
import { MultipleOptionImageComponent } from './survey/take-survey/multiple-option-image/multiple-option-image.component';
import { MultipleOptionTextComponent } from './survey/take-survey/multiple-option-text/multiple-option-text.component';
import { DropdownTextComponent } from './survey/take-survey/dropdown-text/dropdown-text.component';
import { DropdownImageComponent } from './survey/take-survey/dropdown-image/dropdown-image.component';
import { DatetimeComponent } from './survey/take-survey/datetime/datetime.component';
import { ShortanswersComponent } from './survey/take-survey/shortanswers/shortanswers.component';
import { RatingsComponent } from './survey/take-survey/ratings/ratings.component';
import { YesnoComponent } from './survey/take-survey/yesno/yesno.component';
import { SurveyAccessDeniedComponent } from './survey/survey-access-denied/survey-access-denied.component';
import { SubmitSurveySuccessComponent } from './survey/submit-survey-success/submit-survey-success.component';
import { SubmitSurveyFailureComponent } from './survey/submit-survey-failure/submit-survey-failure.component';
import {HelperService} from './helper.service';




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
    QueStarRatingQuestionComponent,
    CreateSurveySuccessfulComponent,
    CreateSurveyFailureComponent,
    MySurveysComponent,
    TakeSurveyComponent,
    SingleOptionTextComponent,
    SingleOptionImageComponent,
    MultipleOptionImageComponent,
    MultipleOptionTextComponent,
    DropdownTextComponent,
    DropdownImageComponent,
    DatetimeComponent,
    ShortanswersComponent,
    RatingsComponent,
    YesnoComponent,
    SurveyAccessDeniedComponent,
    SubmitSurveySuccessComponent,
    SubmitSurveyFailureComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpClientModule,
  ],
  providers: [SurveyService, AuthService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
