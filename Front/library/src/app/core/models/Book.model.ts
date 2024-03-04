export class Book {
  constructor(
    public name: string,
    public subject: string,
    public author: string,
    public language: string,
    public code: string,
    public volumeAmount: number,
    public id?: number
  ) {}
}
