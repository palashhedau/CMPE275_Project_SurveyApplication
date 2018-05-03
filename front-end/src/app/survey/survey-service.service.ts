import {QuestionsAndAnswers} from './create-survey/question.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {QuestionsSubmitSurvey} from './take-survey/submit-survey-questions.model';

@Injectable()
export class SurveyService {

  public type: string;
  public endTime: string;
  public publish: boolean;
  public status: string;
  public category: string;
  public questionList: QuestionsAndAnswers[] = [];
  public questionObject: QuestionsAndAnswers;


  public questionToSubmitList: QuestionsSubmitSurvey [] = [];


  constructor(private http: HttpClient) {}


  addQuestion(question: string, questionType: string) {
    let allowNextQuestion: boolean = true;
    if (this.questionObject != undefined){
      console.log("Yhaa toh aana hi ni chaiye")
      let type: string = this.questionObject.getQuestionType();
      if(!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No')) {
        console.log("CHoices length " + this.questionObject.getChoices().length)
        if(this.questionObject.getChoices().length > 1 ){
          for (let choice of this.questionObject.getChoices()) {
            if(choice.trim() === ''){
              allowNextQuestion = false;
              break;
            }
          }
        } else if( type === 'Star Rating'){
          console.log("Idhar aayo re")
          if(this.questionObject.getChoices().length === 0){
            allowNextQuestion = false;
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

  addChoice(choice: string , sequence: number , id: string) {
    if ( parseInt(id,10 ) === this.questionList.length) {
      this.questionObject.addChoice(choice , sequence);
    } else {
      this.questionList[parseInt(id,10 )].addChoice(choice, sequence);
    }
    console.log(this.questionList);
  }

  deleteChoice(sequence: number, id: string){
    if ( parseInt(id,10 ) === this.questionList.length) {
      this.questionObject.deleteChoice(sequence)
    } else {
      this.questionList[parseInt(id,10 )].deleteChoice(sequence);
    }
    console.log(this.questionList);
 }

  saveRatingsChoice(choice: string, id: string){
    if (parseInt(id,10 ) === this.questionList.length){
      this.questionObject.setChoice(choice);
    } else {
      this.questionList[parseInt(id, 10)].setChoice(choice);
    }
  }

  allowCreateSurvey() {
    let allowSave = true;
    if (this.questionObject !== undefined){

      const type: string = this.questionObject.getQuestionType();
      if (!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No')) {
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

  createSurvey(name: string, category: string, date: string, status: string) {
    const requestBody = {
      questionList : this.questionList,
      publish : true,
      endTime : date,
      category : category,
      status : status,
      name: name
    };
    this.questionList = []
    return this.http.post('http://localhost:8081/create-survey' , requestBody);
  }

  getMySurveys() {
    return this.http.get('http://localhost:8081/survey');
  }

  deleteQuestion(id: number) {
    this.questionList.splice(id, 1);
  }

  getSurveyById(id: string) {
    return this.http.get('http://localhost:8081/get-survey/' + id);
  }

  /*Submit Survey*/

  setChoice(id: number, choice: string, questionType: string){
      console.log(id + " " + choice + " " + questionType);
      let found: boolean = false;
      if (this.questionToSubmitList.length > 0) {
        for(const question of this.questionToSubmitList){
            if(question.getId() === id){
              /*matlab mil gaya , iska set choice kar*/
              question.setChoice(choice, questionType);
              found = true;
              break;
            }
        }
      }

      if (found === false) {
        this.questionToSubmitList.push(new QuestionsSubmitSurvey(id));
        this.questionToSubmitList[this.questionToSubmitList.length - 1].setChoice(choice, questionType);
      }
      console.log(this.questionToSubmitList);
  }

  submitSurvey(id){
    const requestBody = {
      questionList: this.questionToSubmitList
    };
    return this.http.post('http://localhost:8081/submit-survey/'+ id , requestBody);
  }

}
