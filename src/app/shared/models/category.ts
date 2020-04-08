export class Category {
  id: number;
  name: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
