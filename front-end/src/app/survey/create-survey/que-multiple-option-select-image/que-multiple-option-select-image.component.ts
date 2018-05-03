import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {SurveyService} from '../../survey-service.service';
import {HelperService} from '../../../helper.service';

@Component({
  selector: 'app-que-multiple-option-select-image',
  templateUrl: './que-multiple-option-select-image.component.html',
  styleUrls: ['./que-multiple-option-select-image.component.css']
})
export class QueMultipleOptionSelectImageComponent implements OnInit {

  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id: string }>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('question') question: string;
  @Input('id') id: string;

  constructor(private helperService: HelperService,
              private surveyService: SurveyService) { }
  public moreOptions: any = [];


  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices(files: any, sequence: number) {
    const _this = this;
    this.helperService.saveToS3(files[0], 'palash', function(location){
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
