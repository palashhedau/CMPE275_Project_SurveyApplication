import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';
import {HelperService} from '../../../helper.service';
import {AuthService} from '../../../landing/auth.service';

@Component({
  selector: 'app-que-dropdown-select-image',
  templateUrl: './que-dropdown-select-image.component.html',
  styleUrls: ['./que-dropdown-select-image.component.css']
})
export class QueDropdownSelectImageComponent implements OnInit {

  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id: string }>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('question') question: string;
  @Input('id') id: string;

  constructor(private helperService: HelperService,
              private surveyService: SurveyService,
              private authService : AuthService) { }
  public moreOptions: any = [];


  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices(files: any, sequence: number) {
    const _this = this;
    this.helperService.saveToS3(files[0], this.authService.email, function(location){
      _this.surveyService.addChoice(location, sequence + 2, _this.id);
    });
  }

  addOptions(){
    this.moreOptions.push([this.moreOptions.length, '']);
  }


  deleteOptions(index: number){
    this.moreOptions.splice(index,1);
    this.surveyService.deleteChoice(index+2, this.id);
    //also delete it from S3
    // get url when deleting from service
    this.helperService.deletefromS3('URL-TO-BE-PASSED');
  }



}
