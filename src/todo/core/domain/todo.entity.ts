export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public isDone: boolean = false,
  ) {}

  markAsDone() {
    this.isDone = true;
  }

  updateTitle(newTitle: string) {
    if (!newTitle || newTitle.trim() === '') {
      throw new Error('Title cannot be empty');
    }
    this.title = newTitle;
  }
}
