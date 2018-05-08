import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-survey-invite',
  templateUrl: './survey-invite.component.html',
  styleUrls: ['./survey-invite.component.css']
})
export class SurveyInviteComponent implements OnInit {
  public id;
  @ViewChild('email') email: NgModel;
  public message = '' ;
  public invitationType = '';


  constructor(private currentRoute : ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
  }

  inviteToTakeSurvey(){

    this.message = '';
    if(this.email.valid == true && this.invitationType !== ''){
      // call API
      this.surveyService.inviteSurvey(this.email.value, this.id, this.invitationType).subscribe(
        (response: ResponseParam) => {
        this.message = response.message;
        if(response.code ===  200){
          setTimeout(() => {
            this.router.navigate(['/server']);
          }, 4000 );
        }
      },
      (error) => {
          this.message = 'Error occured while inviting ' + this.email.value;
      }
      );
    }else{
      this.message = 'Please enter valid details';
    }
  }

}
