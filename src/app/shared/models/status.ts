export class Status {
  id: number;
  name: String;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
