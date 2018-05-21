export class QuestionsAndAnswers {
  public id: number;
  public question: string;
  public questionType: string;
  public choice: string [] = [];

  constructor(question: string, questionType: string) {
    this.question = question;
    this.questionType = questionType;
  }

  addChoice(choice: string, sequence: number) {

    //check if those already have options
    if(( this.questionType === 'Multiple Choice - Text' ||
      this.questionType === 'Checkboxes - Text'  || this.questionType === 'Dropdown - Text' )){
      if(this.choice.includes(choice)){
        return false;
      }
    }


    if (this.choice.length > sequence){
      this.choice[sequence] = choice;
    } else if(this.choice.length === sequence) {
      this.choice.push(choice);
    }
    return true;
  }

  deleteChoice(sequence: number){
    this.choice.splice(sequence,1);
  }

  setChoice(choice: string){
    this.choice[0] = choice;
  }
  getChoices(){
    return this.choice;
  }

  getQuestionType(){
    return this.questionType;
  }
}
