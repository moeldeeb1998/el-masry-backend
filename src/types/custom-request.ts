import { User } from '../models/user.entity';

export interface CustomerHeaders extends Headers {
  authorization?: string;
}

export interface CustomRequest extends Request {
  user?: User;
  headers: CustomerHeaders;
}
