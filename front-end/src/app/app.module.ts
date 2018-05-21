import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { SignupComponent } from './landing/signup/signup.component';
import { SigninComponent} from './landing/signin/signin.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { SurveyComponent } from './survey/survey.component';
import { NotFoundComponent } from './landing/not-found/not-found.component';
import { AppRouting} from './app-routing.module';
import { HeaderComponent } from './header/header.component';

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
import { SurveyService} from './survey/survey-service.service';
import { AuthService} from './landing/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { CreateSurveySuccessfulComponent} from './survey/create-survey-successful/create-survey-successful.component';
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
import { HelperService} from './helper.service';
import { SignUpSuccessComponent } from './landing/sign-up-success/sign-up-success.component';
import { SignUpCheckConfirmationComponent } from './landing/sign-up-check-confirmation/sign-up-check-confirmation.component';
import { SignUpEnterCodeComponent } from './landing/sign-up-enter-code/sign-up-enter-code.component';
import {AuthGuardService} from './auth-guard.service';
import {AuthUnGuardService} from './auth-unguard.service';
import { ViewSurveyComponent } from './survey/view-survey/view-survey.component';
import { EditSurveyComponent } from './survey/edit-survey/edit-survey.component';
import { QueEditShortanswerComponent } from './survey/edit-survey/que-edit-shortanswer/que-edit-shortanswer.component';
import { QueEditDropdownSelectImageComponent } from './survey/edit-survey/que-edit-dropdown-select-image/que-edit-dropdown-select-image.component';
import { QueEditDropdownSelectTextComponent } from './survey/edit-survey/que-edit-dropdown-select-text/que-edit-dropdown-select-text.component';
import { QueEditMultipleOptionSelectTextComponent } from './survey/edit-survey/que-edit-multiple-option-select-text/que-edit-multiple-option-select-text.component';
import { QueEditMultipleOptionSelectImageComponent } from './survey/edit-survey/que-edit-multiple-option-select-image/que-edit-multiple-option-select-image.component';
import { QueEditSingleOptionSelectImageComponent } from './survey/edit-survey/que-edit-single-option-select-image/que-edit-single-option-select-image.component';
import { QueEditSingleOptionSelectTextComponent } from './survey/edit-survey/que-edit-single-option-select-text/que-edit-single-option-select-text.component';
import { QueEditDatetimeComponent } from './survey/edit-survey/que-edit-datetime/que-edit-datetime.component';
import { QueEditStarRatingComponent } from './survey/edit-survey/que-edit-star-rating/que-edit-star-rating.component';
import { QueEditYesOrNoComponent } from './survey/edit-survey/que-edit-yes-or-no/que-edit-yes-or-no.component';
import { SurveyInviteComponent } from './survey/survey-invite/survey-invite.component';
import { SurveyStatsComponent } from './survey/survey-stats/survey-stats.component';
import { SurveyAttemptedComponent } from './survey/survey-attempted/survey-attempted.component';
import { ViewAttemptedSurveysComponent } from './survey/view-attempted-surveys/view-attempted-surveys.component';
import { NeutronRatingModule } from 'neutron-star-rating';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { TestComponent } from './test/test.component';
import {BarChartComponent, DoughnutChartComponent, PieChartComponent} from 'angular-d3-charts';
import {CanDeactivateGuard} from './deactivate-guared.service';
import { SurveyStatsViewSingleResponseComponent } from './survey/survey-stats-view-single-response/survey-stats-view-single-response.component';
import { ChartsModule } from 'ng2-charts';


//Ngx-Charts
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ChartdemoComponent } from './chartdemo/chartdemo.component';

export function authServiceFactory(authService: AuthService): Function {
  return () => authService.checkSession();
}

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
    SubmitSurveyFailureComponent,
    SignUpSuccessComponent,
    SignUpCheckConfirmationComponent,
    SignUpEnterCodeComponent,
    ViewSurveyComponent,
    EditSurveyComponent,
    QueEditShortanswerComponent,
    QueEditDropdownSelectImageComponent,
    QueEditDropdownSelectTextComponent,
    QueEditMultipleOptionSelectTextComponent,
    QueEditMultipleOptionSelectImageComponent,
    QueEditSingleOptionSelectImageComponent,
    QueEditSingleOptionSelectTextComponent,
    QueEditDatetimeComponent,
    QueEditStarRatingComponent,
    QueEditYesOrNoComponent,
    SurveyInviteComponent,
    SurveyStatsComponent,
    SurveyAttemptedComponent,
    ViewAttemptedSurveysComponent,
    HeaderComponent,
    TestComponent,
    DoughnutChartComponent,
    PieChartComponent,
    BarChartComponent,
    SurveyStatsViewSingleResponseComponent,
    ChartdemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpClientModule,
    NgSelectModule,
    NeutronRatingModule,
    SnotifyModule,
    ChartsModule,
    NgxChartsModule
  ],
  providers: [
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: authServiceFactory,
      deps: [AuthService],
      multi: true
    },
    SurveyService,
    AuthService,
    HelperService,
    AuthGuardService,
    AuthUnGuardService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
