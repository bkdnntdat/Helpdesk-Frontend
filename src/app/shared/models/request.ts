import { Profile } from "./profile";
import { RequestType } from "./requestType";
import { Status } from "./status";

export class Request {
  id: number;
  user: Profile;
  dayRequest: Date;
  createAt: Date;
  description: string;
  requestType: RequestType;
  status: Status;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
