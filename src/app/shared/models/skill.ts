import { Category } from "./category";

export class Skill {
  id: number;
  name: string;
  categories: Category;

  constructor(values?: Skill) {
    Object.assign(this, values);
  }
}
