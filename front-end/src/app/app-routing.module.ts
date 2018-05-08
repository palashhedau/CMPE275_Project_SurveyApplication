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


const appRoutes: Routes = [
  {path : '' , component : AppComponent , pathMatch: 'full' },
  {path : 'signup' , canActivate: [AuthUnGuardService], component : SignupComponent},
  {path : 'signup/check-email-confirmation' , canActivate: [AuthUnGuardService], component:  SignUpCheckConfirmationComponent},
  {path : 'signup/check-email-confirmation/enter-code' , canActivate: [AuthUnGuardService], component:  SignUpEnterCodeComponent},
  {path : 'signup/success' , canActivate: [AuthUnGuardService], component:  SignUpSuccessComponent},
  {path : 'signin' , canActivate: [AuthUnGuardService], component : SigninComponent},
  {path : 'survey' , canActivate: [AuthGuardService], component : SurveyComponent ,  children : [
      {path : '' , canActivate: [AuthGuardService], component: MySurveysComponent},
      {path : 'view-survey/:id' , component: ViewSurveyComponent},
      {path : 'create-survey' , canActivate: [AuthGuardService], component: CreateSurveyComponent},
      {path : 'edit-survey/:id' , canActivate: [AuthGuardService], component: EditSurveyComponent },
    ]},
  {path : 'survey/take-survey/:id/:code' , component: TakeSurveyComponent },
  {path : 'survey/create/success' , canActivate: [AuthGuardService], component: CreateSurveySuccessfulComponent},
  {path : 'survey/create/failure' , canActivate: [AuthGuardService], component: CreateSurveyFailureComponent },
  {path : 'survey/submit/success' , component: SubmitSurveySuccessComponent},
  {path : 'survey/submit/failure' , component: SubmitSurveyFailureComponent },
  {path : 'survey/invite/:id' , component: SurveyInviteComponent },
  {path : 'survey/stats/:id' , component: SurveyStatsComponent},
  {path : 'not-found' , component : NotFoundComponent},
  {path : '**' , redirectTo : '/not-found' , pathMatch: 'full' }
]

@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRouting {}
