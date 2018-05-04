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


const appRoutes: Routes = [
  {path : '' , component : AppComponent , pathMatch: 'full' },
  {path : 'signup' , component : SignupComponent},
  {path : 'signup/check-email-confirmation' , component:  SignUpCheckConfirmationComponent},
  {path : 'signup/check-email-confirmation/enter-code' , component:  SignUpEnterCodeComponent},
  {path : 'signup/success' , component:  SignUpSuccessComponent},
  {path : 'signin' , component : SigninComponent},
  {path : 'survey' , component : SurveyComponent ,  children : [
      {path : '' , component: MySurveysComponent},
      {path : 'create-survey' , component: CreateSurveyComponent},
      {path : 'take-survey/:id' , component: TakeSurveyComponent },
    ]},
  {path : 'survey/create/success' , component: CreateSurveySuccessfulComponent},
  {path : 'survey/create/failure' , component: CreateSurveyFailureComponent },
  {path : 'survey/submit/success' , component: SubmitSurveySuccessComponent},
  {path : 'survey/submit/failure' , component: SubmitSurveyFailureComponent },
  {path : 'not-found' , component : NotFoundComponent},
  {path : '**' , redirectTo : '/not-found' , pathMatch: 'full' }
]



@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRouting {}
