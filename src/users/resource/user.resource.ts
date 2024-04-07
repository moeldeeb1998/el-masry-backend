import RoleNames from '../../models/enums/RoleNames';
import { User } from '../../models/user.entity';

export class UserResource {
  firstName: string;
  lastName: string;
  email: string;
  role: RoleNames;

  fromUser(user: User): UserResource {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;

    return this;
  }
}
