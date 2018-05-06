import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {HelperService} from '../../../helper.service';

@Component({
  selector: 'app-que-edit-multiple-option-select-image',
  templateUrl: './que-edit-multiple-option-select-image.component.html',
  styleUrls: ['./que-edit-multiple-option-select-image.component.css']
})
export class QueEditMultipleOptionSelectImageComponent implements OnInit {
  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id: string }>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('question') question: any;
  @Input('id') id: string;
  @Output('deleteOptions') deleteOptionsInEdit = new EventEmitter<{sequence: number , id: string}>();


  constructor(private helperService: HelperService,
              private surveyService: SurveyService) { }
  public moreOptions: any = [];


  ngOnInit() {
    this.moreOptions = this.question.choice;
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices(files: any, sequence: number) {
    console.log("LELELELELELELE")
    const _this = this;
    this.helperService.saveToS3(files[0], 'palash', function(location){
      _this.saveChoice.emit({choice : location, sequence : sequence , id: _this.id});
      _this.moreOptions[sequence]['answers'] = location;
      console.log(_this.moreOptions);
    });
  }

  addOptions(){
    this.moreOptions.push([this.moreOptions.length, '']);
  }


  deleteOptions(index: number){
    console.log("LELELELELELELE 22222222222222222222222")
    this.moreOptions.splice(index,1);
    //this.deleteOptionsInEdit.emit({sequence : index, id: this.id});
    //also delete it from S3
    // get url when deleting from service
    //this.helperService.deletefromS3('URL-TO-BE-PASSED');
  }

}
