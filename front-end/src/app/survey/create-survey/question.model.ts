export class QuestionsAndAnswers {
  private question: string;
  private questionType: string;
  private choice: string [] = [];

  constructor(question: string, questionType: string) {
    this.question = question;
    this.questionType = questionType;
  }

  addChoice(choice: string, sequence: number) {
    if (this.choice.length > sequence){
      this.choice.push(choice);
    } else {
      this.choice[sequence] = choice;
    }
  }

  getChoices(){
    return this.choice;
  }

  getQuestionType(){
    return this.questionType;
  }
}
