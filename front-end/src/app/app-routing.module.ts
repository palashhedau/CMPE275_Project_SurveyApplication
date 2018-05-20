import {NgModule} from '@angular/core';
import {SigninComponent} from './landing/signin/signin.component';
import {SignupComponent} from './landing/signup/signup.component';
import {CreateSurveyComponent} from './survey/create-survey/create-survey.component';
import {NotFoundComponent} from './landing/not-found/not-found.component';
import {Routes , RouterModule} from '@angular/router';
import {SurveyComponent} from './survey/survey.component';
import {AppComponent} from './app.component';
import {CreateSurveySuccessfulComponent} from './survey/create-survey-successful/create-survey-successful.component';
import {CreateSurveyFailureComponent} from './survey/create-survey-failure/create-survey-failure.component';
import {MySurveysComponent} from './survey/my-surveys/my-surveys.component';
import {TakeSurveyComponent} from './survey/take-survey/take-survey.component';
import {SubmitSurveySuccessComponent} from './survey/submit-survey-success/submit-survey-success.component';
import {SubmitSurveyFailureComponent} from './survey/submit-survey-failure/submit-survey-failure.component';
import {SignUpCheckConfirmationComponent} from './landing/sign-up-check-confirmation/sign-up-check-confirmation.component';
import {SignUpEnterCodeComponent} from './landing/sign-up-enter-code/sign-up-enter-code.component';
import {SignUpSuccessComponent} from './landing/sign-up-success/sign-up-success.component';
import {AuthGuardService} from './auth-guard.service';
import {AuthUnGuardService} from './auth-unguard.service';
import {ViewSurveyComponent} from './survey/view-survey/view-survey.component';
import {EditSurveyComponent} from './survey/edit-survey/edit-survey.component';
import {SurveyInviteComponent} from './survey/survey-invite/survey-invite.component';
import {SurveyStatsComponent} from './survey/survey-stats/survey-stats.component';
import {SurveyAttemptedComponent} from './survey/survey-attempted/survey-attempted.component';
import {ViewAttemptedSurveysComponent} from './survey/view-attempted-surveys/view-attempted-surveys.component';
import {TestComponent} from './test/test.component';
import {CanComponentDeactivate, CanDeactivateGuard} from './deactivate-guared.service';
import {SurveyStatsViewSingleResponseComponent} from './survey/survey-stats-view-single-response/survey-stats-view-single-response.component';


const appRoutes: Routes = [
  {path : '' , component : MySurveysComponent , canActivate: [AuthGuardService], pathMatch: 'full' },
  {path : 'signup' , canActivate: [AuthUnGuardService], component : SignupComponent},
  {path : 'signup/check-email-confirmation' , canActivate: [AuthUnGuardService], component:  SignUpCheckConfirmationComponent},
  {path : 'signup/check-email-confirmation/enter-code' , canActivate: [AuthUnGuardService], component:  SignUpEnterCodeComponent},
  {path : 'signup/success' , canActivate: [AuthUnGuardService], component:  SignUpSuccessComponent},
  {path : 'signin' , canActivate: [AuthUnGuardService], component : SigninComponent},
  {path : 'survey' , canActivate: [AuthGuardService], component : SurveyComponent ,  children : [
      {path : '' , canActivate: [AuthGuardService], component: MySurveysComponent},
      {path : 'attempted-survey' , canActivate: [AuthGuardService], component: SurveyAttemptedComponent},
      {path : 'attempted-survey/view/:id/:info-id' , canActivate: [AuthGuardService], component: ViewAttemptedSurveysComponent},
      {path : 'view-survey/:id' , component: ViewSurveyComponent},
      {path : 'create-survey' , canActivate: [AuthGuardService], canDeactivate : [CanDeactivateGuard]  ,  component: CreateSurveyComponent},
      {path : 'edit-survey/:id' , canActivate: [AuthGuardService], canDeactivate : [CanDeactivateGuard]  ,  component: EditSurveyComponent },
    ]},
  {path : 'survey/take-survey/:id/:code' , canDeactivate : [CanDeactivateGuard]  , component: TakeSurveyComponent },
  {path : 'survey/create/success' , canActivate: [AuthGuardService], component: CreateSurveySuccessfulComponent},
  {path : 'survey/create/failure' , canActivate: [AuthGuardService], component: CreateSurveyFailureComponent },
  {path : 'survey/submit/success' , component: SubmitSurveySuccessComponent},
  {path : 'survey/submit/failure' , component: SubmitSurveyFailureComponent },
  {path : 'survey/invite/:id' , canActivate: [AuthGuardService], component: SurveyInviteComponent },
  {path : 'survey/stats/:id' , canActivate: [AuthGuardService], component: SurveyStatsComponent},
  {path : 'survey/stats/:id/:questionid' , canActivate: [AuthGuardService], component: SurveyStatsViewSingleResponseComponent},
  {path : 'not-found' , component : NotFoundComponent},
  {path : 'test' , component : TestComponent },
  {path : '**' , redirectTo : '/not-found' , pathMatch: 'full' }

]

@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRouting {}
