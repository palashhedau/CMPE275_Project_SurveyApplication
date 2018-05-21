import {QuestionsAndAnswers} from './create-survey/question.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {QuestionsSubmitSurvey} from './take-survey/submit-survey-questions.model';
import {GetSurveyResponseParams} from './take-survey/get-survey-response-params.model';
import {ResponseContentType} from '@angular/http';

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

  public url = 'http://54.241.144.193/' ;
  //public url = 'http://localhost:8081/' ;


  constructor(private http: HttpClient) {}

  /* Create Survey */

  addQuestion(question: string, questionType: string, name: string, category: string, date: string) {
    let allowNextQuestion: boolean = true;
    if (this.questionObject !== null){
      let type: string = this.questionObject.getQuestionType();
      if(!( type === 'Short Answer' || type === 'Datetime'  || type === 'Yes/No' || type === 'Star Rating' )) {
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
        this.http.post(this.url + 'create-survey' ,
          requestBody,
          {headers: new HttpHeaders().append('Content-Type', 'application/json'),
            withCredentials: true}).subscribe(
          (response: GetSurveyResponseParams) => {
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
      this.questionObject.id = this.questionList.length ;
      return true;
    }else{
      return false;
    }

  }

  saveEditedQuestion(question: string , id: string){
    if(this.questionList.length > 0){
      this.questionList[parseInt(id,10)]['question'] = question;
    }else{
      this.questionObject.question = question ;
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

    if(this.questionObject === null && this.questionList.length === 0){
      return false;
    }

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


    if (this.questionObject !== null){

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
    this.questionList = []
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
    return this.http.post(this.url + 'create-survey' ,
      requestBody,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  getMySurveys() {
    return this.http.get(this.url + 'survey',
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  deleteQuestion(idQuestion: number , name: string, category: string, date: string) {
    if(this.questionList.length === idQuestion){
      this.questionObject = null;
    } else {
      this.questionList.splice(idQuestion, 1);
    }

    if(this.questionList.length > 0 || this.questionObject != null){
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
      this.http.post(this.url + 'create-survey' ,
        requestBody,
        {headers: new HttpHeaders().append('Content-Type', 'application/json'),
          withCredentials: true}).subscribe(
        (response: GetSurveyResponseParams) => {
          _this.id = response.id;
        },
        (error) => {
          return false
        }
      );
    }
    return true;
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
      let found = false;
      if (this.questionToSubmitList.length > 0) {
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
          return true;
        } ,
        (error) => {
          return false;
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

    return this.http.post(this.url+'submit-survey/' + id + '/' + this.surveyCode
      , requestBody, {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  getSurveyById(id: string,code: string, email: string) {
    /* check survey type and session on server side*/

    return this.http.get(this.url + 'get-survey/' + id + '/' + code + '/' + email,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});

  }

  /* Close the survey */

  closeSurvey(id: string){
    return this.http.post(this.url + 'delete-survey/' + id,{},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true}) ;
  }

  /* View Survey by ID */

  viewSurvey(id: string) {
    return this.http.get(this.url + 'view-survey/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  unpublish(id: string) {
    console.log(id)
    return this.http.post(this.url + 'unpublish-survey/' + id,{},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  publishSurvey(id: string) {
    return this.http.post(this.url + 'publish-survey/' + id, {},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }


  /* Edit a Survey */
  getSurveyToEdit(id: String) {
    return this.http.get(this.url + 'get-survey-to-edit/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  editSurvey(obj: any){
    return this.http.post(this.url + 'edit-survey/' + obj.id,
      obj,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Invite */

  inviteSurvey(email: string, id: string, type: string){
    return this.http.post(this.url + 'invite/' + id,
      {email : email, type: type},
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Get Attempted Survey */

  getAttemptedSurvey(id: string){
    return this.http.get(this.url + 'get-attempted-survey',
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  viewMyResponse(id: string, infoId : string){
    return this.http.get(this.url + 'view-my-response/' + id + '/' + infoId,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Stats */
  getStats(id: string){
    return this.http.get(this.url + 'survey-stats/' + id,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  /* Extend Date */
  extendEndDate(id: string, date: string){
    console.log(date)
    return this.http.post(this.url + 'extend-enddate/' + id,{
      endDate : date
    },
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

  getQuestionResponses(questionid : number){
    return this.http.get(this.url + 'get-question-response/' + questionid,
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }

   async getStatsDownload( id : string ,  filename : string ){
    const url = this.url + 'survey-stats/' + id + '/' + 'download';
    const params = new HttpParams().set('file', filename);

    const file =  await this.http.get<Blob>(
      url,
      {responseType: 'blob' as 'json',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true}).toPromise();
    return file;

  }


}
