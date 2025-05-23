export class TodoTitle {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('TodoTitle cannot be empty');
    }
    if (value.length > 100) {
      throw new Error('TodoTitle cannot exceed 100 characters');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TodoTitle): boolean {
    return this.value === other.getValue();
  }
}
