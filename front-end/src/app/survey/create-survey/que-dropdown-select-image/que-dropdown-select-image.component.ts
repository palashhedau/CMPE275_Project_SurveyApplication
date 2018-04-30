import { Component, OnInit } from '@angular/core';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-que-dropdown-select-image',
  templateUrl: './que-dropdown-select-image.component.html',
  styleUrls: ['./que-dropdown-select-image.component.css']
})
export class QueDropdownSelectImageComponent implements OnInit {

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
  }

  typeMessage() {
    this.surveyService.getMessage('Dropdown select');
  }
}
