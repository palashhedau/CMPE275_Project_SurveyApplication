export class QuestionsAndAnswers {
  public question: string;
  public questionType: string;
  public choice: string [] = [];

  constructor(question: string, questionType: string) {}

  addChoice(choice: string, sequence: number) {
    if (this.choice.length > sequence){
      this.choice.push(choice);
    } else {
      this.choice[sequence] = choice;
    }

  }
}
