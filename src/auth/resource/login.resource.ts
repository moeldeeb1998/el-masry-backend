import { User } from '../../models/user.entity';
import { UserResource } from '../../users/resource/user.resource';

export class LoginResource {
  accessToken: string;
  refreshToken: string;
  userData: UserResource;

  static generate(
    user: User,
    accessToken: string,
    refreshToken: string,
  ): LoginResource {
    const resource = new LoginResource();
    resource.accessToken = accessToken;
    resource.refreshToken = refreshToken;
    resource.userData = UserResource.fromUser(user);

    return resource;
  }
}
