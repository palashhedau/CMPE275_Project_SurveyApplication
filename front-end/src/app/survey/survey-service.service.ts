import {QuestionsAndAnswers} from './create-survey/question.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  public id: number;

  public questionToSubmitList: QuestionsSubmitSurvey [] = [];


  constructor(private http: HttpClient) {}

  /* Create Survey */

  addQuestion(question: string, questionType: string, name: string, category: string, date: string) {
    let allowNextQuestion: boolean = true;
    if (this.questionObject != undefined){
      let type: string = this.questionObject.getQuestionType();
      if(!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No')) {
        if(this.questionObject.getChoices().length > 1 ){
          for (let choice of this.questionObject.getChoices()) {
            if(choice.trim() === ''){
              allowNextQuestion = false;
              break;
            }
          }
        } else if( type === 'Star Rating'){
          if(this.questionObject.getChoices().length === 0){
            allowNextQuestion = false;
          }
        } else {
          allowNextQuestion = false;
        }

      }

      if ( allowNextQuestion === true) {
        this.questionList.push(this.questionObject);
        // save the questionlist on the server
        const requestBody = {
          questionList : this.questionList,
          publish : true,
          endTime : date,
          category : category,
          status : 'Unpublished',
          name: name,
          id: this.id
        };
        //this.questionList = [] - not making this null
        const _this = this;
        this.http.post('http://localhost:8081/create-survey' ,
          requestBody,
          {headers: new HttpHeaders().append('Content-Type', 'application/json'),
            withCredentials: true}).subscribe(
          (response) => {
            _this.id = response.id;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

    if(allowNextQuestion === true){
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
  }

  deleteChoice(sequence: number, id: string){
    if ( parseInt(id,10 ) === this.questionList.length) {
      this.questionObject.deleteChoice(sequence)
    } else {
      this.questionList[parseInt(id,10 )].deleteChoice(sequence);
    }
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
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  resetVariables(){
    this.questionObject = null;
    this.id = 0;
  }

  createSurvey(name: string, category: string, date: string, status: string) {

    const requestBody = {
      questionList : this.questionList,
      publish : true,
      endTime : date,
      category : category,
      status : status,
      name: name,
      id: this.id
    };
    console.log("LE YE ", this.id)
    return this.http.post('http://localhost:8081/create-survey' ,
      requestBody,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  getMySurveys() {
    return this.http.get('http://localhost:8081/survey',
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  deleteQuestion(id: number) {
    this.questionList.splice(id, 1);
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
  }

  submitSurvey(id) {
    /* check survey type and session on server side*/
    const requestBody = {
      questionList: this.questionToSubmitList
    };
    return this.http.post('http://localhost:8081/submit-survey/' + id , requestBody);
  }

  getSurveyById(id: string) {
    /* check survey type and session on server side*/
    return this.http.get('http://localhost:8081/get-survey/' + id);
  }

  /* Close the survey */

  closeSurvey(id: string){
    return this.http.post('http://localhost:8081/delete-survey/' + id,{},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true}) ;
  }

  /* View Survey by ID */
  viewSurvey(id: String) {
    return this.http.get('http://localhost:8081/view-survey/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  unpublish(id: String) {
    console.log(id)
    return this.http.get('http://localhost:8081/unpublish-survey/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }


  /* Edit a Survey */
  getSurveyToEdit(id: String) {
    return this.http.get('http://localhost:8081/get-survey-to-edit/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  editSurvey(obj: any){
    return this.http.post('http://localhost:8081/edit-survey/' + obj.id,
      obj,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }


}
