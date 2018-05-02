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


const appRoutes: Routes = [
  {path : '' , component : AppComponent , pathMatch: 'full' },
  {path : 'signup' , component : SignupComponent},
  {path : 'signin' , component : SigninComponent},
  {path : 'survey' , component : SurveyComponent ,  children : [
      {path : '' , component: MySurveysComponent},
      {path : 'create-survey' , component: CreateSurveyComponent}
    ]},
  {path : 'survey/create/success' , component: CreateSurveySuccessfulComponent},
  {path : 'survey/create/failure' , component: CreateSurveyFailureComponent },
  {path : 'not-found' , component : NotFoundComponent},
  {path : '**' , redirectTo : '/not-found' , pathMatch: 'full' }
]



@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRouting {}
