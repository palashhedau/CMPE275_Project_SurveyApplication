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

  showSendingObject() {
    this.questionList.push(this.questionObject);
    console.log(this.questionList);
  }



}
