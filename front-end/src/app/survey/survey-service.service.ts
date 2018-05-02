import {QuestionsAndAnswers} from './create-survey/question.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class SurveyService {

  public type: string;
  public endTime: string;
  public publish: boolean;
  public status: string;
  public category: string;
  public questionList: QuestionsAndAnswers[] = [];
  public questionObject: QuestionsAndAnswers;

  constructor(private http: HttpClient) {}


  addQuestion(question: string, questionType: string) {
    let allowNextQuestion: boolean = true;
    if (this.questionObject != undefined){

      let type: string = this.questionObject.getQuestionType();
      if(!( type === 'Short Answer' || type === 'Datetime' || type === 'Star Rating' || type === 'Yes/No')) {
        console.log("CHoices length " + this.questionObject.getChoices().length)
        if(this.questionObject.getChoices().length > 1 ){
          for (let choice of this.questionObject.getChoices()) {
            if(choice.trim() === ''){
              allowNextQuestion = false;
              break;
            }
          }
        } else {
          allowNextQuestion = false;
        }

      }

      if(allowNextQuestion === true){
        console.log("Allowing next ques and saving curet question")
        this.questionList.push(this.questionObject);
      }
    }

    if(allowNextQuestion === true){
      console.log("NEw Question")
      this.questionObject = new QuestionsAndAnswers(question , questionType);
      return true;
    }else{
      return false;
    }

  }

  addChoice(choice: string , sequence: number) {
    this.questionObject.addChoice(choice, sequence);
  }

  allowCreateSurvey() {
    let allowSave = true;
    if (this.questionObject !== undefined){

      const type: string = this.questionObject.getQuestionType();
      if (!( type === 'Short Answer' || type === 'Datetime' || type === 'Star Rating' || type === 'Yes/No')) {
        if (this.questionObject.getChoices().length > 1 ) {
          for (let choice of this.questionObject.getChoices()) {
            if (choice.trim() === '') {
              allowSave = false;
              break;
            }
          }
        } else {
          allowSave = false;
        }
      }

      if (allowSave === true){
        if (this.questionObject != null){
          this.questionList.push(this.questionObject);
          this.questionObject = null;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  createSurvey(name: string) {
  console.log('Create Question ', this.questionList)
    const requestBody = {
      questionList : this.questionList,
      type: 'TEMP',
      publish : true,
      endTime : '2018-10-09',
      category : 'GENERAL',
      status : 'PUBLISH',
      name: name
    };
    this.questionList = []
    return this.http.post('http://localhost:8081/create-survey' , requestBody);

  }

  getMySurveys() {
    return this.http.get('http://localhost:8081/survey');
  }


}
