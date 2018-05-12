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
  public questionObject: QuestionsAndAnswers = null;
  public id: number;
  public surveyId: string;
  public surveyCode: string;

  public questionToSubmitList: QuestionsSubmitSurvey [] = [];


  constructor(private http: HttpClient) {}

  /* Create Survey */

  addQuestion(question: string, questionType: string, name: string, category: string, date: string) {
    let allowNextQuestion: boolean = true;
    console.log("AAAAAAAAAAA " + this.questionObject)
    if (this.questionObject !== null){
      console.log(1)
      let type: string = this.questionObject.getQuestionType();
      if(!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No' || type === 'Star Rating' )) {
        console.log(2)
        if(this.questionObject.getChoices().length > 1 ){
          console.log(3)
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

      if ( allowNextQuestion === true) {
        console.log(5)
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
      console.log("AAYA NA YAHA ")
      this.questionObject = new QuestionsAndAnswers(question , questionType);
      return true;
    }else{
      return false;
    }

  }

  addChoice(choice: string , sequence: number , id: string) {
    if ( parseInt(id,10 ) === this.questionList.length) {
      return this.questionObject.addChoice(choice , sequence);
    } else {
      return this.questionList[parseInt(id,10 )].addChoice(choice, sequence);
    }
  }

  deleteChoice(sequence: number, id: string){
    if ( parseInt(id,10 ) === this.questionList.length) {
      this.questionObject.deleteChoice(sequence)
    } else {
      this.questionList[parseInt(id,10 )].deleteChoice(sequence);
    }
 }

 /* saveRatingsChoice(choice: string, id: string){
    if (parseInt(id,10 ) === this.questionList.length){
      this.questionObject.setChoice(choice);
    } else {
      this.questionList[parseInt(id, 10)].setChoice(choice);
    }
    console.log(this.questionObject)
  }*/

  allowCreateSurvey() {
    let allowSave = true;


    /*check all questionList as well*/
    for (const currentQue of this.questionList) {
      const type: string = currentQue.questionType;
     /* if ( type === 'Star Rating') {
        if (currentQue.choice.length === 0 || (currentQue.choice[0]['answers'] === '') ) {
          return false;
        }
      }*/
      if (!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No' || type === 'Star Rating')) {
        if (currentQue.choice.length > 1 ) {
          for (const choice of currentQue.choice) {
            if (choice.trim() === '') {
              return false;
            }
          }
        }
      }
    }


    if (this.questionObject !== undefined){

      const type: string = this.questionObject.getQuestionType();
      if (!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No' || type === 'Star Rating')) {
        /*if(type === 'Star Rating' ){
          if(this.questionObject.getChoices().length === 0){
            allowSave = false;
          }
        }*/
        if (this.questionObject.getChoices().length > 1 ) {
          for (let choice of this.questionObject.getChoices()) {
            console.log(type)
            if (choice.trim() === '') {
              allowSave = false;
              break;
            }
          }
        }  else{
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
    if(this.questionList.length === id){
      this.questionObject = null;
      return;
    }
    this.questionList.splice(id, 1);
  }



  /*Submit Survey*/

  setSurveyId(id: string){
    this.surveyId = id;
  }

  setSurveyCode(code: string){
    this.surveyCode = code;
  }

  setSurveySubmittedList(params: any){
    this.questionToSubmitList = params;
  }

  setChoice(id: number, choice: string, questionType: string, email: string){
      console.log(id + " " + choice + " " + questionType + " email " + email);
      let found: boolean = false;
      if (this.questionToSubmitList.length > 0) {
        console.log("Trying to add")
        for(const question of this.questionToSubmitList){
            if(question.getId() === id){
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

      /*save the survey as well*/
      this.submitSurvey(this.surveyId, 'Saved', false, email).subscribe(
        (response) => {
          console.log("Hua re save");
        } ,
        (error) => {
          console.log('Error occured');
        }
      );


  }

  submitSurvey(id: string, status: string, confirmEmail: boolean, email: string) {
    /* check survey type and session on server side*/
    const requestBody = {
      questionList: this.questionToSubmitList,
        status: status,
      confirmEmail : confirmEmail,
      email : email
    };

    console.log(requestBody)
    console.log(requestBody)
    console.log(this.questionToSubmitList)
    return this.http.post('http://localhost:8081/submit-survey/' + id + '/' + this.surveyCode
      , requestBody, {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  getSurveyById(id: string,code: string, email: string) {
    /* check survey type and session on server side*/

    return this.http.get('http://localhost:8081/get-survey/' + id + '/' + code + '/' + email,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});

  }

  /* Close the survey */

  closeSurvey(id: string){
    return this.http.post('http://localhost:8081/delete-survey/' + id,{},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true}) ;
  }

  /* View Survey by ID */

  viewSurvey(id: string) {
    return this.http.get('http://localhost:8081/view-survey/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  unpublish(id: string) {
    console.log(id)
    return this.http.post('http://localhost:8081/unpublish-survey/' + id,{},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  publishSurvey(id: string) {
    return this.http.post('http://localhost:8081/publish-survey/' + id, {},
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

  /* Invite */

  inviteSurvey(email: string, id: string, type: string){
    return this.http.post('http://localhost:8081/invite/' + id,
      {email : email, type: type},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Get Attempted Survey */

  getAttemptedSurvey(id: string){
    return this.http.get('http://localhost:8081/get-attempted-survey',
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  viewMyResponse(id: string){
    return this.http.get('http://localhost:8081/view-my-response/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Stats */
  getStats(id: string){
    return this.http.get('http://localhost:8081/survey-stats/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Extend Date */
  extendEndDate(id: string, date: string){
    console.log(date)
    return this.http.post('http://localhost:8081/extend-enddate/' + id,{
      endDate : date
    },
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

}
