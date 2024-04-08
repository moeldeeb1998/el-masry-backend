import RoleNames from '../../models/enums/RoleNames';
import { User } from '../../models/user.entity';

export class UserResource {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleNames;

  static fromUser(user: User): UserResource {
    const resource = new UserResource();
    resource.id = user.id;
    resource.firstName = user.firstName;
    resource.lastName = user.lastName;
    resource.email = user.email;
    resource.role = user.role;

    return resource;
  }
}
