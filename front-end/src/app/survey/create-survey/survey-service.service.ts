import {QuestionsAndAnswers} from './question.model';

export class SurveyService {

  public type: string;
  public endTime: string;
  public publish: boolean;
  public status: string;
  public category: string;
  public questionList: QuestionsAndAnswers[] = [];
  public questionObject: QuestionsAndAnswers;

  getMessage(msg) {
    console.log(msg);
  }

  addQuestion(question: string, questionType: string) {
    if (this.questionObject != undefined){
      this.questionList.push(this.questionObject);
    }
    this.questionObject = new QuestionsAndAnswers(question , questionType);
  }

  addChoice(choice: string , sequence: number) {
    this.questionObject.addChoice(choice, sequence);
  }

  showSendingObject() {
    console.log(this.questionList);
  }



}
