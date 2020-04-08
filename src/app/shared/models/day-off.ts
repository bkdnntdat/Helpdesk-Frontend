import { User } from "./user";
import { Status } from "./status";

export interface DayOff {
  id: number;
  createAt: Date;
  dayStartOff: Date;
  dayEndOff: Date;
  description: string;
  user: User;
  status: Status;
  userEntity: User;
}
export class DayOff {
  id: number;
  createAt: Date;
  dayStartOff: Date;
  dayEndOff: Date;
  description: string;
  userEntity: User;
}
