export class QuestionsSubmitSurvey{
  private questionId: number;
  private choice: string [] = [];

  constructor(questionId: number){
    this.questionId = questionId;
  }

  setChoice(choice: string, questionType: string){
      if( (questionType === 'Datetime') ||
        (questionType === 'Short Answer') ||
        (questionType === 'Star Rating') ||
        (questionType === 'Dropdown - Text') ||
        (questionType === 'Multiple Choice - Text') ||
        (questionType === 'Yes/No')){

        if (this.choice.length === 0) {
          this.choice.push(choice);
        } else {
          this.choice[0] = choice;
        }
      } else {
          if ( ! (this.choice.indexOf(choice) === -1 )) {
              this.choice.splice(this.choice.indexOf(choice),1);
          }else{
            this.choice.push(choice);
          }
      }
  }

  getId(){return this.questionId;}
}
